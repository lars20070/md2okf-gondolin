import { existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

import {
  createHttpHooks,
  ReadonlyProvider,
  RealFSProvider,
  VM,
  VmCheckpoint,
  type ExecOptions,
} from "@earendil-works/gondolin";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const CHECKPOINT_PATH = path.join(
  REPO_ROOT,
  "runtime/.cache/md2okf-base.qcow2",
);
const RESIZE_BOOTSTRAP_PATH = path.join(
  REPO_ROOT,
  "runtime/.cache/md2okf-resize-bootstrap.qcow2",
);
const SCRIPTS_DIR = path.join(REPO_ROOT, "scripts");
const IMAGE = "alpine-base:0.2.0";
const GUEST_PATH =
  "/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin:/bin:/sbin";

const PROVISION_HOSTS = [
  "dl-cdn.alpinelinux.org",
  "*.alpinelinux.org",
  "registry.npmjs.org",
  "pypi.org",
  "files.pythonhosted.org",
  "pi.dev",
] as const;

async function run(
  vm: VM,
  label: string,
  script: string,
  options: ExecOptions = {},
): Promise<void> {
  console.log(`\n==> ${label}`);
  const process = vm.exec(["/bin/sh", "-ec", script], {
    ...options,
    stdout: "pipe",
    stderr: "pipe",
  });

  for await (const { stream, text } of process.output()) {
    (stream === "stdout" ? globalThis.process.stdout : globalThis.process.stderr)
      .write(text);
  }

  const result = await process;
  if (!result.ok) {
    throw new Error(`${label} exited ${result.exitCode}`);
  }
}

async function verifyCheckpoint(): Promise<boolean> {
  console.log(`Checkpoint already exists: ${CHECKPOINT_PATH}`);
  console.log("Resuming it instead of reinstalling...");

  const checkpoint = VmCheckpoint.load(CHECKPOINT_PATH);
  const vm = await checkpoint.resume<VM>({
    sandbox: { console: "none", netEnabled: false },
    env: { PATH: GUEST_PATH },
    vfs: null,
  });

  try {
    const result = await vm.exec([
      "/bin/sh",
      "-ec",
      [
        "test -f /etc/md2okf-provisioned-v2",
        "command -v pi",
        "command -v merkleokf",
        "PI_CODING_AGENT_DIR=/opt/pi-agent pi list | grep -q context7-pi",
      ].join("\n"),
    ]);
    if (!result.ok) {
      console.log("Checkpoint is from an older provisioning revision.");
      return false;
    }
    process.stdout.write(result.stdout);
    return true;
  } finally {
    await vm.close();
  }
}

function provisioningNetwork() {
  return createHttpHooks({
    allowedHosts: [...PROVISION_HOSTS],
  });
}

async function ensureResizeBootstrap(): Promise<VmCheckpoint> {
  if (existsSync(RESIZE_BOOTSTRAP_PATH)) {
    return VmCheckpoint.load(RESIZE_BOOTSTRAP_PATH);
  }

  console.log(
    "Creating resize bootstrap with e2fsprogs-extra " +
      "(workaround for Gondolin issue #132)...",
  );
  const network = provisioningNetwork();
  let vm: VM | undefined = await VM.create({
    sandbox: { imagePath: IMAGE, console: "none" },
    httpHooks: network.httpHooks,
    env: { ...network.env, PATH: GUEST_PATH },
    allowWebSockets: false,
    // Keep VFS enabled so Gondolin injects its MITM CA at /etc/gondolin.
    // No host paths are mounted during this bootstrap.
    vfs: {},
  });

  try {
    // alpine-base:0.2.0 predates resize2fs in the stock image:
    // https://github.com/earendil-works/gondolin/issues/132
    await run(
      vm,
      "install rootfs resize helper",
      "apk add --no-cache e2fsprogs-extra",
    );
    const checkpoint = await vm.checkpoint(RESIZE_BOOTSTRAP_PATH);
    vm = undefined;
    return checkpoint;
  } finally {
    if (vm !== undefined) {
      await vm.close().catch(() => undefined);
    }
  }
}

async function provision(): Promise<void> {
  mkdirSync(path.dirname(CHECKPOINT_PATH), { recursive: true });

  const network = provisioningNetwork();
  const bootstrap = await ensureResizeBootstrap();
  let vm: VM | undefined = await bootstrap.resume<VM>({
    sandbox: { console: "none" },
    httpHooks: network.httpHooks,
    env: {
      ...network.env,
      NPM_CONFIG_CACHE: "/tmp/.npm-cache",
      PATH: GUEST_PATH,
    },
    rootfs: { mode: "cow", size: "4G" },
    allowWebSockets: false,
    vfs: {
      mounts: {
        "/scripts": new ReadonlyProvider(new RealFSProvider(SCRIPTS_DIR)),
      },
    },
  });

  try {
    await run(vm, "show resized rootfs", "df -h /");
    await run(vm, "install Alpine package", "apk add --no-cache tree");
    await run(
      vm,
      "install Pi and okf-lint",
      [
        "npm install --global --ignore-scripts",
        "@earendil-works/pi-coding-agent@0.85.1",
        "@thisismydesign/okf-lint@0.1.0",
      ].join(" "),
    );

    for (const cli of [
      "inspectmd",
      "inspectokf",
      "sizeokf",
      "merkleokf",
    ]) {
      await run(
        vm,
        `install ${cli}`,
        `uv tool install --from /scripts/${cli} ${cli}`,
        {
          env: {
            UV_TOOL_DIR: "/usr/local/uv-tools",
            UV_TOOL_BIN_DIR: "/usr/local/bin",
          },
        },
      );
    }

    await run(
      vm,
      "install Context7 Pi extension",
      [
        "mkdir -p /opt/pi-agent",
        "PI_CODING_AGENT_DIR=/opt/pi-agent pi install npm:@upstash/context7-pi@0.1.2",
      ].join("\n"),
    );
    await run(
      vm,
      "mark provisioning complete",
      [
        "rm -rf /tmp/.npm-cache",
        "touch /etc/md2okf-provisioned-v2",
        "df -h /",
      ].join("\n"),
    );

    console.log(`\n==> checkpoint ${CHECKPOINT_PATH}`);
    const checkpoint = await vm.checkpoint(CHECKPOINT_PATH);
    vm = undefined;
    bootstrap.delete();
    console.log(
      `Created ${checkpoint.name} (guest build ${checkpoint.guestAssetBuildId})`,
    );
  } finally {
    if (vm !== undefined) {
      await vm.close().catch(() => undefined);
    }
  }
}

if (!existsSync(CHECKPOINT_PATH) || !(await verifyCheckpoint())) {
  rmSync(CHECKPOINT_PATH, { force: true });
  await provision();
}

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { VM, VmCheckpoint } from "@earendil-works/gondolin";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const CHECKPOINT_PATH = path.join(
  REPO_ROOT,
  "runtime/.cache/md2okf-base.qcow2",
);
const GUEST_PATH =
  "/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin:/bin:/sbin";

async function execOk(vm: VM, script: string): Promise<string> {
  const result = await vm.exec(["/bin/sh", "-ec", script]);
  assert.equal(
    result.exitCode,
    0,
    `${script}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );
  return result.stdout;
}

test(
  "provisioned toolchain survives checkpoint resume",
  { timeout: 120_000 },
  async () => {
    assert.ok(
      existsSync(CHECKPOINT_PATH),
      `missing ${CHECKPOINT_PATH}; run make runtime-image on the Mac`,
    );

    // Importing VM registers the runtime used internally by checkpoint.resume().
    void VM;
    const checkpoint = VmCheckpoint.load(CHECKPOINT_PATH);
    const vm = await checkpoint.resume<VM>({
      sandbox: { console: "none", netEnabled: false },
      env: {
        PATH: GUEST_PATH,
        PI_CODING_AGENT_DIR: "/opt/pi-agent",
      },
      vfs: null,
    });

    try {
      await execOk(vm, "test -f /etc/md2okf-provisioned-v2");

      for (const command of [
        "tree",
        "pi",
        "okf-lint",
        "inspectmd",
        "inspectokf",
        "sizeokf",
        "merkleokf",
      ]) {
        await execOk(
          vm,
          [
            `command -v ${command} >/dev/null`,
            `timeout 20 ${command} --version >/dev/null 2>&1 ||`,
            `  timeout 20 ${command} --help >/dev/null 2>&1`,
          ].join("\n"),
        );
        console.log(`ok ${command}`);
      }

      await execOk(
        vm,
        "node -e 'const [major, minor] = process.versions.node.split(\".\").map(Number); process.exit(major > 22 || (major === 22 && minor >= 19) ? 0 : 1)'",
      );
      console.log("ok node >= 22.19");

      const packages = await execOk(vm, "timeout 20 pi list");
      assert.match(packages, /context7-pi/);
      console.log("ok context7-pi");
    } finally {
      await vm.close();
    }
  },
);

import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  MemoryProvider,
  ReadonlyProvider,
  RealFSProvider,
  VM,
  VmCheckpoint,
  type VirtualProvider,
  type VMOptions,
} from "@earendil-works/gondolin";

import { createGuard } from "./guard.ts";

export const GUEST_PATH =
  "/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin:/bin:/sbin";

export type WorkspaceLayout = {
  repoRoot: string;
  auditLogPath: string;
  agentConfigPath?: string;
};

type VmVfsOptions = Exclude<VMOptions["vfs"], null | undefined>;

function seedSpec(specPath: string): VirtualProvider {
  const memory = new MemoryProvider();
  const handle = memory.openSync("/SPEC.md", "w");
  try {
    handle.writeFileSync(readFileSync(specPath));
  } finally {
    handle.closeSync();
  }
  return new ReadonlyProvider(memory);
}

export function buildWorkspaceVfs(layout: WorkspaceLayout): VmVfsOptions {
  const repoRoot = path.resolve(layout.repoRoot);
  const sessions = path.join(repoRoot, "logs/sessions");
  mkdirSync(sessions, { recursive: true });

  return {
    mounts: {
      "/workspace": seedSpec(path.join(repoRoot, "SPEC.md")),
      "/workspace/md": new ReadonlyProvider(
        new RealFSProvider(path.join(repoRoot, "md")),
      ),
      "/workspace/okf": new RealFSProvider(path.join(repoRoot, "okf")),
      "/sessions": new RealFSProvider(sessions),
      "/config": new ReadonlyProvider(
        new RealFSProvider(
          path.resolve(
            layout.agentConfigPath ?? path.join(repoRoot, "runtime/agent"),
          ),
        ),
      ),
    },
    hooks: createGuard(path.resolve(layout.auditLogPath)),
  };
}

export async function resumeWorkspace(
  checkpointPath: string,
  layout: WorkspaceLayout,
  options: Omit<VMOptions, "vfs"> = {},
): Promise<VM> {
  const checkpoint = VmCheckpoint.load(path.resolve(checkpointPath));
  const optionEnv =
    options.env !== undefined && !Array.isArray(options.env) ? options.env : {};

  return checkpoint.resume<VM>({
    ...options,
    sandbox: {
      console: "none",
      netEnabled: false,
      ...options.sandbox,
    },
    env: {
      PATH: GUEST_PATH,
      ...optionEnv,
    },
    vfs: buildWorkspaceVfs(layout),
  });
}

export async function installPiAgentConfig(vm: VM): Promise<void> {
  const result = await vm.exec([
    "/bin/sh",
    "-ec",
    [
      "rm -rf /root/.pi/agent",
      "mkdir -p /root/.pi/agent",
      "cp -R /opt/pi-agent/. /root/.pi/agent/",
      "cp -R /config/. /root/.pi/agent/",
    ].join("\n"),
  ]);

  if (!result.ok) {
    throw new Error(
      `copy Pi agent config exited ${result.exitCode}: ${result.stderr.trim()}`,
    );
  }
}

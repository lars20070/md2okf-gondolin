import { mkdirSync } from "node:fs";
import path from "node:path";

import type { VM } from "@earendil-works/gondolin";

import { createRuntimeNetwork } from "./net.ts";
import { installPiAgentConfig, resumeWorkspace } from "./workspace.ts";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const CHECKPOINT_PATH = path.join(
  REPO_ROOT,
  "runtime/.cache/md2okf-base.qcow2",
);

async function main(): Promise<number> {
  const mode = process.argv[2] ?? "shell";
  if (mode !== "shell" && mode !== "agent") {
    throw new Error(`usage: shell.ts [shell|agent] [pi-args...]`);
  }

  const apiKey = process.env.OPENROUTER_API_KEY ?? "";
  if (mode === "agent" && apiKey.length === 0) {
    throw new Error("OPENROUTER_API_KEY is required in the host environment");
  }

  const auditLogPath = path.join(
    REPO_ROOT,
    "logs/audit",
    `interactive-${new Date().toISOString().replaceAll(/[:.]/g, "-")}.jsonl`,
  );
  mkdirSync(path.dirname(auditLogPath), { recursive: true });

  const network = createRuntimeNetwork(apiKey);
  const vm: VM = await resumeWorkspace(
    CHECKPOINT_PATH,
    { repoRoot: REPO_ROOT, auditLogPath },
    {
      sandbox: { netEnabled: true },
      httpHooks: network.httpHooks,
      env: network.env,
      allowWebSockets: network.allowWebSockets,
    },
  );

  try {
    await installPiAgentConfig(vm);
    const interactive = vm.shell({
      command:
        mode === "agent"
          ? ["/usr/local/bin/pi", ...process.argv.slice(3)]
          : "/bin/sh",
      cwd: "/workspace",
      attach: true,
    });
    return (await interactive).exitCode;
  } finally {
    await vm.close();
    console.log(`Audit log: ${path.relative(REPO_ROOT, auditLogPath)}`);
  }
}

process.exitCode = await main();

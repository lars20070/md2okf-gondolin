import { execFile } from "node:child_process";
import { mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

import type { ExecProcess, VM } from "@earendil-works/gondolin";

import { createRuntimeNetwork } from "./net.ts";
import { installPiAgentConfig, resumeWorkspace } from "./workspace.ts";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const CHECKPOINT_PATH = path.join(
  REPO_ROOT,
  "runtime/.cache/md2okf-base.qcow2",
);
const COMPILE_PROMPT =
  "Load the compile-okf skill: read ~/.pi/agent/skills/compile-okf/SKILL.md, " +
  "then follow it to compile __DOCUMENT__ into the OKF wiki under okf/.";
const CONTINUATION_PROMPT =
  "This is a follow-up pass on this document: okf/ may already hold partial " +
  "work from a previous pass. Compare the source against what is on disk and " +
  "continue at the first gap — do not start over.";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | undefined {
  return typeof value === "object" && value !== null
    ? (value as JsonRecord)
    : undefined;
}

function formatPiEvent(line: string): string | undefined {
  let value: unknown;
  try {
    value = JSON.parse(line);
  } catch {
    return undefined;
  }

  const event = asRecord(value);
  if (event?.type === "tool_execution_start") {
    const toolName =
      typeof event.toolName === "string" ? event.toolName : "unknown";
    return `${toolName} ${JSON.stringify(event.args)}`.slice(0, 120);
  }

  if (event?.type !== "message_end") {
    return undefined;
  }
  const message = asRecord(event.message);
  if (message?.role !== "assistant" || !Array.isArray(message.content)) {
    return undefined;
  }

  const blocks = message.content.flatMap((item) => {
    const content = asRecord(item);
    if (content?.type === "text" && typeof content.text === "string") {
      return [content.text];
    }
    if (
      content?.type === "thinking" &&
      typeof content.thinking === "string"
    ) {
      return [`[thinking]\n${content.thinking}`];
    }
    return [];
  });
  const formatted = blocks.join("\n\n");
  return formatted.length > 0 ? formatted : undefined;
}

async function streamPi(process: ExecProcess): Promise<void> {
  let pending = "";

  for await (const chunk of process.output()) {
    if (chunk.stream === "stderr") {
      globalThis.process.stderr.write(chunk.text);
      continue;
    }

    pending += chunk.text;
    const lines = pending.split("\n");
    pending = lines.pop() ?? "";
    for (const line of lines) {
      const formatted = formatPiEvent(line);
      if (formatted !== undefined) {
        console.log(formatted);
      }
    }
  }

  const formatted = formatPiEvent(pending);
  if (formatted !== undefined) {
    console.log(formatted);
  }
}

async function wikiRootHash(): Promise<string> {
  let stdout: string;
  try {
    ({ stdout } = await execFileAsync(
      "merkleokf",
      ["--nolog", "-L", "0", "okf/"],
      { cwd: REPO_ROOT },
    ));
  } catch (error) {
    throw new Error(
      "host merkleokf failed; run `make install-clis` on the Mac",
      { cause: error },
    );
  }

  const rootRow = stdout
    .split("\n")
    .find((line) => /^[0-9a-f]{12}\s/.test(line));
  const digest = rootRow?.match(/^([0-9a-f]{12})\s/)?.[1];
  if (digest === undefined) {
    throw new Error(`could not parse merkleokf root hash:\n${stdout}`);
  }
  return digest;
}

function documents(markdownFolder: string): string[] {
  const absolute = path.resolve(REPO_ROOT, markdownFolder);
  if (!statSync(absolute, { throwIfNoEntry: false })?.isDirectory()) {
    throw new Error(`Markdown folder not found: ${markdownFolder}`);
  }

  const relativeFolder = path.relative(REPO_ROOT, absolute);
  if (
    relativeFolder === ".." ||
    relativeFolder.startsWith(`..${path.sep}`) ||
    (relativeFolder !== "md" && !relativeFolder.startsWith(`md${path.sep}`))
  ) {
    throw new Error("Markdown folder must be md/ or a directory beneath it");
  }

  return readdirSync(absolute)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => path.posix.join(relativeFolder.split(path.sep).join("/"), name));
}

function maxIterations(): number {
  const value = Number.parseInt(process.env.RALPH_MAX ?? "10", 10);
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new Error(`RALPH_MAX must be a positive integer (got ${value})`);
  }
  return value;
}

async function compileDocument(
  document: string,
  apiKey: string,
  limit: number,
): Promise<void> {
  const runId = `${path.basename(document, ".md")}-${new Date()
    .toISOString()
    .replaceAll(/[:.]/g, "-")}`;
  const auditLogPath = path.join(REPO_ROOT, "logs/audit", `${runId}.jsonl`);
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
    let previousHash = await wikiRootHash();

    for (let iteration = 1; iteration <= limit; iteration += 1) {
      let prompt = COMPILE_PROMPT.replace("__DOCUMENT__", document);
      if (iteration > 1) {
        prompt = `${prompt} ${CONTINUATION_PROMPT}`;
      }

      console.log(`Compiling document ${document} (iteration ${iteration})`);
      const pi = vm.exec(
        [
          "/usr/local/bin/pi",
          "--mode",
          "json",
          "--session-dir",
          "/sessions",
          prompt,
        ],
        {
          cwd: "/workspace",
          stdin: false,
          stdout: "pipe",
          stderr: "pipe",
        },
      );
      await streamPi(pi);
      const result = await pi;
      if (!result.ok) {
        throw new Error(`Pi exited ${result.exitCode} for ${document}`);
      }

      const currentHash = await wikiRootHash();
      console.log(`${previousHash} -> ${currentHash}`);
      if (currentHash === previousHash) {
        console.log(`Audit log: ${path.relative(REPO_ROOT, auditLogPath)}`);
        return;
      }
      previousHash = currentHash;
    }

    throw new Error(
      `Ralph loop hit ${limit} iterations for ${document}`,
    );
  } finally {
    await vm.close();
  }
}

async function main(): Promise<void> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (apiKey === undefined || apiKey.length === 0) {
    throw new Error("OPENROUTER_API_KEY is required in the host environment");
  }

  const markdownFolder = process.argv[2] ?? "md";
  const sourceDocuments = documents(markdownFolder);
  const limit = maxIterations();
  for (const document of sourceDocuments) {
    await compileDocument(document, apiKey, limit);
  }
}

await main();

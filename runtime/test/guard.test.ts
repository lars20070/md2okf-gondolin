import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import type { VfsHookContext } from "@earendil-works/gondolin";

import { createGuard, FROZEN } from "../src/guard.ts";

const frozen = FROZEN[0];

function harness() {
  const auditLog = join(mkdtempSync(join(tmpdir(), "md2okf-guard-")), "audit.jsonl");
  const before = createGuard(auditLog).before;
  assert(before);

  return {
    auditLog,
    run(context: VfsHookContext) {
      return before(context);
    },
  };
}

function assertDenied(run: (context: VfsHookContext) => unknown, context: VfsHookContext) {
  assert.throws(
    () => run(context),
    (error: unknown) =>
      error instanceof Error &&
      "code" in error &&
      error.code === "EACCES" &&
      "path" in error &&
      error.path === frozen,
  );
}

test("denies every write-capable open flag on the frozen file", () => {
  const { run } = harness();

  for (const flags of ["w", "w+", "a", "a+", "r+", "wx", "ax"]) {
    assertDenied(run, { op: "open", path: frozen, flags });
  }
});

test("allows reads of the frozen file", () => {
  const { run } = harness();

  assert.doesNotThrow(() => run({ op: "open", path: frozen, flags: "r" }));
  assert.doesNotThrow(() => run({ op: "read", path: frozen }));
  assert.doesNotThrow(() =>
    run({ op: "readdir", path: "/workspace/okf" }),
  );
});

test("denies path mutations on the frozen file", () => {
  const { run } = harness();

  for (const op of [
    "unlink",
    "rmdir",
    "mkdir",
    "truncate",
    "write",
    "writeFile",
  ]) {
    assertDenied(run, { op, path: frozen });
  }
});

test("checks both ends of rename and link", () => {
  const { run } = harness();
  const page = "/workspace/okf/index.md";

  for (const op of ["rename", "link"]) {
    assertDenied(run, { op, oldPath: frozen, newPath: page });
    assertDenied(run, { op, oldPath: page, newPath: frozen });
  }
});

test("does not restrict other okf paths", () => {
  const { run } = harness();
  const page = "/workspace/okf/index.md";

  assert.doesNotThrow(() => run({ op: "open", path: page, flags: "w" }));
  assert.doesNotThrow(() => run({ op: "unlink", path: page }));
  assert.doesNotThrow(() =>
    run({
      op: "rename",
      oldPath: page,
      newPath: "/workspace/okf/start.md",
    }),
  );
});

test("audits successful mutations and denials", () => {
  const { auditLog, run } = harness();
  const page = "/workspace/okf/index.md";

  run({ op: "open", path: page, flags: "w" });
  assertDenied(run, { op: "unlink", path: frozen });

  const records = readFileSync(auditLog, "utf8")
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line) as Record<string, unknown>);

  assert.equal(records.length, 2);
  assert.deepEqual(
    records.map(({ denied, op, path }) => ({ denied, op, path })),
    [
      { denied: false, op: "open", path: page },
      { denied: true, op: "unlink", path: frozen },
    ],
  );
  assert.match(String(records[0]?.timestamp), /^\d{4}-\d{2}-\d{2}T/);
});

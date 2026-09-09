import assert from "node:assert/strict";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";

import type { ExecResult, VM } from "@earendil-works/gondolin";

import {
  installPiAgentConfig,
  resumeWorkspace,
  type WorkspaceLayout,
} from "../src/workspace.ts";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const CHECKPOINT_PATH = path.join(
  REPO_ROOT,
  "runtime/.cache/md2okf-base.qcow2",
);
const FROZEN = "/workspace/okf/.okflintrc.json";

function createFixture(): {
  root: string;
  layout: WorkspaceLayout;
} {
  const root = mkdtempSync(path.join(tmpdir(), "md2okf-bypass-"));
  mkdirSync(path.join(root, "md"), { recursive: true });
  mkdirSync(path.join(root, "okf"), { recursive: true });
  mkdirSync(path.join(root, "agent"), { recursive: true });

  cpSync(path.join(REPO_ROOT, "SPEC.md"), path.join(root, "SPEC.md"));
  cpSync(
    path.join(REPO_ROOT, "okf/.okflintrc.json"),
    path.join(root, "okf/.okflintrc.json"),
  );
  cpSync(
    path.join(REPO_ROOT, "runtime/agent"),
    path.join(root, "agent"),
    { recursive: true },
  );
  writeFileSync(path.join(root, "md/source.md"), "# Source\n\nRead only.\n");
  writeFileSync(path.join(root, "okf/index.md"), "# Index\n");

  return {
    root,
    layout: {
      repoRoot: root,
      auditLogPath: path.join(root, "logs/bypass-audit.jsonl"),
      agentConfigPath: path.join(root, "agent"),
    },
  };
}

function hashProtectedTree(root: string): Record<string, string> {
  const result: Record<string, string> = {};

  function visit(directory: string): void {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      const relative = path.relative(root, absolute);
      const top = relative.split(path.sep)[0];
      if (top === "okf" || top === "logs") {
        continue;
      }
      if (entry.isDirectory()) {
        visit(absolute);
      } else if (entry.isFile()) {
        result[relative] = createHash("sha256")
          .update(readFileSync(absolute))
          .digest("hex");
      }
    }
  }

  visit(root);
  return result;
}

async function guest(vm: VM, script: string): Promise<ExecResult> {
  return vm.exec(["/bin/sh", "-c", script]);
}

function expectDenied(result: ExecResult, pattern: RegExp): void {
  const output = `${result.stdout}\n${result.stderr}`;
  assert.notEqual(result.exitCode, 0, output);
  assert.match(output, pattern);
}

async function deniedRow(
  t: TestContext,
  vm: VM,
  name: string,
  script: string,
  pattern = /Permission denied|EACCES/i,
): Promise<void> {
  await t.test(name, async () => {
    expectDenied(await guest(vm, script), pattern);
  });
}

test(
  "workspace bypass matrix",
  {
    skip:
      process.env.IS_SANDBOX === "1" || process.platform !== "darwin"
        ? "requires the macOS host and HVF"
        : false,
    timeout: 180_000,
  },
  async (t) => {
    const { root, layout } = createFixture();
    const protectedBefore = hashProtectedTree(root);
    const frozenHost = path.join(root, "okf/.okflintrc.json");
    const frozenMode = statSync(frozenHost).mode;
    let vm: VM | undefined;

    try {
      vm = await resumeWorkspace(CHECKPOINT_PATH, layout);
      await installPiAgentConfig(vm);

      const packages = await guest(vm, "pi list");
      assert.equal(packages.exitCode, 0, packages.stderr);
      assert.match(packages.stdout, /context7-pi/);

      const configWrite = await guest(vm, "echo x >> /config/AGENTS.md");
      expectDenied(configWrite, /Read-only file system|EROFS/i);
      const copiedConfigWrite = await guest(
        vm,
        "echo '# writable runtime copy' >> /root/.pi/agent/AGENTS.md",
      );
      assert.equal(copiedConfigWrite.exitCode, 0, copiedConfigWrite.stderr);

      const allowed = await guest(
        vm,
        "echo allowed > /workspace/okf/allowed.md",
      );
      assert.equal(allowed.exitCode, 0, allowed.stderr);

      await deniedRow(
        t,
        vm,
        "row 1: direct write",
        `echo x > ${FROZEN}`,
      );
      await deniedRow(t, vm, "row 2: unlink", `rm -f ${FROZEN}`);
      await deniedRow(
        t,
        vm,
        "row 3: rename onto frozen path",
        `mv /workspace/okf/index.md ${FROZEN}`,
      );
      await deniedRow(
        t,
        vm,
        "row 4: symlink laundering",
        `ln -s ${FROZEN} /tmp/frozen-link && echo x > /tmp/frozen-link`,
      );
      await t.test("row 5: hard link cannot replace frozen file", async () => {
        const before = readFileSync(frozenHost);
        const result = await guest(
          vm!,
          `ln -f /workspace/okf/index.md ${FROZEN}`,
        );
        expectDenied(result, /File exists|EEXIST/i);
        assert.deepEqual(readFileSync(frozenHost), before);
      });
      await deniedRow(
        t,
        vm,
        "row 6: FUSE mirror path",
        "echo x > /data/workspace/okf/.okflintrc.json",
      );

      await deniedRow(
        t,
        vm,
        "row 8a: fallocate after writable open",
        `python3 -c "import os; fd=os.open('${FROZEN}', os.O_RDWR); os.posix_fallocate(fd, 0, 4096)"`,
      );
      await deniedRow(
        t,
        vm,
        "row 8b: copy_file_range after writable open",
        `python3 -c "import os; src=os.open('/workspace/okf/index.md', os.O_RDONLY); dst=os.open('${FROZEN}', os.O_RDWR); os.copy_file_range(src, dst, 1)"`,
      );

      await deniedRow(
        t,
        vm,
        "row 9a: source Markdown is read-only",
        "echo x >> /workspace/md/source.md",
        /Read-only file system|EROFS/i,
      );
      await deniedRow(
        t,
        vm,
        "row 9b: writable mount cannot be renamed",
        "mv /workspace/okf /workspace/okf-old",
        /cross-device|EXDEV|resource busy/i,
      );

      await t.test("row 10: chmod cannot reach host mode bits", async () => {
        await guest(vm!, `chmod 777 ${FROZEN}`);
        assert.equal(statSync(frozenHost).mode, frozenMode);
      });

      await t.test("row 11: workspace exposes exactly three entries", async () => {
        const listing = await guest(
          vm!,
          "printf '%s\\n' /workspace/* | sed 's#.*/##' | sort",
        );
        assert.equal(listing.exitCode, 0, listing.stderr);
        assert.deepEqual(listing.stdout.trim().split("\n"), [
          "SPEC.md",
          "md",
          "okf",
        ]);
        const hidden = await guest(
          vm!,
          "test ! -e /workspace/pi && test ! -e /workspace/scripts && test ! -e /workspace/.git",
        );
        assert.equal(hidden.exitCode, 0, hidden.stderr);
      });

      await deniedRow(
        t,
        vm,
        "row 12a: Pi write syscall pattern",
        `node -e "require('node:fs').writeFileSync('${FROZEN}', 'x')"`,
      );
      await deniedRow(
        t,
        vm,
        "row 12b: Pi edit syscall pattern",
        `node -e "const fs=require('node:fs'); const fd=fs.openSync('${FROZEN}', 'r+'); fs.writeSync(fd, 'x')"`,
      );

      // Run after the other shortcut-path rows because unmounting is persistent
      // for this VM; the raw FUSE mirror must remain protected.
      await deniedRow(
        t,
        vm,
        "row 7: unmount shortcut then use FUSE mirror",
        "umount /workspace/okf 2>/dev/null || true; echo x > /data/workspace/okf/.okflintrc.json",
      );

      const audit = readFileSync(layout.auditLogPath, "utf8")
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line) as { denied: boolean });
      assert.ok(audit.some((record) => !record.denied));
      assert.ok(audit.some((record) => record.denied));
    } finally {
      await vm?.close().catch(() => undefined);
      assert.deepEqual(hashProtectedTree(root), protectedBefore);
      rmSync(root, { recursive: true, force: true });
    }
  },
);

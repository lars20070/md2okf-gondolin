# Plan: replace the Docker `sbx` sandbox with Gondolin, running on the macOS host

> **Revision 3.** Revision 2 assumed one machine did everything. It cannot:
> Gondolin runs on Lars's macOS host, and the agent writing the code lives in a
> Linux `sbx` sandbox with no host access and no hypervisor. This revision keeps
> revision 2's design intact — five built-in mounts, one guard hook, zero custom
> providers — and rewrites the *execution* around that split. Every stage now
> says who runs it, and every host stage ships a copy-pasteable command block.

## Context

`REDESIGN-gondolin-permissions.md` established that the Pi agent today has
unrestricted read/write over the whole md2okf working tree. `sbx` has no
filesystem policy at all — confirmed against the schema itself: adding a
`permissions.filesystem` block to `pi/spec.yaml` is rejected with *"field
filesystem not found in type spec.permissionsBlockV2"*, and `sbx kit inspect`
reports only Network, Credentials and Environment policies. The boundary is
prose in `pi/files/home/.pi/agent/AGENTS.md`, `sudo` is passwordless, and the
agent can therefore rewrite its own instructions, the driver that runs it, and
`merkleokf` — the tool used to supervise it.

In Gondolin the guest filesystem is served by host-side JavaScript, so the
boundary sits outside the VM and survives guest root. The agent's world becomes
exactly `SPEC.md` (read-only), `md/` (read-only) and `okf/` (writable, with
`.okflintrc.json` frozen). Nothing else in the repo is mounted.

**The new constraint.** Gondolin needs QEMU and a hypervisor. On macOS that is
HVF, available only on the host — never inside the `sbx` sandbox where the
coding agent runs. So the runtime is host-only, and the migration is a
two-party job.

## The collaboration model

| | Claude (in `sbx`) | Lars (macOS host) |
| --- | --- | --- |
| Writes `runtime/**`, `Makefile`, docs | ✅ | |
| `make lint`, plan and review | ✅ | |
| `npm install`, `npm ci` | ❌ | ✅ |
| Anything that boots a VM | ❌ | ✅ |
| `tsc --noEmit`, guard unit tests | ✅ fast loop | ✅ authoritative |

**The handoff runs through the repo, not the chat.** The working tree is mounted
into the sandbox in direct mode, so a file the host writes under the repo is
immediately readable by the agent. Every host command therefore ends in a `tee`
into `logs/gondolin/`, which is already fully gitignored:

```bash
mkdir -p logs/gondolin
<command> 2>&1 | tee logs/gondolin/<stage>.log
```

Then say "done" — the agent reads the log directly. No copy-paste, no
truncation. The `!` prefix in the Claude session runs *inside* the sandbox and
must never be used for these commands.

**Two node_modules trees cannot coexist at one path**, so `runtime/node_modules`
is installed by the host and belongs to macOS. The agent may run `tsc --noEmit`
and the guard unit tests against that tree — TypeScript and the guard are pure
JavaScript and cross-platform — but the host's run is the authoritative one.
This only holds while `runtime/src/guard.ts` imports **nothing from Gondolin at
runtime** (types only); that is a design constraint, checked in Stage 2, not an
accident.

## What changed from revision 2

| Revision 2 | Now |
| --- | --- |
| Stage 1 installed QEMU + Node ≥23.6 *in the dev sandbox* | Deleted. Prerequisites are macOS-only (Stage 0). |
| TCG-vs-HVF caveats throughout; "record the TCG boot time"; "assume `GONDOLIN_START_TIMEOUT_MS` needs raising" | Gone. HVF is the only backend, so boots are sub-second and the default 120 s timeout stands. |
| Stage 5 check: "re-run Stages 3-5 on the Mac before merging" | Gone — the Mac is the only environment. |
| CI: replace `validate-kit` with `runtime` + `bypass` jobs | **Out of scope** by decision. See "Out of scope". |
| `OPENROUTER_API_KEY` via the two-step `sbx secret` dance | `export OPENROUTER_API_KEY=...` on the Mac. `createHttpHooks` injects it host-side for `openrouter.ai` only; the guest sees a placeholder. |
| Stages implicitly single-actor | Every stage tagged **HOST** / **AGENT**, with command blocks. |

Everything else from revision 2 — the cuts, the five design decisions, the
codebase findings — stands unchanged and is carried below.

## Carried forward from revision 2

**The finding that removes the custom providers.** `vfs.hooks.before` runs
before the backend call and its exception propagates (`vfs/provider.ts:255`),
and hooks wrap the whole mount router (`vm/core.ts:2210`), so a hook sees
absolute guest paths. Hooked ops: `open` (with flags), `mkdir`, `unlink`,
`rmdir`, `rename` (both paths), `link`, `truncate`, `write`, `writeFile`,
`readFile`, plus the read side. `fallocate` and `copy_file_range` have no path
form — they take an `fh` (`rpc-service.ts:578`, `:600`) and reach the backend
through hooked handle methods. One `before` callback intercepts every mutation.

*One documented gap:* `symlink` is not hooked (`provider.ts:494`). It cannot
bypass the rule — you cannot symlink over an existing file (`EEXIST`), and the
file cannot be removed because `unlink` and `rename` are hooked. Writing
*through* a symlink is safe: the guest kernel resolves it first, so the hook
sees the real path.

*The rule for future policy:* freeze a **directory** → nest a
`ReadonlyProvider` mount (covers `symlink`, `readonly.ts:125`); freeze a
**file** → the hook; conditional policy → a custom provider, which is Stage 6.

**Verified against the Gondolin codebase** (clone at HEAD `29fa74d`,
`host/package.json` 0.12.0):

- `MemoryProvider` is a built-in and is exported; wrap it in `ReadonlyProvider`
  because `MemoryProvider`'s own check misses `r+` while `ReadonlyProvider` uses
  `isWriteFlag` (`/[wa+]/`), which catches it.
- Everything needed is public API — `MemoryProvider`, `RealFSProvider`,
  `ReadonlyProvider`, `VmCheckpoint`, `createHttpHooks`, `VfsHooks`.
  `createErrnoError` is **not** exported; reimplement in ~15 lines setting
  `error.code` (translation is by code first, `linux-errno.ts`).
- **Pin the image tag, never `latest`.** Checkpoints bind to a `buildId`
  (`checkpoint.ts:303-312`). Use `GONDOLIN_DEFAULT_IMAGE=alpine-base:0.2.0`.
- **The `uv` trap.** `/init` exports `XDG_DATA_HOME=/tmp/.local/share` and
  `UV_CACHE_DIR=/tmp/.cache/uv` (`guest/image/init:53-56`), both tmpfs, so
  `uv tool install` must set `UV_TOOL_DIR`/`UV_TOOL_BIN_DIR` under `/usr/local`
  or the CLIs vanish on resume.
- **Do not use `autoStart: false`.** Documented, but broken in 0.12.0:
  `ensureRunning()` throws `sandbox is stopped` (`vm/core.js:1231`), so an
  explicit `start()` can never boot. Harmless — everything is configured through
  `VM.create` options — but never reach for it.
- **`gondolin build` with `postBuild.commands` cannot run on macOS** (it
  chroots; `alpine/packages.ts:170`, `build/index.ts:84`). Hence
  provision-then-checkpoint rather than a built image.
- `/etc/gondolin` is auto-injected (the MITM CA), so the "exactly three entries"
  assertion applies to `/workspace`, not `/`.
- **Known cosmetic wart:** `access(W_OK)` is answered from `provider.readonly`
  (`rpc-service.ts:1139`), so `test -w okf/.okflintrc.json` reports writable and
  the write then fails. Accept it; fixing it costs a provider.
- Typecheck against the installed package, not the clone — tags stop at `v0.9.1`
  while `package.json` says 0.12.0.

---

## Stage 0 — Host prerequisites and the handshake · **HOST**

No repo changes. Establishes the toolchain and proves the log handoff works in
both directions before any code depends on it.

```bash
cd ~/Code/md2okf-gondolin
brew install qemu node uv
mkdir -p logs/gondolin
{ sw_vers; uname -m; node --version; npm --version; uv --version;
  qemu-system-aarch64 --version | head -1; } 2>&1 | tee logs/gondolin/stage0-env.log
```

The host CLIs must also be on the Mac's `PATH` — the Ralph loop's Merkle
stop-condition runs on the host, deliberately outside the agent's reach:

```bash
make install-clis
merkleokf --version 2>&1 | tee -a logs/gondolin/stage0-env.log
```

**Checks**

- [ ] `node --version` ≥ 23.6.0 (Gondolin's `engines`). Brew's `node` is 24.x.
- [ ] `qemu-system-aarch64 --version` reports a version.
- [ ] `uv --version` and `merkleokf --version` both succeed.
- [ ] The agent can read `logs/gondolin/stage0-env.log` — this is the handshake.
      If it cannot, the shared-mount assumption is wrong and the whole handoff
      falls back to pasting output into the chat.

## Stage 1 — `runtime/` skeleton and proof of boot · **AGENT** writes, **HOST** runs

First VM boot. Merged with revision 2's Stage 1 because the smoke test needs the
package installed, and only the host can install it.

**Agent writes:** `runtime/package.json`
(`@earendil-works/gondolin@0.12.0` pinned exactly, `"type": "module"`,
`"private": true`), `runtime/tsconfig.json`, `runtime/scripts/smoke.ts` (boot
`alpine-base:0.2.0`, run `uname -a`, `id -u`, `ls /data`, close), and the
`.gitignore` entries `runtime/node_modules/`, `runtime/.cache/`.

Also a Makefile guard, so a VM target run in the wrong place fails legibly
instead of dying inside QEMU:

```make
# VM targets need HVF and therefore the macOS host. IS_SANDBOX is set by sbx.
require-host:
	@if [ -n "$$IS_SANDBOX" ]; then \
		echo "This target needs the macOS host (Gondolin needs HVF). Run it there." >&2; \
		exit 1; \
	fi
```

**Host runs** (first time only, `npm install` to generate the lockfile; commit
`runtime/package-lock.json` afterwards, then it is `npm ci` forever):

```bash
cd ~/Code/md2okf-gondolin
npm --prefix runtime install 2>&1 | tee logs/gondolin/stage1-install.log
GONDOLIN_DEFAULT_IMAGE=alpine-base:0.2.0 \
  node runtime/scripts/smoke.ts 2>&1 | tee logs/gondolin/stage1-smoke.log
```

**Checks**

- [ ] First boot downloads guest assets (~200 MB) into `~/.cache/gondolin/` and
      the `alpine-base:0.2.0` tag resolves.
- [ ] The VM boots and prints guest `uname -a`, exit 0. Record the wall-clock
      time — it should be a second or two under HVF.
- [ ] Guest context matches what later stages assume: `id -u` is 0, `HOME=/root`,
      the FUSE mount point `/data` exists.
- [ ] The SDK runs from plain `node` with no bundler or build step.
- [ ] Agent-side: `node_modules/@earendil-works/gondolin/dist/src/index.d.ts`
      is readable from the sandbox, so the fast typecheck loop is available.

## Stage 2 — The guard hook · **AGENT**

Pure code, no VM — the one stage that is entirely the agent's, and the whole
enforcement layer.

- `runtime/src/guard.ts` — one exported factory returning a `VfsHooks.before`
  that (a) denies mutating ops on a literal `FROZEN` list — today exactly
  `["/workspace/okf/.okflintrc.json"]` — with `EACCES`, and (b) appends every
  mutation and every denial to the audit log. Plus the local `errnoError`
  helper and a local write-flag predicate.
  **Constraint:** no runtime import from `@earendil-works/gondolin` — types
  only, via `import type`. This is what lets the agent run the tests at all,
  and it keeps the guard trivially unit-testable.
- `runtime/test/guard.test.ts` — `node --test` over the pure function.
- Makefile: `make validate` becomes `tsc --noEmit` + these tests, keeping its
  `AGENTS.md` contract (static, no VM, no network, run before finishing). It
  drops `scripts/validate-spec.sh` and needs no `require-host`.

**Agent checks** (inner loop, against the host-installed tree, `--experimental-strip-types` because the sandbox ships Node 22):

```bash
node --experimental-strip-types --test runtime/test/guard.test.ts
node runtime/node_modules/typescript/bin/tsc --noEmit -p runtime/tsconfig.json
```

**Host runs** (authoritative):

```bash
make validate 2>&1 | tee logs/gondolin/stage2-validate.log
```

**Checks**

- [ ] Every mutating op is denied on a frozen path: `open` with `w`/`w+`/`a`/
      `a+`/`r+`, `unlink`, `rmdir`, `mkdir`, `rename` (as *either* end), `link`
      (either end), `truncate`, `write`, `writeFile`.
- [ ] Reads of the frozen path succeed and it still appears in `readdir`.
- [ ] Non-frozen paths under `okf/` are untouched by the hook.
- [ ] Every symbol used appears in the installed `index.d.ts`.
- [ ] `grep -r "from \"@earendil-works/gondolin\"" runtime/src/guard.ts` matches
      only an `import type` line.
- [ ] `make lint` still passes (agent-side).

## Stage 3 — Provisioning and the checkpoint · **AGENT** writes, **HOST** runs

`gondolin build` cannot run on macOS, so the image is made by booting stock
Alpine, installing the toolchain, and checkpointing.

**Agent writes:** `runtime/image/provision.ts` and the `runtime-image` target.

Toolchain, pinned exactly as `pi/spec.yaml` pins today: `apk add tree`;
`npm i -g @earendil-works/pi-coding-agent@0.85.1 @thisismydesign/okf-lint@0.1.0`;
`uv tool install` the four CLIs with `UV_TOOL_DIR` and `UV_TOOL_BIN_DIR` under
`/usr/local`; `pi install npm:@upstash/context7-pi@0.1.2`.

**The provisioning mount set is not the run mount set** — this is easy to get
wrong. Provisioning mounts `scripts/` read-only so `uv tool install` can reach
the four CLI projects; the run-time workspace of Stage 4 does not mount
`scripts/` at all. The CLIs live in the image afterwards, not in the workspace.

**Host runs:**

```bash
make runtime-image 2>&1 | tee logs/gondolin/stage3-image.log
make test-sandbox 2>&1 | tee logs/gondolin/stage3-toolchain.log
```

`runtime/test/toolchain.test.ts` is the port of `tests/test-sandbox-guest.sh`
and must run **after a resume**, not against the live provisioning VM — that is
exactly what catches the `uv`/tmpfs trap.

**Checks**

- [ ] `make runtime-image` produces `runtime/.cache/md2okf-base.qcow2`; a second
      run resumes without reinstalling.
- [ ] `make test-sandbox` green after a resume — `pi`, `okf-lint`, `inspectmd`,
      `inspectokf`, `sizeokf`, `merkleokf`, `tree` all runnable.
- [ ] Guest Node ≥ 22.19 (Pi's `engines`).
- [ ] Provisioning hosts (`registry.npmjs.org`, `pypi.org`,
      `files.pythonhosted.org`, Alpine mirrors) are build-time only and absent
      from the run-time allowlist.

## Stage 4 — Workspace assembly and the bypass matrix · **AGENT** writes, **HOST** runs

The security gate. Five mounts, all built-in providers.

| Guest path | Provider |
| --- | --- |
| `/workspace` | `ReadonlyProvider(MemoryProvider ← SPEC.md)` — synthetic root, so no writable ancestor exists and `mv okf okf-old` is impossible |
| `/workspace/md` | `ReadonlyProvider(RealFSProvider(md/))` |
| `/workspace/okf` | `RealFSProvider(okf/)` — plain; the hook does the freezing |
| `/sessions` | `RealFSProvider(logs/sessions/)` |
| `/config` | `ReadonlyProvider(RealFSProvider(pi/files/home/.pi/agent/))` |

Plus `vfs.hooks.before` from Stage 2. The driver runs
`cp -r /config/. /root/.pi/agent/` before starting Pi: `/root` is tmpfs on a
throwaway rootfs, so the copy is writable — which is what lets `pi install`
place Context7 under `~/.pi/agent/npm/` — yet nothing written there survives the
VM or reaches the host.

**Agent writes:** `runtime/src/workspace.ts` and `runtime/test/bypass.test.ts`.
Only rows that test whether something can reach the backend *without* passing
the hook or the read-only mounts:

1. `echo x > /workspace/okf/.okflintrc.json` → `EACCES`
2. `rm -f` the same → `EACCES`
3. `mv /workspace/okf/index.md /workspace/okf/.okflintrc.json` → `EACCES`
4. `ln -s … /tmp/l && echo x > /tmp/l` → `EACCES` (symlink laundering)
5. `ln /workspace/okf/index.md /workspace/okf/.okflintrc.json` → `EACCES`
6. `echo x > /data/workspace/okf/.okflintrc.json` → `EACCES` (dual path)
7. `umount /workspace/okf` then row 6 → `EACCES`
8. `fallocate` / `cp --reflink` at the frozen path → `EACCES`
9. `echo x >> /workspace/md/<doc>.md` → `EROFS`; `mv /workspace/okf …` → `EXDEV`
10. `chmod 777` the frozen path → host mode unchanged
11. `ls /workspace` is exactly `SPEC.md  md  okf`; `pi/`, `scripts/`, `.git/`
    unreachable
12. Pi's own `write`/`edit` tools against rows 1-3 → same errors

The suite runs against a **scratch copy** of the repo in a temp dir, never the
real tree; it creates that copy itself so the host command stays one line.

**Host runs:**

```bash
make test-bypass 2>&1 | tee logs/gondolin/stage4-bypass.log
```

**Checks**

- [ ] Every row passes.
- [ ] `/config` is read-only; the `/root/.pi/agent` copy is writable; edits to it
      do not reach the host.
- [ ] Pi starts and loads Context7 from the copy.
- [ ] The audit log records both a successful write and a denial.
- [ ] The scratch tree is byte-identical afterwards except under `okf/`.

**Gate:** a failing row is a hole. Fix the guard; never weaken the test.

## Stage 5 — Driver and cut-over · **AGENT** writes, **HOST** runs

`main` stays on `sbx` until the branch merges; that is the fallback, so there is
no dual-runtime stage.

**Agent writes:**

- `runtime/src/compile-okf.ts` — replaces `scripts/compile-okf.sh`. Per
  document: `checkpoint.resume()`, the Ralph loop capped by `RALPH_MAX`,
  `vm.exec(["pi", "--mode", "json", "--session-dir", "/sessions", …],
  { cwd: "/workspace" })`, `vm.close()`. The `jq` event filter
  (`compile-okf.sh:66-81`) becomes typed JSON parsing of the same
  `tool_execution_start` and `message_end` events. The Merkle stop-condition
  runs on the **host** (`merkleokf --nolog -L 0 okf/`), out of the agent's
  reach. The `</dev/null` stdin hazard cannot occur — `vm.exec` takes `stdin`
  as an explicit option.
- `runtime/src/net.ts` — `createHttpHooks({ allowedHosts: ["openrouter.ai",
  "registry.npmjs.org", "context7.com"], secrets: { OPENROUTER_API_KEY: {
  hosts: ["openrouter.ai"], value: process.env.OPENROUTER_API_KEY } } })`,
  `allowWebSockets: false`. The key never enters the VM.
- `runtime/src/shell.ts` — `make shell` (`vm.shell()`) and `make agent`
  (`vm.shell({ command: ["pi", …] })`), replacing `scripts/bash.sh` and
  `scripts/pi.sh`.
- `git mv pi/files/home/.pi/agent runtime/agent`; repoint `/config`. Delete
  `pi/`, `scripts/{compile-okf,bash,pi,validate-spec}.sh`,
  `tests/test-sandbox*.sh`. Repoint `make wiki`; add `require-host` to every VM
  target.
- Docs: `README.md` (diagram; `brew install qemu node uv` replaces the sbx
  install; the two-step `sbx secret` dance becomes one `export`),
  `AGENTS.md` (repo map, commands, and replace the "always validate the sandbox
  kit spec" section with the new `make validate`), `runtime/agent/AGENTS.md`
  (keep "Workspace boundaries" but reword as *documentation of* an enforced
  policy; trim "Installed tools" to the minimal set), `CHANGELOG.md` →
  `## [0.2.0]`, `VERSION` → `0.2.0`, `.cspell.json` (add `gondolin`, `qcow2`,
  `errno`; drop dead sbx terms).

**Host runs:**

```bash
export OPENROUTER_API_KEY=sk-or-...
make wiki 2>&1 | tee logs/gondolin/stage5-wiki.log
make lint-okf 2>&1 | tee logs/gondolin/stage5-lintokf.log
make lint validate test-clis test-web2md 2>&1 | tee logs/gondolin/stage5-all.log
```

Use a scratch copy of the tree for the first `make wiki`, then repeat against
the real one once it is clean.

**Checks**

- [ ] `make wiki` compiles one document end-to-end; `make lint-okf` passes.
- [ ] Zero denials in the audit log on a legitimate run — a denial means the
      policy is wrong and must be fixed before merge.
- [ ] Pi's write tool works over FUSE, including `write`-then-`edit` chunking,
      and does not rely on cross-mount `rename` (which returns `EXDEV`).
- [ ] `okf/log.md` is written correctly — new date heading at the top.
- [ ] `OPENROUTER_API_KEY` appears nowhere inside the guest.
- [ ] OpenRouter streaming works over HTTP/1.1-only mediated egress (Gondolin
      has no HTTP/2 or HTTP/3).
- [ ] `rg -n 'sbx|Docker Sandbox'` matches only `CHANGELOG.md` history, the two
      research reports, and `.github/` (see below).
- [ ] A fresh clone reaches a compiled wiki following `README.md` alone.

## Stage 6 — Deferred (not this migration)

Only once the boundary is proven and the audit log has data from real runs:
per-run scoping (report §5.5c) and frontmatter `locked: true` locks (§5.5b).
Both make policy *conditional*, which is the point at which a custom provider
finally earns its place — and the point at which the `symlink` hook gap and the
`access(W_OK)` wart become worth fixing.

---

## Out of scope

**CI is excluded by decision** — this migration is local-only. One consequence
must be stated rather than discovered: `.github/workflows/ci.yml` has a
`validate-kit` job that installs the `sbx` CLI and runs `make validate` against
`pi/spec.yaml`. Stage 5 deletes `pi/` and redefines `make validate` as a
typecheck plus unit tests needing `runtime/node_modules`, which that job never
installs. **The job will fail on every push once the branch merges.** Fixing it
is a small, separate change — drop the sbx install steps, add a Node setup and
`npm --prefix runtime ci` — deliberately left out here.

## Files

**New:** `runtime/{package.json,package-lock.json,tsconfig.json}`,
`runtime/src/{guard,workspace,compile-okf,net,shell}.ts`,
`runtime/scripts/smoke.ts`, `runtime/image/provision.ts`,
`runtime/test/{guard,toolchain,bypass}.test.ts`.

**Moved:** `pi/files/home/.pi/agent/` → `runtime/agent/`.

**Modified:** `Makefile`, `.gitignore`, `README.md`, `AGENTS.md`,
`CHANGELOG.md`, `VERSION`, `.cspell.json`.

**Deleted:** `pi/`, `scripts/{compile-okf,bash,pi,validate-spec}.sh`,
`tests/test-sandbox*.sh`.

**Unchanged:** `md/`, `okf/`, `SPEC.md`, `web2md/`, `pdf2md/`, the four uv CLI
projects, `.github/workflows/`, `make lint`, `make lint-okf`, `make scrape`.

## Verification summary

| Where | What |
| --- | --- |
| Agent, no VM | `make lint`; `tsc --noEmit`; guard unit tests. The fast inner loop. |
| Host, no VM | `make validate` — authoritative typecheck and guard tests. |
| Host, VM | `make runtime-image`, `make test-sandbox`, `make test-bypass`, `make wiki` → `make lint-okf`. |

The decisive check is Stage 4: if the bypass matrix passes, the agent's write
access is confined to `okf/` minus `.okflintrc.json`, and no `sudo` inside the
VM changes that.

Each host command tees into `logs/gondolin/`; the agent reads the log and drives
the next step from what it says.

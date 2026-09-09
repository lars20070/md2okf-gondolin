# Plan: replace the Docker `sbx` sandbox with Gondolin

> **Revision 2.** Rewritten after a self-review for over-engineering. The
> previous revision proposed a four-level policy language, three custom VFS
> providers and an append-only `log.md`. All three are removed — see
> "What this revision cuts and why". The migration now adds **zero custom
> providers**: five built-in mounts plus one ~40-line hook.

## Context

`REDESIGN-gondolin-permissions.md` established that the Pi agent today has
unrestricted read/write over the whole md2okf working tree — the `sbx` kit
carries a network policy only, `sudo` is passwordless, and the boundary is prose
in `pi/files/home/.pi/agent/AGENTS.md`. That lets the agent rewrite its own
instructions, the driver that runs it, and `merkleokf` — the tool used to
supervise it.

In Gondolin the guest filesystem is served by host-side JavaScript, so the
boundary sits outside the VM and survives guest root. The agent's world becomes
exactly `SPEC.md` (read-only), `md/` (read-only) and `okf/` (writable, with
`.okflintrc.json` frozen). Nothing else in the repo is mounted.

**Decisions confirmed with Lars:** minimal guest toolchain; audit log now with
per-run scoping and frontmatter locks deferred; verification here under TCG then
re-run on the Mac; rulebook copied fresh into the VM each run; clean VM per
document; a denied write is logged and the run continues. All five stand after
review — see "Assessment of the design decisions".

## What this revision cuts and why

| Cut | Why |
| --- | --- |
| Append-only `log.md` | **It would break every run.** `AGENTS.md` requires new date headings at the *top* of `log.md`, newest-first. That is a rewrite from byte zero, not an append. This was my invention, not a requirement. |
| `policy.ts` + `workspace.json` (4 levels, longest-match) | A policy language to express **one rule** — `.okflintrc.json` is frozen. Speculative generality for the Stage-6 features we agreed to defer. Replaced by a literal list. |
| `WriteGuardProvider`, `AppendOnlyProvider`, `StaticReadonlyProvider` | Not needed. See below — built-in providers plus one hook cover the whole policy. |
| `GONDOLIN_REUSE_VM=1` | Two VM-lifetime code paths so that *my* slow test environment is comfortable. Not Lars's problem to carry in his repo. |
| Dual-runtime stage (`make wiki-gondolin` alongside `make wiki`) | On a branch, git *is* the fallback. It bought a temporary make target, a temporary config location, and a rename commit. |
| 24-row VM adversarial matrix | Trimmed to ~10 bypass-shaped rows. Unit tests answer "does the rule deny X"; the VM only needs to answer "can anything reach the backend without passing the rule". |

### The finding that removes the custom providers

`vfs.hooks.before` runs before the backend call and its exception propagates
(`vfs/provider.ts:255`), and hooks wrap the **whole mount router**
(`vm/core.ts:2210`), so a hook sees absolute guest paths. Handle-level hooks
report the guest-visible path deliberately (`provider.ts:56-66`).

Hooked operations: `open` (with flags), `mkdir`, `unlink`, `rmdir`, `rename`
(both paths), `link`, `truncate`, `write`, `writeFile`, `readFile`, plus the
read side. `fallocate` and `copy_file_range` have **no path form** — they take
an `fh` (`rpc-service.ts:578`, `:600`) and reach the backend through
`handle.truncate` / `handle.read` / `handle.write`, all hooked. So one `before`
callback intercepts every mutation the agent can make.

**One documented gap:** `symlink` is *not* hooked (`provider.ts:494` delegates
without `runBefore`). It cannot bypass our rule — you cannot symlink over an
existing file (`EEXIST`), and the file cannot be removed because `unlink` and
`rename` are hooked. Writing *through* a symlink is safe too: the guest kernel
resolves it before issuing the op, so the hook sees the real path.

**The rule this creates for future policy:**

- Freeze a **directory** → nest a `ReadonlyProvider` mount over it. Covers
  `symlink` (`readonly.ts:125`) and everything else.
- Freeze a **file** → the hook.
- Only if policy becomes *conditional* (per-run scoping, frontmatter locks) does
  a custom provider earn its place. That is Stage 6.

## Assessment of the design decisions

I would push back on **none** of the five, but one needs its justification
corrected.

- **Minimal image** — right, and it pays more than expected: dropping `mq` also
  drops the `mqlang.org` allowlist entry, the checksummed-binary install step,
  and the glibc/musl blocker that forced a Debian OCI base.
- **Audit log now** — right, and after the rewrite it is *free*: the deny check
  and the audit record are the same hook.
- **Fresh rulebook copy per run** — right. One read-only mount plus one `cp`, and
  it removes the "config only lands in a fresh sandbox" wart that `AGENTS.md`
  documents today. Sound on security: Pi reads its config at startup, and the
  copy dies with the VM.
- **Clean VM per document** — keep, but **the isolation argument is weak** and
  should not be the reason. The rootfs is a throwaway COW overlay, `/tmp` and
  `/root` are tmpfs, and `okf/` is shared across documents *by design* — the
  wiki is cumulative. There is almost nothing to leak. The honest reason is that
  the checkpoint has to exist anyway (provisioning cannot use `gondolin build`
  on macOS), so resuming per document is one extra line for a predictable
  starting state.
- **Continue and log on denial** — right. A denial is information, not a
  failure; the agent normally retries an allowed route.

## Verified against the Gondolin codebase

Fresh clone, HEAD `29fa74d`, `host/package.json` 0.12.0.

- **The synthetic root is a built-in.** `MemoryProvider` is exported and
  enforces read-only internally (`providers/memory.js:466-746`). Wrap it in
  `ReadonlyProvider`: `MemoryProvider`'s own check misses `r+`, and
  `ReadonlyProvider` uses `isWriteFlag` (`/[wa+]/`), which catches it.
- **Everything needed is public API** — `MemoryProvider`, `RealFSProvider`,
  `ReadonlyProvider`, `ERRNO`, `isWriteFlag`, `normalizeVfsPath`, `VmCheckpoint`,
  `createHttpHooks`, `VfsHooks`. `createErrnoError` is *not* exported; reimplement
  it in ~15 lines, setting `error.code` (translation is by code first,
  `linux-errno.ts`).
- **Pin the image tag, never `latest`.** Checkpoints bind to a `buildId`
  (`checkpoint.ts:303-312`); `alpine-base:latest` and `:0.2.0` share an id today
  but `latest` moves. Use `GONDOLIN_DEFAULT_IMAGE=alpine-base:0.2.0`.
- **The `uv` trap.** `/init` exports `XDG_DATA_HOME=/tmp/.local/share` and
  `UV_CACHE_DIR=/tmp/.cache/uv` (`guest/image/init:53-56`), both tmpfs, so
  `uv tool install` must set `UV_TOOL_DIR`/`UV_TOOL_BIN_DIR` under `/usr/local`
  or the CLIs vanish on resume.
- **`GONDOLIN_START_TIMEOUT_MS`** defaults to 120 s (`core.ts:107`). Under TCG a
  boot is far slower than under HVF, so assume this needs raising and measure it
  in Stage 1.
- **Do not use `autoStart: false`.** `docs/sdk-vm.md` documents
  `VM.create({ autoStart: false })` followed by `await vm.start()`, but that
  path is broken in 0.12.0: `ensureRunning()` throws `sandbox is stopped` when
  `state === "stopped" && !this.autoStart` (`vm/core.js:1231`), so an explicit
  `start()` can never boot. No upstream issue exists. Harmless for us —
  everything is configured through `VM.create` options — but never reach for it.
- **Typecheck against the installed package**, not the clone — tags stop at
  `v0.9.1` while `package.json` says 0.12.0, and HEAD carries post-release work.
- **`/etc/gondolin` is auto-injected** (the MITM CA), so the "exactly three
  entries" assertion applies to `/workspace`, not `/`.
- **Known cosmetic wart:** `access(W_OK)` is answered from `provider.readonly`
  (`rpc-service.ts:1139`), so `test -w okf/.okflintrc.json` reports writable and
  the write then fails. Accept it; fixing it costs a provider.

Two findings from planning that supersede the report: **`gondolin build` with
`postBuild.commands` cannot run on macOS** (it chroots; `alpine/packages.ts:170`,
`build/index.ts:84`) — hence provision-then-checkpoint; and **QEMU falls back to
TCG without `/dev/kvm`** (`controller.ts:852`), so the VM stages run here and in
CI, slowly.

## Prerequisites

| | Dev sandbox (here) | Lars's Mac |
| --- | --- | --- |
| QEMU | `apt-get install qemu-system-arm` | `brew install qemu` |
| Node | ≥ 23.6.0 (gondolin `engines`); currently 22.22.1 → nvm | ≥ 23.6.0 |
| Accel | TCG — slow but works | HVF — fast |

Node ≥ 23.6 means the driver is plain `.ts` run directly by `node`: no bundler,
no build step. `gondolin` is ESM-only and ships its own types.

---

## Stage 1 — Prerequisites and a proof-of-boot

No repo changes. Install the two prerequisites in the dev sandbox and prove a VM
boots before any of the design is written.

- QEMU: `apt-get install qemu-system-arm`.
- Node ≥ 23.6.0 (gondolin's `engines`); the sandbox ships 22.22.1 today, so this
  needs a newer runtime on `PATH`. Whatever the mechanism, it must survive across
  bash invocations without sourcing a completion script — that hazard is
  documented in the repo's `CLAUDE.md` and breaks the shell outright.
- A throwaway script that boots `alpine-base:0.2.0` through the SDK and runs
  `uname -a` in the guest.

**Checks**

- [ ] `qemu-system-aarch64 --version` reports a version; `node --version` clears
      gondolin's `engines: >=23.6.0`.
- [ ] The VM boots and prints its guest `uname -a`, exit 0.
- [ ] Record the TCG boot time and the cost of a subsequent `vm.exec`.
- [ ] Confirm the guest context the rest of the plan assumes: `id -u` is 0,
      `HOME=/root`, and the FUSE mount point `/data` exists.
- [ ] Confirm the SDK runs from plain `node` with no bundler or build step, as
      Stage 5 assumes.

**What this stage has to settle**

- Whether TCG is fast enough to make the VM stages (3, 4, 5) workable here, or
  whether they have to move to the Mac.
- Whether clean-VM-per-document is affordable, which is the last open doubt about
  that decision.
- Whether `GONDOLIN_START_TIMEOUT_MS` needs raising under TCG.
- That the `alpine-base:0.2.0` tag pinned against checkpoints in Stage 3
  resolves.

## Stage 2 — `runtime/` skeleton and the guard hook

Pure code, no VM. This is the whole enforcement layer.

- `runtime/package.json` — `@earendil-works/gondolin@0.12.0` pinned exactly,
  `"type": "module"`, `"private": true`; `runtime/tsconfig.json` for
  `tsc --noEmit`.
- `runtime/src/guard.ts` — one exported factory returning a `VfsHooks.before`
  that (a) denies mutating ops on a literal `FROZEN` list — today exactly
  `["/workspace/okf/.okflintrc.json"]` — with `EACCES`, and (b) appends every
  mutation and every denial to the audit log. Plus the local `errnoError`
  helper.
- `runtime/test/guard.test.ts` — `node --test` over the pure function.
- Makefile: `make validate` becomes `tsc --noEmit` + these tests, keeping its
  `AGENTS.md` contract (static, no VM, no network, run before finishing).
  `.gitignore`: `runtime/node_modules/`, `runtime/.cache/`.

**Checks**

- [ ] `npm --prefix runtime ci` and `make validate` pass.
- [ ] Every mutating op is denied on a frozen path: `open` with `w`/`w+`/`a`/
      `a+`/`r+`, `unlink`, `rmdir`, `mkdir`, `rename` (as *either* end), `link`
      (either end), `truncate`, `write`, `writeFile`.
- [ ] Reads of the frozen path succeed and it still appears in `readdir`.
- [ ] Non-frozen paths under `okf/` are untouched by the hook.
- [ ] Every symbol used appears in
      `node_modules/@earendil-works/gondolin/dist/src/index.d.ts`.
- [ ] `make lint` still passes.

---

## Stage 3 — Provisioning and the checkpoint

- `runtime/image/provision.ts` + `make runtime-image`: boot stock
  `alpine-base:0.2.0`, install the toolchain, `vm.checkpoint()` to
  `runtime/.cache/md2okf-base.qcow2`.
- Toolchain, pinned as `pi/spec.yaml` pins today: `apk add tree`;
  `npm i -g @earendil-works/pi-coding-agent@0.85.1
  @thisismydesign/okf-lint@0.1.0`; `uv tool install` the four CLIs from
  `scripts/{inspectmd,inspectokf,sizeokf,merkleokf}` with `UV_TOOL_DIR` and
  `UV_TOOL_BIN_DIR` under `/usr/local`; `pi install
  npm:@upstash/context7-pi@0.1.2`.
- `runtime/test/toolchain.test.ts` — the port of `tests/test-sandbox-guest.sh`.

**Checks**

- [ ] `make runtime-image` produces the checkpoint; a second run resumes without
      reinstalling.
- [ ] `make test-sandbox` green **after a resume** — `pi`, `okf-lint`,
      `inspectmd`, `inspectokf`, `sizeokf`, `merkleokf`, `tree` all runnable.
      Testing after a resume rather than on the live VM is what catches the
      `uv`/tmpfs trap.
- [ ] Guest Node ≥ 22.19 (Pi's `engines`).
- [ ] Provisioning hosts (`registry.npmjs.org`, `pypi.org`,
      `files.pythonhosted.org`, Alpine mirrors) are build-time only and absent
      from the run-time allowlist.

---

## Stage 4 — Workspace assembly and the bypass matrix

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

`runtime/test/bypass.test.ts` — the trimmed matrix. Only rows that test whether
something can reach the backend *without* passing the hook or the read-only
mounts:

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

Run against a **scratch copy** of the repo in a temp dir, never the real tree.

**Checks**

- [ ] Every row passes.
- [ ] `/config` is read-only; the `/root/.pi/agent` copy is writable; edits to it
      do not reach the host.
- [ ] Pi starts and loads Context7 from the copy.
- [ ] The audit log records both a successful write and a denial.
- [ ] The scratch tree is byte-identical afterwards except under `okf/`.

**Gate:** a failing row is a hole. Fix the guard; never weaken the test.

---

## Stage 5 — Driver and cut-over, on one branch

`master` stays on `sbx` until the branch merges; that is the fallback, so there
is no dual-runtime stage.

- `runtime/src/compile-okf.ts` — replaces `scripts/compile-okf.sh`. Per document:
  `checkpoint.resume()`, the Ralph loop capped by `RALPH_MAX`,
  `vm.exec(["pi", "--mode", "json", "--session-dir", "/sessions", …],
  { cwd: "/workspace" })`, `vm.close()`. The `jq` event filter becomes typed
  JSON parsing. The Merkle stop-condition runs on the **host**
  (`merkleokf --nolog -L 0 okf/`), out of the agent's reach. The `</dev/null`
  stdin hazard cannot occur — `vm.exec` takes `stdin` as an explicit option.
- `runtime/src/net.ts` — `createHttpHooks({ allowedHosts: ["openrouter.ai",
  "registry.npmjs.org", "context7.com"], secrets: { OPENROUTER_API_KEY: { hosts:
  ["openrouter.ai"], … } } })`, `allowWebSockets: false`. The key never enters
  the VM.
- `runtime/src/shell.ts` — `make shell` (`vm.shell()`) and `make agent`
  (`vm.shell({ command: ["pi", …] })`).
- `git mv pi/files/home/.pi/agent runtime/agent`; repoint `/config`. Delete
  `pi/`, `scripts/{compile-okf,bash,pi,validate-spec}.sh`,
  `tests/test-sandbox*.sh`. Repoint `make wiki`.
- CI: replace the `validate-kit` job (which installs the `sbx` CLI) with a
  `runtime` job running `make validate`; add a `bypass` job with a generous
  `timeout-minutes`, movable to nightly if TCG is too slow.
- Docs: `README.md` (diagram; QEMU + Node replace sbx; the two-step `sbx secret`
  dance becomes one env var), `AGENTS.md` (repo map, commands, the "always
  validate the kit spec" section), `runtime/agent/AGENTS.md` (keep "Workspace
  boundaries" but reword as *documentation of* an enforced policy; trim
  "Installed tools" to the minimal set), `CHANGELOG.md` → `## [0.2.0]`,
  `VERSION` → `0.2.0`.

**Checks**

- [ ] `make wiki` compiles one document end-to-end against a scratch copy;
      `make lint-okf` passes on the result.
- [ ] Zero denials in the audit log on a legitimate run — a denial means the
      policy is wrong and must be fixed before merge.
- [ ] Pi's write tool works over FUSE, including `write`-then-`edit` chunking,
      and does not rely on cross-mount `rename` (which returns `EXDEV`).
- [ ] `okf/log.md` is written correctly — new date heading at the top.
- [ ] `OPENROUTER_API_KEY` appears nowhere inside the guest.
- [ ] OpenRouter streaming works over HTTP/1.1-only mediated egress.
- [ ] `make lint`, `make validate`, `make test-clis`, `make test-web2md`,
      `make test-sandbox`, the bypass suite all pass.
- [ ] `rg -n 'sbx|Docker Sandbox'` matches only `CHANGELOG.md` history and the
      two research reports.
- [ ] A fresh clone reaches a compiled wiki following `README.md` alone.
- [ ] **Re-run Stages 3-5 on the Mac** under HVF before merging.

---

## Stage 6 — Deferred (not this migration)

Only once the boundary is proven and the audit log has data from real runs:
per-run scoping (report §5.5c) and frontmatter `locked: true` locks (§5.5b).
Both make policy *conditional*, which is the point at which a custom provider
finally earns its place — and the point at which the `symlink` hook gap and the
`access(W_OK)` wart become worth fixing.

---

## Files

**New:** `runtime/{package.json,tsconfig.json}`,
`runtime/src/{guard,workspace,compile-okf,net,shell}.ts`,
`runtime/image/provision.ts`,
`runtime/test/{guard,toolchain,bypass}.test.ts`.

**Moved:** `pi/files/home/.pi/agent/` → `runtime/agent/`.

**Modified:** `Makefile`, `.gitignore`, `.github/workflows/ci.yml`, `README.md`,
`AGENTS.md`, `CHANGELOG.md`, `VERSION`, `.cspell.json`.

**Deleted:** `pi/`, `scripts/{compile-okf,bash,pi,validate-spec}.sh`,
`tests/test-sandbox*.sh`.

**Unchanged:** `md/`, `okf/`, `SPEC.md`, `web2md/`, `pdf2md/`, the four uv CLI
projects, `make lint`, `make lint-okf`, `make scrape`.

## Verification summary

No VM — the fast inner loop and the CI default: `make validate` (typecheck +
guard unit tests) and `make lint`.

VM needed (TCG here, HVF on the Mac): `make runtime-image`, `make test-sandbox`,
the bypass suite, and `make wiki` end-to-end followed by `make lint-okf`.

The decisive check is Stage 4: if the bypass matrix passes, the agent's write
access is confined to `okf/` minus `.okflintrc.json`, and no `sudo` inside the
VM changes that.

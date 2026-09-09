# Plan: a minimal Gondolin sandbox on macOS — a learning exercise

## Context

Before migrating md2okf-gondolin off `sbx`, you want hands-on familiarity with
Gondolin itself. This plan is that exercise and nothing more: four short steps
on your Mac, each teaching one idea, ending with a `rm -rf`. It is deliberately
**independent of the md2okf codebase** — it compiles no wiki, touches no `okf/`,
`md/` or `pi/`, and changes exactly one tracked line in the repo (a `.gitignore`
entry for the scratch folder).

The exercise is shaped by one hard constraint: **Gondolin needs HVF and
therefore runs only on your host.** I live in a Linux `sbx` sandbox with no
hypervisor, so I write the files and read the logs; you run every command.

The migration plan itself is untouched and lives at
`.claude/plans/gondolin-migration-macos.md`. What I learned while reading the
docs for *this* plan does affect it, so it is recorded in the appendix rather
than lost.

## Where it lives, and how we hand work back and forth

```
md2okf-gondolin/
  .gitignore              <- one new line: .scratch/
  .scratch/gondolin-hello/    <- everything below is disposable
    package.json
    hello.ts
    work/                 (mounted read-write into the guest)
    reference/notes.md    (mounted read-only)
    logs/step*.log        (you tee here; I read)
```

`.scratch/` is a new gitignored directory, so nothing here can reach a commit.
Every command below ends in a `tee` into `.scratch/gondolin-hello/logs/`. The
repo is mounted into my sandbox in direct mode, so I read those logs directly —
say "done" and I pick them up. **Do not use the `!` prefix in the Claude
session for these:** that runs inside my Linux sandbox, where none of this
works.

**I write:** `.gitignore` (one line), `package.json`, `hello.ts`,
`reference/notes.md`, and a `README.md` in the scratch folder holding the same
runbook as this plan, so you can follow it without scrolling here.

## Step 0 — Prerequisites · **HOST**

```bash
cd /Users/lars/Code/md2okf-gondolin/.scratch/gondolin-hello
brew install qemu node
mkdir -p logs work
{ sw_vers; uname -m; node --version; qemu-system-aarch64 --version | head -1; } \
  2>&1 | tee logs/step0-env.log
```

- [ ] `node --version` ≥ 23.6.0 — Gondolin 0.12.0's `engines`, verified on the
      registry. Brew's node is well past it.
- [ ] `uname -m` says `arm64`, so QEMU will use HVF and boots take about a
      second. A boot that takes 30+ seconds means it fell back to software
      emulation and something is wrong.

## Step 1 — First boot · **HOST**

No code, no config. The CLI is pinned so nothing shifts under you mid-exercise.

```bash
npx --yes @earendil-works/gondolin@0.12.0 exec --image alpine-base:0.2.0 \
  -- /bin/sh -lc '
      uname -a
      id -u
      cat /etc/alpine-release
      ls -d /data
      command -v bash curl node npm uv python3
  ' 2>&1 | tee logs/step1-boot.log
```

The first run downloads ~200 MB of guest assets into `~/.cache/gondolin/`;
run it a second time to see the real boot cost.

Then poke around interactively — `exit` to leave, `Ctrl-]` to detach:

```bash
npx --yes @earendil-works/gondolin@0.12.0 bash --image alpine-base:0.2.0
```

**What to notice**

- You are **root** (`id -u` is 0) and it does not matter — the boundary is
  outside the VM. This is the whole argument for the migration.
- `/data` exists: that is the FUSE mount point through which the host serves
  every file the guest sees.
- `alpine-base` already ships bash, curl, ca-certificates, node, npm, uv and
  python3. Nothing was installed to get that.
- Nothing of yours is visible. There is no `/Users`, no repo, no home directory.

## Step 2 — The filesystem is the boundary · **HOST**

Three mounts with three different policies, in one command.

```bash
npx --yes @earendil-works/gondolin@0.12.0 exec --image alpine-base:0.2.0 \
  --mount-hostfs "$PWD/work:/workspace" \
  --mount-hostfs "$PWD/reference:/reference:ro" \
  --mount-memfs /scratch \
  -- /bin/sh -lc '
      echo "written from the guest" > /workspace/from-guest.txt && echo "workspace: write ok"
      echo "nope" > /reference/notes.md 2>&1 || echo "reference: write refused"
      echo "ephemeral" > /scratch/tmp.txt && echo "scratch: write ok"
      echo "--- root ---"; ls /
      echo "--- host tree ---"; ls /Users 2>&1 || echo "host tree not visible"
  ' 2>&1 | tee logs/step2-fs.log
```

Then, on the host:

```bash
{ echo "--- survived on host ---"; cat work/from-guest.txt;
  echo "--- reference unchanged ---"; cat reference/notes.md; } \
  2>&1 | tee -a logs/step2-fs.log
```

Re-run the first command and look for `/scratch/tmp.txt`: it is gone.

**What to notice**

- The read-write mount wrote straight through to your disk; the read-only mount
  refused as root; the memory mount accepted the write and then forgot it.
- `ls /` shows only the guest's own Alpine root plus your three mounts. A
  directory you did not mount does not exist for the guest — not "is denied",
  *does not exist*. That is the property `sbx` cannot offer at all.

## Step 3 — Network allowlist and secret injection · **HOST**

```bash
# a. No allowlist: egress is not permitted.
npx --yes @earendil-works/gondolin@0.12.0 exec --image alpine-base:0.2.0 \
  -- /bin/sh -lc 'curl -sS -m 15 -o /dev/null -w "%{http_code}\n" https://example.com/' \
  2>&1 | tee logs/step3a-blocked.log

# b. Allowlisted: the same request succeeds.
npx --yes @earendil-works/gondolin@0.12.0 exec --image alpine-base:0.2.0 \
  --allow-host example.com \
  -- /bin/sh -lc 'curl -sSI -m 15 https://example.com/ | head -1' \
  2>&1 | tee logs/step3b-allowed.log
```

Now the interesting one. Your real token stays on the host; the guest gets a
placeholder that only works against `api.github.com`:

```bash
export GITHUB_TOKEN="$(gh auth token)"
npx --yes @earendil-works/gondolin@0.12.0 exec --image alpine-base:0.2.0 \
  --allow-host api.github.com \
  --host-secret GITHUB_TOKEN@api.github.com \
  -- /bin/sh -lc '
      echo "the guest sees: $GITHUB_TOKEN"
      curl -sS -H "Authorization: Bearer $GITHUB_TOKEN" \
        https://api.github.com/user | head -c 200; echo
  ' 2>&1 | tee logs/step3c-secret.log
```

**What to notice**

- The echoed value is a **placeholder**, not your token — yet the API call
  comes back authenticated as you. The host substituted the real value into the
  `Authorization` header on its way out, for that host only.
- Your token therefore never enters the VM and cannot be in the log. The log
  *does* contain your public GitHub profile JSON; trim it if you mind.
- This is precisely what replaces the `sbx secret` two-step for
  `OPENROUTER_API_KEY` in the migration.

Two things the docs warn about, worth knowing now: always write
`--host-secret NAME@HOST`, because the bare `--host-secret NAME` form pulls a
managed `trufflehog` helper and asks you to confirm hostnames interactively;
and Gondolin mediates HTTP/1.1 only — no HTTP/2, HTTP/3, QUIC or plain UDP —
so a tool that insists on those will fail here for reasons that have nothing to
do with your policy. (`--allow-host` alongside `--host-secret` may be redundant,
since the secret names its own host; it is included as belt and braces.)

## Step 4 — The same policy in ~50 lines of host JavaScript · **HOST** runs, **AGENT** writes

The CLI flags are a thin shell over the SDK. This is where the migration's real
leverage is: the policy is a JavaScript object you own.

`hello.ts` composes exactly what Step 2 and Step 3 did with flags — a
read-write `RealFSProvider`, a `ReadonlyProvider` wrapping another, a
`MemoryProvider`, and `createHttpHooks` with one allowed host — and adds the
one thing the CLI cannot do: a `vfs.hooks.before` callback that sees **every**
filesystem operation the guest attempts, and prints them at the end.

```bash
npm install 2>&1 | tee logs/step4-install.log
node hello.ts 2>&1 | tee logs/step4-sdk.log
```

**What to notice**

- The audit trail at the end lists each `open`/`write`/`readdir` with its guest
  path. The hook ran on the host, before the operation reached any provider.
- A hook that *throws* denies the operation. That single fact is the entire
  enforcement layer in the migration plan — freezing `.okflintrc.json` is one
  `if` inside this callback.
- Providers stack: `ReadonlyProvider(new RealFSProvider(dir))` is the read-only
  mount from Step 2, written out longhand.

## Cleanup

```bash
cd /Users/lars/Code/md2okf-gondolin
rm -rf .scratch/gondolin-hello
```

The `.gitignore` line can stay (harmless) or be reverted. Guest assets in
`~/.cache/gondolin/` are ~200 MB and are worth keeping — the migration will
reuse them. `rm -rf ~/.cache/gondolin` if you would rather start clean.

## What you should be able to answer afterwards

1. Why does guest `root` not matter?
2. What is the difference between a path that is denied and a path that does
   not exist, and which one does Gondolin give you?
3. Where does the OpenRouter key live during a run, and what does the agent see
   in its place?
4. If you had to freeze one file inside an otherwise writable directory, where
   would the code go?

Those four are the migration in miniature.

## Verification

| Step | Done when |
| --- | --- |
| 0 | `node` ≥ 23.6.0, QEMU present, arm64 confirmed. |
| 1 | A guest `uname -a` in the log, and a second boot that takes about a second. |
| 2 | `work/from-guest.txt` exists on the host, `reference/notes.md` is unchanged, `/scratch/tmp.txt` is gone on re-run, and `ls /` shows no host tree. |
| 3 | `example.com` blocked without the flag and `200`/`HTTP/1.1 200` with it; the guest echoes a placeholder while GitHub answers with your profile. |
| 4 | `hello.ts` prints the VFS audit trail and one refused write. |

I read each log as it lands and confirm the reading matches the intent — the
point is the understanding, not a green tick.

---

## Appendix — findings to fold into the migration plan

Reading the docs and the Gondolin repo for this exercise turned up four things
that change `.claude/plans/gondolin-migration-macos.md`. Recorded here so they
survive; not acted on now.

1. **Stage 3's toolchain shrinks.** `images/alpine-base.json` shows the stock
   image already installs `bash`, `ca-certificates`, `curl`, `e2fsprogs`,
   `nodejs`, `npm`, `uv`, `python3` and `openssh`. Provisioning does not need to
   install node or uv — only `tree`, Pi, `okf-lint`, the four CLIs and the
   Context7 extension. The `uv` tmpfs trap still applies to
   `uv tool install` targets.
2. **The image pin is confirmed and is exactly as fragile as suspected.**
   `builtin-image-registry.json` maps both `alpine-base:latest` and
   `alpine-base:0.2.0` to aarch64 build `108a1836-bdf3-53f1-a4f1-7c65988152d1`
   *today*. Pin `0.2.0`, and pin it in code via
   `VM.create({ sandbox: { imagePath: "alpine-base:0.2.0" } })` — `imagePath`
   accepts an image ref, not just an asset directory — rather than relying on
   the `GONDOLIN_DEFAULT_IMAGE` env var being exported.
3. **There is an official Pi-in-Gondolin example, and it takes the opposite
   architecture to the plan.** `host/examples/pi-gondolin.ts` runs Pi on the
   *host* and overrides its `read`/`write`/`edit`/`bash` tools to execute inside
   the VM, with the launch directory mounted at `/workspace`. The migration plan
   assumes the `pi` binary runs *inside* the guest. Both are viable and the
   trade-off is real — host-side Pi needs no guest provisioning at all, but
   moves the trust boundary, since Pi itself then runs unsandboxed. Worth
   deciding deliberately before Stage 5 rather than by default.
4. **TypeScript `latest` is now 7.0.2** — the Go port. `runtime/package.json`
   should pin `^5.9.0` (resolving to 5.9.3) so a compiler rewrite is not
   adopted mid-migration, and `@types/node` `^26.0.0`. `@earendil-works/gondolin@0.12.0`
   is current `latest` on the registry with `engines: >=23.6.0`.

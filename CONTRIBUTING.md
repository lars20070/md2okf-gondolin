# Contributing to md2okf-gondolin

This guide covers working *on* the repository: the task runner, the test
suites, the Gondolin runtime, and how the agent's own configuration is laid out. If
you only want to compile a wiki, [the README](README.md) is enough.

`AGENTS.md` holds the same ground rules for coding agents working on this repo.

## Commands

```bash
make lint                # markdownlint, jq, yamllint, shellcheck, cspell, ruff;
                         # also VERSION ↔ CHANGELOG.md agreement
make validate            # TypeScript check and pure runtime unit tests
make test-web2md         # pytest, the web2md scraper suite
make test-clis           # pytest, the four host CLI suites
make install-clis        # install the four host CLIs onto PATH
make install-runtime     # install pinned Gondolin host dependencies
make runtime-image       # build or verify the provisioned guest checkpoint
make test-sandbox        # check the checkpoint's toolchain
make test-bypass         # run the adversarial VFS boundary matrix
make lint-okf            # lint the generated wiki
make scrape              # fetch the website into md/ as one file
make wiki                # compile the OKF wiki
```

markdownlint needs `brew install markdownlint-cli2`; yamllint and ruff run via
`uv tool run` and cspell via `npx`, so none of them needs a separate install.
`make lint-okf` needs `pnpm`.

CI (`.github/workflows/ci.yml`) runs four jobs on every pull request: `lint`,
`test-web2md`, `test-clis`, and `validate-runtime`. Each one reuses the matching
`make` target, so a green `make lint && make validate && make test-web2md &&
make test-clis` locally means a green build.

## Validate runtime changes before you finish

Touch anything under `runtime/` or `scripts/*.sh` and run `make validate`
before you call the job done. It type-checks the runtime and runs the VFS guard
and network-policy unit tests without starting a VM. CI runs the same check.

VM checks require macOS HVF. Run `make runtime-image && make test-sandbox` after
changing provisioning or `runtime/agent/`; add `make test-bypass` after changing
VFS mounts or guards. The checkpoint under `runtime/.cache/` is generated and
gitignored.

## Working inside the sandbox

```bash
make shell                                    # interactive shell in a fresh VM
make agent                                    # interactive Pi in a fresh VM
node runtime/src/compile-okf.ts md/other-docs # compile another source folder
```

The shell exposes only the sparse workspace assembled in
`runtime/src/workspace.ts`. Pi sessions require `OPENROUTER_API_KEY` on the
host; the guest receives a placeholder that is substituted only in requests to
OpenRouter.

## Python layout

Python tooling is thin. There is no project at the repo root: `pdf2md/`,
`web2md/`, `scripts/inspectmd/`, `scripts/inspectokf/`, `scripts/sizeokf/`, and
`scripts/merkleokf/` are independent uv projects, each with its own
`pyproject.toml` and (where needed) `uv.lock`, and nothing shared between them.
`pdf2md/` exists only to give `marker` a pinned venv; `web2md/` owns the
scraper's dependencies and its pytest/ruff config; the four `scripts/` projects
are installable stdlib-only CLIs with their own ruff and pytest. So the heavy
dependencies (marker-pdf, torch) cannot reach the lint or test jobs at all,
rather than being excluded by flag.

`ruff` and `yamllint` belong to neither project; `make lint` runs them
ephemerally at a pinned version with `uv tool run`, and checks each tracked
subproject in turn — a new subproject carries its own `[tool.ruff]` and needs no
Makefile change.

### Helper CLIs

Four CLIs survey the wiki. The sandbox exposes the same commands to the agent,
and `make install-clis` puts them on your own PATH. All four take `-L`/`--level`
as a depth cap.

| Command | What it prints |
| --- | --- |
| `inspectmd <file>` | a Markdown heading map: line ranges, word counts, kebab-case slugs |
| `inspectokf [path]` | the wiki directory tree, via `tree` (default `okf/`) |
| `sizeokf [path]` | Markdown word counts per file and folder, excluding frontmatter |
| `merkleokf [path]` | a Merkle hash tree, one hash per file and per directory |

`sizeokf` and `merkleokf` also take `--nolog`, which ignores `okf/log.md`.
`merkleokf` hashes raw bytes, deliberately the opposite of `sizeokf`, which
strips frontmatter: `merkleokf` answers "did this change", `sizeokf` answers
"how much prose is here", and they share no code.

## How the agent knows what to do

The instructions come in two parts. `runtime/agent/AGENTS.md` holds
what every task must respect: the OKF conventions, the directories the agent may
write to, and the rule that `SPEC.md` outranks both. Each task's procedure lives
in a skill of its own. Task skill today: `compile-okf`. Tool skills:
`inspect-md`, `inspect-okf`, `size-okf`, `merkle-okf` — a tool gets a skill, not
an `AGENTS.md` section. The sandbox also installs the `context7-docs` skill via
`@upstash/context7-pi` for library docs lookups. A new task gets a new directory
rather than more rules in `AGENTS.md`.

A skill is a directory holding a `SKILL.md` — YAML frontmatter with a `name` and
`description`, then the instructions, plus any scripts it needs. Pi picks skills
up from `~/.pi/agent/skills/`.

The config is mounted read-only at `/config` and copied into Pi's ephemeral
home on each VM boot. Model and provider settings live in
`runtime/agent/settings.json` and `runtime/agent/models.json`.

`runtime/test/` holds pure unit tests, a provisioned-toolchain check, and the
adversarial filesystem bypass matrix.

## Linting the wiki

[okf-lint](https://github.com/thisismydesign/okf-lint) checks the wiki against
the spec. Rules live in `okf/.okflintrc.json`, tracked and un-ignored by name so
it survives the `okf/*` rule in `.gitignore`.

The sandbox installs okf-lint at a pinned version, and the `compile-okf` skill
wraps it in its own `scripts/lint-okf.sh`. The agent lints its own output and fixes what
the linter reports before it finishes. On the host, `make lint-okf` runs the
same tool through `pnpm dlx`. It sits outside `make lint` and outside CI because
`okf/` is generated.

## Releasing

Pushing a `vX.Y.Z` tag triggers `.github/workflows/release.yml`, which creates
a GitHub Release whose notes are the matching section of `CHANGELOG.md`. There
are no packages or images to publish — the project is consumed by cloning and
running `make`.

1. Move `[Unreleased]` entries into a dated `## [X.Y.Z] - YYYY-MM-DD` section
   with a real body (not just a heading).
2. Set `VERSION` to `X.Y.Z`.
3. Land that commit on `main`. `make lint` fails if `VERSION` and the latest
   changelog release heading disagree.
4. Sanity-check the notes: `./scripts/release-notes.sh X.Y.Z`
5. Tag and push: `git tag vX.Y.Z && git push origin vX.Y.Z`

The workflow re-runs `make lint` and refuses a tag whose version disagrees with
`VERSION` (`scripts/check-release-tag.sh`). An empty changelog section fails
before the Release is created. Re-running is safe: if the Release already
exists, the job skips it rather than modifying it.

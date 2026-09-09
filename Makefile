# md2okf-gondolin — developer task runner.
#
# Pi runs in a Gondolin micro-VM driven by the TypeScript project under
# runtime/, which also owns the agent config (see AGENTS.md).
#
# Tool overrides (defaults suit local dev; CI overrides only MARKDOWNLINT):
#   MARKDOWNLINT  markdownlint-cli2 launcher. Local: the brew-installed command.
#                 CI: `npx --yes markdownlint-cli2` (no global install needed).
#   RUFF          ruff launcher. Ephemeral and pinned, so it belongs to no
#                 project.
#   PYTEST        pytest launcher. Default: web2md. Prefer the per-project
#                 targets (`test-web2md`, `test-clis`) which pass `-c`.
#   YAMLLINT      yamllint launcher. Repo-wide (YAML lives outside the Python
#                 projects), so ephemeral and pinned like ruff.
#   CSPELL        cspell launcher. Local and CI: `npx --yes cspell`.
MARKDOWNLINT ?= markdownlint-cli2
RUFF ?= uv tool run ruff@0.16.2
PYTEST ?= uv run --project web2md --group test pytest -c web2md/pyproject.toml
YAMLLINT ?= uv tool run yamllint@1.38.0
CSPELL ?= npx --yes cspell

.DEFAULT_GOAL := lint
.PHONY: lint lint-okf validate test test-web2md test-clis install-clis \
	install-runtime test-sandbox test-bypass runtime-image wiki shell agent \
	scrape require-host

# VM targets need HVF and therefore the macOS host.
require-host:
	@if [ "$$(uname -s)" != Darwin ]; then \
		echo "This target needs the macOS host (Gondolin needs HVF). Run it there." >&2; \
		exit 1; \
	fi

# Lint tracked Markdown, JSON, YAML, and shell, spell-check owned Markdown, lint
# Python, and check that VERSION and CHANGELOG.md's latest release agree.
# Driving every check off `git ls-files` means a newly added file is covered the
# moment it is tracked, rather than when someone remembers to extend a
# hand-maintained list here.
#
# Exclusions, all deliberate:
#   md/                generated Marker book output — large, and linted manually
#                      (see README), not here.
#   .claude/, .cursor/ agent-tool config rather than project documentation. The
#                      skill files are written to their tools' own conventions
#                      (front matter, no H1), which markdownlint reads as errors.
#   SPEC.md            upstream OKF spec, not project prose.
#   CLAUDE.md          one-line `@AGENTS.md` pointer, not a document.
# cspell runs on owned Markdown only (same exclusions as markdownlint).
#
# ruff runs once per tracked subproject rather than once over the tree, because
# each project carries its own [tool.ruff]. Deriving the list from tracked
# pyproject.toml files means a new subproject is linted the moment it is added.
lint:
	git ls-files -z -- '*.md' ':!md/' ':!.claude/' ':!.cursor/' ':!CLAUDE.md' ':!SPEC.md' \
		| xargs -0 $(MARKDOWNLINT)
	git ls-files -z -- '*.json' | xargs -0 -n1 jq empty
	git ls-files -z -- '*.yaml' '*.yml' | xargs -0 $(YAMLLINT)
	git ls-files -z -- '*.sh' | xargs -0 shellcheck
	git ls-files -z -- '*.md' ':!md/' ':!.claude/' ':!.cursor/' ':!CLAUDE.md' ':!SPEC.md' \
		| xargs -0 $(CSPELL) --no-progress
	git ls-files -- '*/pyproject.toml' | xargs -n1 dirname | xargs $(RUFF) check
	if [ ! -f VERSION ]; then \
		echo "lint: VERSION is missing" >&2; exit 1; \
	fi; \
	repo_version="$$(grep -m1 -oE '[0-9]+\.[0-9]+\.[0-9]+' VERSION)"; \
	if [ -z "$$repo_version" ]; then \
		echo "lint: could not find X.Y.Z in VERSION" >&2; exit 1; \
	fi; \
	changelog_version="$$(grep -m1 -oE '^## \[[0-9]+\.[0-9]+\.[0-9]+\]' CHANGELOG.md | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')"; \
	if [ -z "$$changelog_version" ]; then \
		echo "lint: could not find a ## [X.Y.Z] release heading in CHANGELOG.md" >&2; exit 1; \
	elif [ "$$repo_version" != "$$changelog_version" ]; then \
		echo "lint: VERSION is $$repo_version but CHANGELOG.md's latest release is $$changelog_version" >&2; \
		exit 1; \
	fi
	@echo "All lint checks passed."

# Lint the generated okf/ wiki with okf-lint
# (https://github.com/thisismydesign/okf-lint). Run via `pnpm dlx`, so nothing
# needs installing on the host. Rules live in okf/.okflintrc.json. Kept out of
# `make lint` because okf/ is generated output and gitignored — this is a
# host-side developer command, not part of the source-tree lint or CI.
lint-okf:
	pnpm dlx @thisismydesign/okf-lint ./okf

# Validate the host-side runtime without starting a VM.
validate:
	node runtime/node_modules/typescript/bin/tsc --noEmit -p runtime/tsconfig.json
	node --test runtime/test/guard.test.ts runtime/test/net.test.ts

# Host pytest suites plus the VM toolchain check. The VM half needs macOS HVF;
# CI runs each portable job on its own and does not invoke this target.
test: test-web2md test-clis test-sandbox

# Unit-test the web2md scraper (web2md/tests/). Offline: HTTP is mocked with
# httpx.MockTransport, so no test opens a socket. Config is in
# web2md/pyproject.toml, which also puts web2md/src/ on the import path.
test-web2md:
	$(PYTEST) web2md/tests

# Unit-test the four host CLIs (inspectmd, inspectokf, sizeokf, merkleokf).
# Each has its own project and lockfile — nothing shared. Offline; stdlib-only
# subjects under test (inspectokf mocks tree). Explicit suite paths keep
# collection inside each project when pytest is launched from the repo root.
test-clis:
	uv run --project scripts/inspectmd --group test pytest -c scripts/inspectmd/pyproject.toml \
		scripts/inspectmd/tests
	uv run --project scripts/inspectokf --group test pytest -c scripts/inspectokf/pyproject.toml \
		scripts/inspectokf/tests
	uv run --project scripts/sizeokf --group test pytest -c scripts/sizeokf/pyproject.toml \
		scripts/sizeokf/tests
	uv run --project scripts/merkleokf --group test pytest -c scripts/merkleokf/pyproject.toml \
		scripts/merkleokf/tests

# Install the four host CLIs onto PATH via uv tool.
install-clis:
	uv tool install --force ./scripts/inspectmd
	uv tool install --force ./scripts/inspectokf
	uv tool install --force ./scripts/sizeokf
	uv tool install --force ./scripts/merkleokf

# Install the pinned host-side Gondolin runtime dependencies.
install-runtime:
	npm --prefix runtime ci

# Build and verify the provisioned Gondolin checkpoint on the macOS host.
runtime-image: require-host
	node runtime/image/provision.ts

test-sandbox: require-host
	node --test runtime/test/toolchain.test.ts

test-bypass: require-host
	node --test runtime/test/bypass.test.ts

# Compile the OKF wiki with Pi in a fresh Gondolin VM per source document.
wiki: require-host
	node runtime/src/compile-okf.ts

shell: require-host
	node runtime/src/shell.ts shell

agent: require-host
	node runtime/src/shell.ts agent

# Fetch the website into md/ as one file.
scrape:
	uv run --project web2md python web2md/src/web2md.py

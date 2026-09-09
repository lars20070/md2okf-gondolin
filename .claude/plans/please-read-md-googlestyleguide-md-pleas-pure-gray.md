# Abridged Google Developer Documentation Style Guide

## Context

`md/GoogleStyleGuide.md` is a 16,514-line scrape of the full Google Developer
Documentation Style Guide (611 KB), produced by `make scrape` (`web2md/src/web2md.py`).
It is a reference document, not a readable one: 4,134 lines are the 598-entry word
list and 2,218 lines are a dated "What's new" changelog.

We want `md/GoogleStyleGuide-abridged.md` — roughly 2,000 lines carrying the
guide's actual guidance, with a real heading hierarchy (parts → topics →
subsections) rather than a flat rule dump. It should be readable end to end in one
sitting and still usable as a lookup reference.

Confirmed with the user:

- **Word list**: curated to ~250 high-value entries, not all 598.
- **Location**: `md/` as asked, accepting the `make wiki` consequence (below).
- **Cross-references**: link the sections that survive, plain italic text otherwise.

## Consequence to be aware of

`runtime/src/compile-okf.ts:139-143,235-237` runs one Pi VM per file in `md/`,
sequentially, into the same `okf/`. Adding this file means `make wiki` does **two**
compile runs (the abridged one sorts first) writing overlapping pages into one wiki.
The compile skill's idempotency rule
(`runtime/agent/skills/compile-okf/SKILL.md:35-46`) means the second run should
update pages in place rather than duplicate them, but the cost doubles. To compile
only one document, pass a subfolder: `node runtime/src/compile-okf.ts md/<folder>`.

No lint applies: `Makefile:54-60` excludes `md/` from markdownlint and cspell,
`.cspell.json:5` ignores `md/**`, and `.coderabbit.yaml:35` skips it. Nothing
validates the new file — no safety net, but nothing to satisfy either.

## Output shape

```
---
type: Website
title: "Google. Google Developer Documentation Style Guide (abridged)."
description: "Abridged style guide for Google developer documentation"
resource: https://developers.google.com/style
tags: [guide, Google, abridged]
timestamp: <UTC now, %Y-%m-%dT%H:%M:%SZ>
---

# Google Developer Documentation Style Guide (abridged)

*Abridged from md/GoogleStyleGuide.md, a snapshot of https://developers.google.com/style
generated 2026-08-01. Rules are condensed; examples are cut to one representative
pair. For the full text of any topic, follow its Source link.*

## Table of contents          <- links to the ## parts and ### topics that survive

## Introduction               <- 10 parts, mirroring the source's structure
### About this guide
*Source: <https://developers.google.com/style/...>*
Rule prose (2-6 lines).
#### Subsection               <- kept where the topic has genuinely distinct rules
- Recommended: ... / Not recommended: ...
```

Matches the frontmatter field set of `md/GoogleStyleGuide.md:1-7` (per
`SPEC.md:131-171`, only `type` is required) and keeps the source's part/topic
heading levels so the two files sit at the same depth.

## Compression rules

Applied uniformly, this is what gets the 16.5k lines to ~2k:

1. **Keep** every normative rule, in the guide's own wording where it is already
   tight; rewrite only to shorten.
2. **Cut** the `What's new` changelog entirely (2,218 lines) — replace with one
   line pointing at <https://developers.google.com/style/whats-new>.
3. **Examples**: at most one `Recommended:` / `Not recommended:` pair per rule, and
   only where the rule is hard to grasp without one. Collapse each pair to one or
   two lines. Drop long HTML/Markdown side-by-side samples; keep the rule that the
   sample illustrates.
4. **Tables**: keep only where the table *is* the content (text-formatting summary,
   abbreviation lists, units of measure, date/time formats). Otherwise flatten to
   bullets.
5. **Drop** the `<a id="..."></a>` scrape anchors; rely on Markdown heading anchors.
6. **Cross-references**: keep a Markdown link when the target heading survives in
   this file (`[Voice and tone](#voice-and-tone)`); otherwise plain italic text
   (*see Voice and tone in the full guide*). Keep all external `https://` links,
   including each topic's `*Source:*` line.
7. **Word list**: keep ~250 entries as one-liners under the source's 26 letter
   headings — all *Don't use* and inclusive-language terms, all genuine
   confusions (*e.g.* vs *for example*, *since* vs *because*, *setup* vs *set up*),
   drop entries whose guidance is obvious or Google-product-specific trivia. Note
   at the top of the section that it is curated and link the full word list.

## Line budget (~2,070 lines)

| Part | Source lines | Target |
| --- | --- | --- |
| Frontmatter, title, preamble, TOC | 115 | 110 |
| Introduction (About, Highlights, Philosophy; drop What's new) | 2,438 | 85 |
| Key resources (Word list 270, Product names 40, Text formatting 60) | 4,380 | 370 |
| General principles (10 topics) | 1,314 | 230 |
| Language and grammar (14 topics) | 1,079 | 230 |
| Punctuation (10 topics) | 1,149 | 200 |
| Formatting and organization (17 topics) | 2,761 | 370 |
| Linking (2 topics) | 438 | 80 |
| Computer interfaces (6 topics) | 2,159 | 280 |
| HTML and CSS (3 topics) | 121 | 40 |
| Names and naming (3 topics) | 426 | 75 |

Within a part, allocate proportionally to source size, but floor each topic at ~6
lines so no topic disappears — all 65 topics of the source keep a heading.

## Execution

Sequential, one part at a time, to keep voice and density consistent:

1. Read the source range for a part (`sed -n` / `Read` with offset+limit; ranges are
   the heading line numbers already mapped — e.g. General principles is 6938-8265,
   Punctuation 9349-10501, Computer interfaces 13797-15959).
2. Write that part to a numbered chunk file in the scratchpad
   (`/tmp/.../scratchpad/part-NN.md`), checking its line count against the budget.
3. Repeat for all 11 chunks (00 = frontmatter/TOC, written last so the TOC matches
   what actually survived).
4. `cat` the chunks in order into `md/GoogleStyleGuide-abridged.md`.

Beware: the source contains `#`-prefixed lines *inside fenced code blocks*
(e.g. `md/GoogleStyleGuide.md:11259`, `13735-13797`) that look like headings in a
grep but are examples. Do not promote them into the abridged structure.

## Verification

- `wc -l md/GoogleStyleGuide-abridged.md` — expect 1,900–2,200.
- `uv tool run --from ./scripts/inspectmd inspectmd md/GoogleStyleGuide-abridged.md`
  — confirms the heading map: 10 `##` parts, ~65 `###` topics, nested `####`
  subsections, no orphan levels and no accidental H1s.
- `grep -n '](#' md/GoogleStyleGuide-abridged.md` cross-checked against the file's
  own headings — every internal link must resolve to a heading that exists.
- `grep -c '<a id=' md/GoogleStyleGuide-abridged.md` — expect 0.
- Read the rendered file top to bottom once for tone and for any rule that lost its
  meaning in compression.
- Optional (host, costs a compile): `make wiki` now runs twice; if that is
  unwanted, compile a subfolder instead.

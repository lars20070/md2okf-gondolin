---
type: Website
title: "Google. Google Developer Documentation Style Guide (abridged)."
description: "Abridged style guide for Google developer documentation"
resource: https://developers.google.com/style
tags: [guide, Google, abridged]
timestamp: 2026-09-09T10:54:07Z
---

# Google Developer Documentation Style Guide (abridged)

*Abridged from `md/GoogleStyleGuide.md`, a snapshot of
[https://developers.google.com/style](https://developers.google.com/style) generated
2026-08-01. Every topic of the full guide is kept; rules are condensed, examples are cut to
one representative pair, and the word list is curated. Each topic links to its source page
for the full text.*

## Table of contents

### Introduction

- [About this guide](#about-this-guide)
- [Highlights](#highlights)
- [What's new](#whats-new)
- [Philosophy of this guide](#philosophy-of-this-guide)

### Key resources

- [Word list](#word-list)
- [Product names](#product-names)
- [Text-formatting summary](#text-formatting-summary)

### General principles

- [Accessibility](#accessibility)
- [Excessive claims](#excessive-claims)
- [Future features](#future-features)
- [Global audience](#global-audience)
- [Inclusive language](#inclusive-language)
- [Jargon](#jargon)
- [Prescriptive documentation](#prescriptive-documentation)
- [Third-party content](#third-party-content)
- [Timeless documentation](#timeless-documentation)
- [Voice and tone](#voice-and-tone)

### Language and grammar

- [Abbreviations](#abbreviations)
- [Active voice](#active-voice)
- [Anthropomorphism](#anthropomorphism)
- [Articles (a, an, the)](#articles-a-an-the)
- [Capitalization](#capitalization)
- [Contractions](#contractions)
- [Pluralization](#pluralization)
- [Possessives](#possessives)
- [Prepositions](#prepositions)
- [Present tense](#present-tense)
- [Pronouns](#pronouns)
- [Second person](#second-person)
- [Sentence structure](#sentence-structure)
- [Verbs in reference documents](#verbs-in-reference-documents)

### Punctuation

- [Colons](#colons)
- [Commas](#commas)
- [Dashes](#dashes)
- [Ellipses](#ellipses)
- [Hyphens](#hyphens)
- [Parentheses](#parentheses)
- [Periods and end punctuation](#periods-and-end-punctuation)
- [Quotation marks](#quotation-marks)
- [Semicolons](#semicolons)
- [Slashes](#slashes)

### Formatting and organization

- [Dates and times](#dates-and-times)
- [Examples](#examples)
- [Figures and other images](#figures-and-other-images)
- [Footnotes](#footnotes)
- [Headings and titles](#headings-and-titles)
- [Italics with terms](#italics-with-terms)
- [Lists](#lists)
- [Mathematical notation](#mathematical-notation)
- [Notes and other notices](#notes-and-other-notices)
- [Numbers](#numbers)
- [Paragraphs](#paragraphs)
- [Phone numbers](#phone-numbers)
- [Procedures](#procedures)
- [Tables](#tables)
- [Units of measurement](#units-of-measurement)

### Linking

- [Cross-references and linking](#cross-references-and-linking)
- [Headings as link targets](#headings-as-link-targets)

### Computer interfaces

- [API reference code comments](#api-reference-code-comments)
- [Code in text](#code-in-text)
- [Code samples](#code-samples)
- [Command-line syntax](#command-line-syntax)
- [Placeholder formatting](#placeholder-formatting)
- [UI elements and interaction](#ui-elements-and-interaction)

### HTML and CSS

- [HTML and semantic tagging](#html-and-semantic-tagging)
- [HTML formatting](#html-formatting)
- [Markdown versus HTML](#markdown-versus-html)

### Names and naming

- [Example domains and names](#example-domains-and-names)
- [Filenames](#filenames)
- [Trademarks](#trademarks)

---
## Introduction

### About this guide

*Source: <https://developers.google.com/style>*

This guide provides editorial guidelines for writing clear and consistent technical
documentation for software developers and other technical practitioners. If you're new to
it, start with [Highlights](#highlights), [Voice and tone](#voice-and-tone), and
[Text-formatting summary](#text-formatting-summary); otherwise use it as a reference.

#### Reference hierarchy

Use these references, in this order:

1. **Project-specific style** — guidance specific to your project or product, including
   necessary exceptions to this guide.
2. **This style guide**.
3. **Third-party references** — [Merriam-Webster](https://www.merriam-webster.com/) for
   spelling, [*The Chicago Manual of Style*](https://www.chicagomanualofstyle.org/home.html)
   (17th ed.) for nontechnical style, and the
   [Microsoft Writing Style Guide](https://docs.microsoft.com/style-guide/welcome/) for
   technical style — but check whether Microsoft's guidance is Microsoft-specific.

At any stage it helps to look to established usage: search your organization's
documentation, or check a corpus such as [Google Ngram Viewer](https://books.google.com/ngrams/).

Other style guides worth consulting, but not part of Google style:
the [Apple Style Guide](https://help.apple.com/applestyleguide/) and the
[Red Hat supplementary style guide](https://redhat-documentation.github.io/supplementary-style-guide/).

#### Break the rules

> *Break any of these rules sooner than say anything outright barbarous.*
> —George Orwell, "Politics and the English Language"

This guide contains guidelines, not rules. Depart from it when doing so improves your
content. Some guidance is Android-specific or Google Cloud-specific; the full guide marks
those entries with product logos.

### Highlights

*Source: <https://developers.google.com/style/highlights>*

An overview of the guide's most important points.

#### Tone and content

- [Be conversational and friendly](#voice-and-tone) without being frivolous.
- [Don't pre-announce anything](#future-features) in documentation.
- Use descriptive link text (see [Cross-references and linking](#cross-references-and-linking)).
- [Write accessibly](#accessibility).
- [Write for a global audience](#global-audience).

#### Language and grammar

- [Use second person](#second-person): "you" rather than "we."
- [Use active voice](#active-voice): make clear who's performing the action.
- Use standard American spelling and punctuation.
- [Put conditions before instructions](#sentence-structure), not after.
- For usage and spelling of specific words, see the [Word list](#word-list).

#### Formatting, punctuation, and organization

- [Use sentence case](#capitalization) for document titles and section headings.
- [Use numbered lists](#lists) for sequences, bulleted lists for most other lists, and
  description lists for pairs of related pieces of data.
- Use serial commas (see [Commas](#commas)).
- [Put code-related text in code font](#code-in-text).
- [Put UI elements in bold](#ui-elements-and-interaction).
- [Use unambiguous date formatting](#dates-and-times).

#### Images

- Provide alt text and, when practical, high-resolution or vector images. See
  [Figures and other images](#figures-and-other-images).

### What's new

*Source: <https://developers.google.com/style/whats-new>*

The full guide keeps a dated changelog of significant style changes. It is omitted here;
see <https://developers.google.com/style/whats-new> for the current list.

### Philosophy of this guide

*Source: <https://developers.google.com/style/philosophy>*

This guide codifies Google's house style and records its style decisions. It doesn't claim
to be objectively correct, and it isn't intended to provide an industry standard, compete
with or replace another style guide you already follow, teach basic writing, or give legal
advice.

The guide generally doesn't explain the reasoning behind its guidelines: many decisions are
driven by accessibility, localization, globalization, and ease of understanding, and
repeating those reasons everywhere would clutter the pages; often a guideline is one good
option among several, chosen for consistency. Readers usually want a brief answer to a
specific question rather than a detailed explanation.

---
## Key resources

### Word list

*Source: <https://developers.google.com/style/word-list>*

> [!NOTE]
> **Note**: This section includes references to potentially disrespectful or offensive
> terms. They are listed to provide usage guidance and alternatives.

This is a curated selection of the full word list's 598 entries — the terms with guidance
that is easy to get wrong. For anything not listed here, see the full list at
<https://developers.google.com/style/word-list>, then
[Merriam-Webster](https://www.merriam-webster.com/) (first spelling listed wins).

Two strengths of prohibition appear below:

- **Avoid** — don't use when you can help it; the term is ambiguous or obscure, and a
  more precise alternative is suggested. Use it if you need it.
- **Don't use** — don't use at all; the term is particularly ambiguous, or it carries an
  offensive or non-inclusive association. If it appears in code, replace or write around
  it (see [Inclusive language](#inclusive-language)).

Terminology decisions depend on your product area, audience, and prevailing convention;
see also [Jargon](#jargon), [Global audience](#global-audience), [Hyphens](#hyphens), and
[Capitalization](#capitalization).

#### Numbers and symbols

- **+** — OK with numbers in text (*300+ attributes*), except in formal contexts.
- **& (ampersand)** — Avoid; use *and* in headings, text, navigation, and tables of
  contents. OK when referencing a UI element that uses *&*, in space-constrained table
  headings and diagram labels, and in code.

#### A

- **a, an** — Choose by the *sound* of the next word, not its letter. See
  [Articles (a, an, the)](#articles-a-an-the).
- **abnormal** — Avoid for people. OK for a condition of a computer system.
- **abort** — Avoid; use *stop*, *exit*, *cancel*, or *end*. (In Linux it names a signal.)
- **about versus on** — Use *about* in cross-references: *For more information about
  indexes*, not *on indexes*.
- **above** — Avoid. For versions use *later*; for document position use *earlier* or
  *preceding*; for UI position, rewrite to avoid directional language.
- **access (verb)** — Avoid; use *see*, *edit*, *find*, *use*, or *view*.
- **account name** — Don't use; use *username*.
- **actionable** — Avoid unless it is the clearest phrasing; try *that you can act on*.
- **ad hoc** — OK in database and analytics contexts meaning "free-form" or "user-written."
- **address bar** — Use for a browser's URL bar. Not *omnibox*.
- **admin** — Don't use; write *administrator*, unless it's a UI label. (In Android
  documentation, *admin* is the preferred term.)
- **agnostic** — Don't use; use a precise term like *platform-independent*.
- **AI** — OK without expanding to *artificial intelligence*.
- **aka** — Don't use; write *also known as*, or use parentheses or *or*.
- **allowlist / denylist** — OK as nouns; don't use as verbs — rewrite instead. See
  *blacklist*.
- **allows you to** — Don't use; use *lets you*.
- **alpha, beta** — Lowercase except as part of a product name.
- **America, American** — Avoid for the United States; use *the US*.
- **AM, PM** — All caps, no periods, space before: *9:00 AM*.
- **and/or** — Avoid unless space is limited, as in a table. See [Slashes](#slashes).
- **and so on** — Avoid where possible. See *etc.*
- **anti-pattern** — Avoid, particularly as a standalone heading; use a more specific term.
- **API** — Use for a web API or a language-specific API, not for a method or class.
- **app** — Prefer to *application* for end-user programs.
- **appendix** — Plural *appendixes*, not *appendices*.
- **as** — If you mean *because*, write *because*; *as* is ambiguous about time.
- **as of this writing** — Avoid; it is implied and can disclose strategy prematurely.
- **authentication and authorization** — *Authenticated* refers to users; *authorized*
  refers to requests. Don't use *authN* or *authZ*.
- **-aware** — Avoid as a compound modifier (*healthcare-aware*), except in product names.

#### B

- **backend, frontend** — One word; not *back-end* or *back end*.
- **bare metal** — Lowercase; hyphenate as a modifier: *bare-metal server*.
- **below** — Avoid. For versions use *earlier*; for document position use *later* or
  *following*.
- **best effort** — Avoid; use more specific wording.
- **between versus among** — *Between* is fine for more than two things when the
  relationship is one-to-one; they aren't interchangeable.
- **big-endian, little-endian** — Hyphenate; lowercase.
- **black-box, gray-box, white-box** — Avoid for testing and monitoring; use precise terms
  such as *opaque-box* and *clear-box testing*.
- **Black Friday, Cyber Monday, the holidays** — Avoid unless referring to a specific US
  event; use *peak scale event* or name the months.
- **blackhat, blackhole, blast radius** — Don't use; describe the actual thing (*illegal*,
  *dropped without notification*, *affected area*).
- **blacklist, whitelist, graylist** — Don't use, in any spelling or part of speech.
  Instead use precise terms for your domain, such as *deny list*, *allow list*, *blocked*,
  or *excluded*.
- **blind** — Avoid figurative uses (*blind to*, *blind eye to*); use *ignore*, *unaware
  of*, *disregard*.
- **boolean** — Use the language's exact spelling and capitalization in code font when
  referring to the data type.
- **break-glass** — Don't use; say *emergency access* or the specific procedure.
- **brown bag, dojo, guru, ninja, sherpa** — Don't use; say *learning session*,
  *training*, *expert*.
- **build cop, build sheriff** — Don't use; use *build monitor*.
- **button** — A link isn't a button; don't call one the other.

#### C

- **can** — Use for permission, ability, and optional actions.
- **canary** — Don't use as a verb; avoid *canary testing* as jargon, or define it.
- **cell phone, smartphone** — Don't use; use *mobile phone*, *phone*, or *mobile device*.
  Likewise *mobile data* and *mobile network*, not *cellular*.
- **chapter** — Don't use outside actual books; refer to documents, pages, or sections.
- **check** — Don't use for marking a checkbox; use *select*. Its opposite is *clear*, not
  *uncheck*, *deselect*, or *unselect*.
- **checkbox** — One word.
- **chubby, fat** — Don't use; describe what you mean (*unused*, *high-capacity*).
- **CLI** — Don't use generically; name the specific interface.
- **click** — Use for mouse targets. Don't use *click on*, and don't use *hit*. Don't use
  *click here* as link text.
- **client** — In API documentation, short for *client app*. Not an abbreviation for
  *client library*.
- **compliant, compliance** — Use with caution; it is a strong claim.
- **comprise** — Don't use; use *consist of*, *contain*, or *include*.
- **config** — Avoid outside code; write *configuration* or *configuring*.
- **console** — Don't use in isolation; name the specific console.
- **Control+S and other keyboard commands** — Write `Control`+CHARACTER; not *Ctl-S* or
  *Cmd-S*.
- **Copy and paste** — Avoid; say what to enter, not how.
- **could, would** — Avoid; use *can*.
- **crazy, insane, lame, lunatic, mad** — Don't use; use *complicated*, *complex*,
  *baffling*, *strange*, *unexpected*, and only for inanimate objects.
- **Create a new ...** — Avoid; write *Create a ...*
- **cripple, retarded** — Don't use; describe the effect (*slowed the server down*).
- **curated roles** — Don't use; use *predefined roles*.
- **currently, presently, at present, now** — Avoid; the present is implied.
- **curl** — Not *cURL*.

#### D

- **dashboard** — Lowercase unless part of an official name; don't use for a console.
- **data** — Singular and a mass noun: *the data is*, *less data*.
- **data center** — Two words. Also *data source*, *data type*, *table name*, *file
  system*, *name server*, *web server*, *style sheet* (or *stylesheet*, consistently).
- **dead-letter queue** — Define on first use.
- **deficient, deformed** — Don't use for people. OK for a system or object.
- **demilitarized zone (DMZ)** — Don't use; use *perimeter network*.
- **deprecate** — To recommend against an item's use; not a synonym for *delete* or
  *remove*.
- **desire, desired** — Don't use; use *want* or *need*.
- **disable** — Don't use for something broken. For UI state, use the element's own label
  and action; for unavailability, use *unavailable* (never *grayed-out*).
- **disclosure triangle** — Don't use; use *expander arrow*.
- **display** — Transitive only; it needs an object.
- **documentation** — For text on a page, write *this document*, not *this article*.
- **does not yet, eventually, soon, in the future** — Avoid in timeless documentation.
- **drag** — Not *click and drag* or *drag and drop*; *drag-and-drop* is OK as an adjective.
- **drop-down** — Usually omit; just write *list* or *menu*.
- **dumb down** — Don't use; use *simplify* or *remove technical jargon*.
- **dummy variable** — Don't use for placeholders; use *placeholder*.

#### E

- **each** — Every individual item taken individually; not a synonym for *all*.
- **earlier, later** — Use for version ranges: *version 2.2 or later*, not *or higher*,
  *above*, *below*, *lower*, or *under*.
- **easy, easily, simple, simply, quick, quickly** — Avoid; what's easy for you may not be
  easy for the reader. Usually the sentence means the same without the word.
- **e.g., i.e.** — Don't use; write *for example*, *such as*, or *that is*.
- **either** — Use parallel syntax on both sides.
- **email** — One word, lowercase. Not a verb; write *send email*.
- **emoji** — Same form singular and plural.
- **enter** — Use for entering text; prefer it to *type*. Say explicitly if `Enter`
  shouldn't be pressed.
- **etc.** — Avoid; if you must, include the period.
- **execute** — Prefer *run* when the meaning is the same.
- **exploit** — Only in the negative sense, as in *exploiting a vulnerability*.
- **extract** — Use instead of *unarchive*, *uncompress*, *untar*, or *unzip*.

#### F

- **fail over (verb), failover (noun, adjective)** — Two words as a verb.
- **female adapter, male adapter** — Don't use; use *socket* and *plug*.
- **fill in, fill out** — *Fill in* individual fields; *fill out* an entire form.
- **final solution** — Don't use; use *solution*, *optimal*, or *last solution*.
- **first class, first-class citizen** — Don't use; use *higher-order*, *anonymous*, or
  another accurate term.
- **following** — A noun after it isn't required, but it can aid clarity and accessibility.
- **foo, bar, baz** — Avoid; use meaningful placeholder names.
- **for example** — Follow with a comma. Don't use *for instance* (it collides with the
  noun *instance*).
- **functionality** — Use with caution; often *features* or *capabilities* is meant.

#### G

- **gender-neutral he, him, his, she, her** — Don't use a gendered pronoun except for a
  specific individual of known gender; use singular *they*.
- **generative AI** — Spell out, sentence case. Not *gen AI*.
- **ghetto, gimp, gypsy** — Don't use; use precise terms (*clumsy*, *workaround*; *Romani*,
  *Roma*, or *Traveller*).
- **Google, Googling** — Don't use as a verb; write *search with Google*.
- **Google Cloud** — Not *GCP*, *Cloud Platform*, or *Cloud*.
- **grandfathered, grandfather clause** — Don't use; use *legacy* or *exempt*.
- **guys, you guys** — Don't use; use *everyone* or *folks*.

#### H

- **hamburger menu, kebab menu** — Don't use; use the icon's `aria-label`, such as
  **Menu** or **More**.
- **hands off, hands on, housekeeping, tribal knowledge, war room** — Don't use figurative
  phrases; describe the activity (*automated*, *customizable*, *maintenance*).
- **hang, hung** — Don't use; use *stop responding* or *not responding*.
- **hardcode (verb), hardcoded (adjective)** — No hyphen.
- **health check, healthy** — Use with caution; only when the interface uses that term.
- **high availability (noun), high-availability (adjective)** — Same pattern for *load
  balancing*, *third party*, *time zone*, and *wake lock*.
- **hit** — Don't use for *click*, *press*, or *type*.
- **hold the pointer over** — Use instead of *hover*.
- **hot, warm, cold (failover, standby, spare)** — Jargon; define on first use.
- **HTTPS** — Not *HTTPs*.

#### I

- **ID** — Not *Id* or *id*, except in string literals or enums.
- **if** — Include *then* in *if...then* statements in technical documentation. For *if*
  versus *whether*, see *whether*.
- **image** — Ambiguous on its own; add context (*disk image*, *container image*).
- **impact** — Noun only; as a verb use *affect*.
- **index** — Plural *indexes*; *matrixes*, not *matrices*, unless the domain demands it.
- **ingest** — Only for movement that involves significant processing; otherwise *import*,
  *load*, or *copy*.
- **in order to** — Avoid; use *to*, unless it clarifies meaning.
- **inline** — One word as an adjective.
- **interface** — Noun only; as a verb use *interact*, *talk*, or *communicate*.
- **internet, web** — Lowercase. Don't use *World Wide Web*.
- **IoT, IPsec, OAuth 2.0, NoSQL, Unicode, UTF-8** — Use exactly these capitalizations.

#### J and K

- **jank, janky** — Only for a graphics glitch caused by data loss or refresh rate.
- **just** — Avoid; it's usually a filler word.
- **k8s** — Don't use; write *Kubernetes*.
- **kebab case** — Don't use; use *dash-case*.
- **key** — Don't use as an adjective meaning *crucial*; as a noun, say which kind of key.
- **key-value pair** — Not *key/value pair*. Distinct from *key pair*.
- **kill** — Avoid; use *stop*, *exit*, *cancel*, or *end*.

#### L

- **latest, new, newer, old, older** — Avoid in timeless documentation; give a version
  number as a reference point.
- **learnings** — Don't use; use *knowledge* or *what you learned*.
- **left-nav, right-nav** — Don't use directional language; use *navigation menu*.
- **legacy** — Prefer a more precise term; if used, define it.
- **let's** — Don't use.
- **leverage** — Avoid when you mean *use*.
- **like** — OK both for comparison and for introducing examples.
- **login (noun), log in (verb)** — Prefer *sign-in* and *sign in*. Write *sign in to*,
  never *sign into*; *sign-on* only inside *single sign-on*.
- **long-running operation (LRO)** — Hyphenate.

#### M

- **man hours, manmade, manned, manpower, man-in-the-middle** — Don't use gendered terms;
  use *person hours*, *artificial*, *staffed*, *workforce*, *on-path attacker*.
- **Markdown** — Always capitalized.
- **master, slave** — Don't use. Replace *master* with an accurate term such as *primary*,
  *main*, or *original*, and *slave* with *worker* or *replica*.
- **may, might, must** — *May* is for policy or legal permission; *might* is for
  possibility; *must* is for requirements.
- **method** — In programming contexts, don't also use it to mean "approach."
- **MIME type** — Avoid; use *media type*.
- **mom test, monkey test** — Don't use; use *novice user test*, *automated random tests*.
- **multi-cluster, multi-region, multi-service, multi-tenancy** — Hyphenated exceptions to
  the usual closed prefix rule.

#### N

- **N/A** — Not *NA*; spell out on first reference.
- **native** — Avoid for people; for software prefer *built-in* or *platform-specific*.
- **neither** — *Neither A nor B*.
- **nonce** — Use with caution; it has a slang meaning. Define it on first use.
- **NoOps** — Don't use; use *fully managed*.
- **nuke** — Don't use; use *remove* or name the attack.

#### O

- **off-the-shelf, COTS** — Don't use; use *ready-made*, *prebuilt*, or *standard*.
- **omnibox** — Don't use; use *address bar*.
- **once** — If you mean *after*, write *after*.
- **on-premises** — Hyphenated, with the *s*; not *on-premise* or *on prem*.
- **out of the box, outside the box** — Avoid figurative use.

#### P

- **page** — Use for a whole web page, and for a console's sub-pages (not *tab*).
- **parent-child** — Hyphen, not an en dash or em dash.
- **per** — Use for rates instead of a slash, unless space is tight.
- **performant** — Avoid; use a precise term such as *accurate* or *fast*.
- **persist** — Not a transitive verb; better avoided as a verb.
- **pets versus cattle** — Don't use; use *persistent versus dynamic*.
- **plain text** — Two words, except *plaintext* in cryptography.
- **please** — Don't use in instructions.
- **plugin (noun), plug-in (adjective), plug in (verb)** — Note the three forms.
- **pop-up, popup** — Don't use; use *dialog*, *menu*, or *window*.
- **possible, impossible** — Don't use to mean *you can* or *you can't*.
- **postmortem** — Avoid generally; use *retrospective*. OK as *blameless postmortem* in DR
  and DevOps contexts.
- **pros, cons** — Don't use; use *advantages* and *disadvantages*.

#### Q and R

- **quota** — Prefer a specific term such as *usage limit*.
- **read-only** — Always hyphenated.
- **redline, regex, repo, RTFM, tl;dr, ymmv** — Don't use; write the full or precise term.
- **rehost** — Migration with no or minimal change; also known as *lift and shift*.
- **review** — If you mean "read," write *read*.
- **RFC** — Space before the number: *RFC 2318*.
- **roll out** — Avoid for a sudden launch; define it or use a precise term.
- **runtime (environment), run time (duration)** — Two different terms.

#### S

- **sane, sanity check** — Don't use; use *valid*, *sensible*, *quick check*, or
  *confidence check*.
- **scale** — Don't use alone to mean large or increasing; say magnitude and direction.
- **screenshot** — One word, noun only: *take a screenshot*.
- **see** — OK as a general term and for cross-references.
- **select** — Use for choosing among options, selecting text, or marking a checkbox.
- **sensitive, confidential** — *Sensitive* data is harmful if released; *confidential*
  data is protected against unauthorized access.
- **setup (noun, adjective), set up (verb)** — Same pattern for *startup*, *timeout*,
  *sign-in*, and *sign-out*.
- **sexy** — Don't use; use *fast*, *powerful*, or *elegant*.
- **shall** — Avoid except under legal advice.
- **shift left** — Avoid; use *shift earlier*.
- **should** — Generally avoid; it is ambiguous between recommendation and expectation.
- **since** — If you mean *because*, write *because*.
- **single pane of glass** — Avoid; describe the interface.
- **slice and dice** — Don't use; name the operations.
- **spin up** — Avoid; use *create* or *start*.
- **ssh** — Don't use SSH as a verb; `ssh` is the utility, SSH the protocol.
- **STONITH** — Avoid; describe the feature, such as *fence failed nodes*.
- **such as** — Introduces a non-exhaustive list, so don't add *and so on*.
- **surface** — Avoid as a transitive verb; use *expose* or *make available*.

#### T

- **tarball** — Don't use; use *tar file*.
- **target** — Avoid as a verb, especially about people.
- **terminate** — Avoid as a synonym for *stop*.
- **text box, textbox** — Don't use; use *box*, or *field* in Google Cloud documentation.
- **they, their (singular)** — The preferred gender-neutral pronoun; always takes the
  plural verb.
- **this, that** — Where possible, put a noun after it.
- **timeframe** — One word, but prefer *period*, *schedule*, or *deadline*.
- **traditional** — Prefer a precise term such as *conventionally*.
- **turn on** — In procedures, use the UI element's own label and action.
- **type (verb)** — Avoid; use *enter*.
- **typically** — Don't start a sentence with it.

#### U and V

- **UI** — Don't use generically for a page or dashboard; name the thing.
- **under** — Don't use for version ranges or UI position.
- **Unix epoch time** — Not *Unix time* or *epoch time*.
- **US** — Not *U.S.* or *U.S.A.*
- **user** — Only for the user of the software your reader is building; address the reader
  as *you*.
- **using** — Write *by using* where *using* could attach to the wrong noun.
- **utilize** — Use with caution; not a synonym for *use*.
- **via, voila, vice versa, vs.** — Don't use; write *versus*, *the other way around*, or
  rewrite.

#### W to Z

- **we** — Don't address the reader with first-person plural pronouns.
- **webmaster** — Don't use; name the role (*website administrator*).
- **whether** — Use for alternatives; see also *if*.
- **while** — Only for a period of time, not for contrast; use *although*.
- **white glove, white label, whitehat** — Avoid or don't use; use *high-touch*,
  *unbranded*, *legal*, or *ethical*.
- **whitepaper, whitespace, wildcard, walkthrough, workload** — One word each.
- **will, would** — Avoid; use the present tense. See [Present tense](#present-tense).
- **wish** — Don't use; use *want* or *need*.
- **with** — Don't use to express ownership: *a handset that has 2 GB of RAM*.
- **you** — Use to address the reader. See [Second person](#second-person).
- **zippy** — Don't use for expander arrows.

### Product names

*Source: <https://developers.google.com/style/product-names>*

#### Capitalize product names

Google product names are in title case: every word capitalized except prepositions like
*of* and *on* and articles like *a* and *the*. Use title case except when matching a UI
label.

For any other product, follow the official capitalization used by the brand, company,
open source community, or its documentation — for example, Kubernetes capitalizes *Job*
and *Pod*. If an official name starts with a lowercase letter, keep it lowercase even at
the start of a sentence, but preferably rewrite so it isn't first.

- Recommended: You can use macOS to run the app.
- Not recommended: macOS can run the app.

##### Feature names

Feature names are generally lowercase unless the name is officially capitalized. If you're
unsure, follow the precedent in other documents about the feature, and match a UI label
when you're referring to one. See [Capitalization](#capitalization).

#### Shorten Google product names

Use the full trademarked name; don't abbreviate it, except when matching a UI label — and
then make clear which product you mean. Consider whether you need the product name
throughout: once you've established that you're describing Anthos Service Mesh, you can
often discuss *a service mesh* instead.

#### Articles before product names

Don't use *the* before a product name unless the name modifies something else. Do use
*the* before tool and API names.

- Recommended: Using Cloud Datastore with Cloud Dataproc; the Cloud Datastore options
  page; the Google Cloud console; the Transcoder API; the `gcloud` CLI.
- Not recommended: Using the Cloud Datastore with Cloud Dataproc.

With an indefinite article, watch which article the modifier needs: *an Anthos Service
Mesh environment*, but *a Service Mesh environment*. See
[Articles (a, an, the)](#articles-a-an-the).

#### Services and verbs

It's OK to call Google products *services* — *the Compute Engine service* — unless that
causes ambiguity, in which case use the product names. Never use a product or feature name
as a verb.

### Text-formatting summary

*Source: <https://developers.google.com/style/text-formatting>*

A quick reference for the formatting conventions covered elsewhere in this guide.

| Style | Use it for |
| --- | --- |
| **Bold** (`**` or `<b>`) | [UI elements](#ui-elements-and-interaction) and run-in headings, including the lead-in of a [notice](#notes-and-other-notices). Prefer `**` to `__` in Markdown. |
| *Italic* (`_` or `<i>`) | Terms being discussed, introduced, or used as words; emphasis; mathematical and version variables; titles of full-length works. Prefer `_` to `*` in Markdown so italics stay distinguishable from bold. |
| Underline | Link text only. |
| `Code font` (`` ` `` or `<code>`) | [Code in text](#code-in-text), inline code, user input, filenames, class and method names, HTTP status codes, console output, and placeholders. Use code blocks for [code samples](#code-samples). |
| Sentence case | [Headings, titles, and navigation](#capitalization). |
| ALL CAPS | [Placeholders](#placeholder-formatting). |

Further conventions:

- Use italics sparingly. Usually the words carry the emphasis without it. In HTML, use
  `em` for semantic emphasis; Markdown has no semantic tagging.
- Italicize mathematical variables (*x* + *y* = 3) but not operators, and italicize
  version variables: version 1.4.*x*.
- Put titles of shorter works — articles, episodes — in quotation marks, unless they're
  part of a link.
- Don't override global styles for font type, size, or color, and don't style text
  inline. Use [semantic HTML](#html-and-semantic-tagging) or Markdown instead.
- Don't use *&* as a conjunction anywhere, including headings and navigation. The
  exception is a UI element or menu whose name contains *&*.
- Put quotation marks and end punctuation outside link text. See
  [Cross-references and linking](#cross-references-and-linking).

---
## General principles

### Accessibility

*Source: <https://developers.google.com/style/accessibility>*

More than a billion people have an accessibility need, and writing for them improves the
document for everyone. See also [Global audience](#global-audience) and
[Inclusive language](#inclusive-language).

#### General dos and don'ts

- Don't use ableist language.
- Make everything reachable by keyboard alone, and test with a screen reader.
- In HTML, use [semantic tagging](#html-and-semantic-tagging) and native elements rather
  than custom styles. Avoid unnecessary font formatting — screen readers announce it.
- Don't force line breaks inside sentences; they break under resizing.
- Avoid camel case and all caps: some screen readers spell capitals out, and some languages
  are unicase.
- Not all punctuation is read aloud, so the meaning must survive without it. Avoid
  exclamation marks, question marks, and semicolons where you can.
- Document any specialized accessibility features your product has.

#### Ease of reading

- Break up walls of text with [paragraphs](#paragraphs), [headings](#headings-and-titles),
  and [lists](#lists). Aim for sentences under 26 words.
- Define acronyms on first use, and again if they recur only rarely.
- Use parallel structures for similar things, and put the distinguishing information of a
  paragraph in its first sentence.
- Avoid double negatives: *You can continue without a path*, not *A missing path won't
  prevent you from continuing*.
- Left-align text; don't center or full-justify.

#### Headings, links, and lists

- Use a heading hierarchy without skipping levels, tag headings as headings, and use one
  level-1 heading per page. No empty headings. Change the look with CSS, not with the wrong
  level.
- Use link text that makes sense out of context — never *click here*. Use *see* for
  cross-references, explain unexpected behavior such as a download, and avoid adjacent links.
- Make each instruction in a [procedure](#procedures) a list item.

#### Images, video, and interactive elements

- Give every image an `alt` attribute — empty alt text if it's purely decorative — and
  never present new information only in an image.
- Don't use images of text, code, or terminal output. Prefer SVG to PNG.
- Caption or transcribe audio and video, and make captions translatable. No flickering or
  flashing elements.
- Introduce an interactive element in the text before it.
- Use the native `button` element for form submission; label every input field with a
  `label` outside the field; say what went wrong and how to fix it in validation errors.

#### UI navigation and tables

- With angle brackets for menu paths, add an `aria-label` so screen readers say "and then"
  rather than "greater than."
- Introduce tables in the preceding text — not every screen reader announces them.
- Use `th` for the first row and column only; add `scope` when a table has both row and
  column headings, and `headers` with unique IDs for multi-level headings.
- Don't merge cells, avoid tables inside numbered procedures, and don't use a table unless
  it's the best way to present the information.

#### Custom CSS and JavaScript

Respect a 4.5:1 contrast ratio for text. Don't use `visibility:hidden` or `display:none` —
both hide content from screen readers. Avoid mouseover events, or pair them with focus and
blur events. Keep style ordering consistent with the DOM and the reading order.

#### Document rendering

Your document must work without sound, with sound alone, without images, without color,
with a keyboard, under magnification, and without punctuation. Never let color, size, or
location be the only carrier of information — add a second cue such as a text label.

- Refer to elements by label: *Click **Save***, not *Click the bell icon*. For a visual
  element with no text, use its `aria-label`.
- Don't use directional language — *above*, *below*, *right-hand side* — for the UI or for
  document position; it fails for screen readers and right-to-left languages. Write *In the
  preceding diagram*, not *In the diagram above*. If an element is hard to find,
  [provide a screenshot](#figures-and-other-images).

Further reading: [WCAG 2.0](https://www.w3.org/WAI/WCAG20/glance/) and the
[Web Accessibility Initiative](https://www.w3.org/WAI/).

### Excessive claims

*Source: <https://developers.google.com/style/excessive-claims>*

An excessive claim asserts something about performance or cost the reader can't verify,
something about security that one incident would invalidate, or something subjective or
disparaging — especially about a third-party product. Judge a claim against what might be
true later, not only what is true today.

- Avoid superlatives — *best*, *simplest*, *fastest*, *never*, *always* — and use *ensure*
  and *guarantee* only when something truly can be.
- Cite the source of any specific performance claim.
- Say a feature "helps with security" rather than that a product is secure; that statement
  survives an incident.
- Claims about a competitor may be wrong now, or after their next release.

Write factually and objectively, limited to what stays verifiable over the document's life:
*Our product distributes computation in memory across a cluster, and therefore it can be
faster for this scenario than ExampleCorp's product*, not *Our product is faster than
ExampleCorp's product*.

### Future features

*Source: <https://developers.google.com/style/future>*

Avoid documenting future features or products, even in innocuous ways. Don't pre-announce
anything unless legal counsel has approved it. See also [Present tense](#present-tense) and
[Timeless documentation](#timeless-documentation).

### Global audience

*Source: <https://developers.google.com/style/translation>*

Much documentation is translated, or read by people whose first language isn't English.
Write with *localization* (adapting to a country — currencies, units), *translation*, and
*internationalization* (designing to make localization cheap) in mind.

#### Clear, concise, unambiguous language

- Use the simple word: *start*, not *commence*; *use*, not *utilize* or *leverage*. Use one
  word where a phrase would do — *some*, not *a number of*.
- Write shorter sentences; English often grows when translated.
- Avoid phrasal verbs where a simpler verb exists: *This document uses the following
  terms*, not *makes use of*. Some, such as *set up* and *sign in*, have no substitute.
- Don't stack more than two nouns as modifiers, and don't misplace modifiers: *Request only
  one token*, not *Only request one token*.
- Use [present tense](#present-tense) and [active voice](#active-voice), and avoid uncommon
  verb forms.
- Use words in their primary sense; don't use one word as both noun and verb close
  together; avoid directional language in procedures.

#### Helper and optional words

- Give technical keywords a qualifying noun: *the `example.yaml` file*.
- Repeat a word when redundancy helps: *If the VM has started and if you're able to
  connect...*
- Keep the helper words conversation drops — *then*, *that*, *of*: *If the attribute key is
  not found, then the default value is returned*; *Start the profiler, and then run the app*.
- Don't omit relative pronouns: *the rules that you previously defined*.
- Define abbreviations, and replace an ambiguous pronoun with its noun.
- Watch plurals and possessives, and avoid uncommon contractions.

#### Address the reader, and be consistent

Use *you*, not *the user*, unless you mean someone using the software your reader is
building. Give context rather than assuming knowledge, and prefer saying what the reader
can do over what they can't.

- Use the same term, with the same capitalization, for a concept everywhere; different
  names read as different concepts to a translator and raise costs.
- Use standardized phrasing for recurring sentences — introducing links, output, code.
- Use standard word order, keep subject and verb near the start, and put the conditional
  clause first (see [Sentence structure](#sentence-structure)).
- Make list items parallel in structure, capitalization, and punctuation, and apply bold and
  italics consistently.

#### Be inclusive

Write [dates and times](#dates-and-times) unambiguously; avoid culturally specific holidays,
practices, and sports; use a diverse set of [example names](#example-domains-and-names);
avoid idiom, slang, and humor; and don't assume geography — August isn't summer everywhere.
Use screenshots and text in figures sparingly, since images aren't translated.

### Inclusive language

*Source: <https://developers.google.com/style/inclusive-documentation>*

#### Avoid unnecessarily gendered language

Watch pronouns in narrative examples and other sources of gendered language: *16
person-hours*, not *16 man-hours*; *benefits humanity*, not *benefits mankind*.

#### Avoid figurative language

Use precise, widely understood, industry-standard terms. Idiom and metaphor are easy to
misread and hard to translate, and reaching for a friendly tone is where they creep in.
Don't compare stateful and stateless systems as *pets versus cattle*.

**Ableist language** — *crazy*, *insane*, *blind to*, *cripple*, *dumb* — always has an
accurate alternative: *a final check for completeness*, not *a final sanity-check*;
*baffling outliers*, not *crazy outliers*; *It slows down the service*, not *It cripples the
service*.

**Graphic or metaphorical language** should give way to a precise term: *fence failed
nodes*, not *STONITH*; *If the connection doesn't respond*, not *if the connection hangs*;
*Point to **File***, not *Hover over **File***. If you must mention such a term, mention it
once, de-emphasized. Some industry terms have a technical meaning with no synonym — see
*terminate* and *execute* in the [Word list](#word-list).

#### Write diverse and inclusive examples

Follow the [gender-neutral pronoun](#pronouns) guidance, avoid US-specific holidays and
sports, and choose a diverse set of [example names](#example-domains-and-names). For older
adults, avoid *the elderly*, *seniors*, or *80 years young*; use *older adults* or *aging
population*, or give the relevant relative age.

#### Write about features and users inclusively

Don't refer to people divisively — *native speakers* versus *non-native speakers*, say;
usually the document doesn't need the distinction. Avoid socially charged terms for
technical concepts (*blacklist*, *native* feature, *first-class citizen*) even where they
remain widely used.

**Replacing an established term.** Where a substitution could confuse readers, name the
non-inclusive term once in parentheses on first use, then use the inclusive term
throughout: *add them to an allowlist (sometimes called a whitelist)*; *a Jenkins
controller (master) handles HTTP requests*. Often you can rewrite instead: *You can allow
requests from a range of IP addresses*, rather than *You can allowlist a range*.

**Writing around code terms.** When the term is a name or keyword — a cluster named
`master`, SQL's `START SLAVE` — minimize it rather than ignore it, and never use it outside
code font. Name it on first reference in code font, in parentheses if possible (*create a
parent node (which is named `master` in the file)*), then use the preferred term.

#### Discussing disability and accessibility

Research how the communities you write about prefer to be identified, and use those terms.

- Don't call people without disabilities *normal* or *healthy*; use *nondisabled person*,
  *sighted person*, or *neurotypical person*.
- Prefer terms that don't define people by their disability — *people with disabilities* —
  but note that many autistic, blind, and Deaf people prefer identity-first language, and
  capitalization conventions vary.
- Avoid terms that project judgment (*victim of*, *suffering from*, *wheelchair-bound*) in
  favor of *experiencing*, *living with*, *uses a wheelchair*, and avoid euphemisms such as
  *physically challenged* or *differently abled*.

### Jargon

*Source: <https://developers.google.com/style/jargon>*

Jargon is specialized, often figurative terminology standing in for a larger concept —
*swim lane*, *break-glass procedure*, *out-of-the-box* — plus vague, overloaded words like
*solution*, *support*, and *workload*. It is opaque outside the group that coined it, which
works against clarity, translation, and inclusion. Some jargon is genuinely standard and
readers search for it, so before using a term, ask:

- **Can you write around it?** *When the project is finished, review what processes worked*
  instead of *Hold a post-mortem*.
- **Can you replace it?** The [Word list](#word-list) offers *affected area* for *blast
  radius*, *import* for *ingest*, *ready-made* for *off-the-shelf*. A term marked "Don't
  use" must be replaced or written around.
- **Do you use it once?** Describe it plainly and put the term in parentheses, or link to a
  definition: *move the task earlier in the process (also known as shifting left)*.
- **Do you use it throughout?** Define it in parentheses on first reference: *a cold standby
  (a redundant system identical to a primary system)*.
- **Is it in a command or code sample?** Use it only in direct reference to the code item,
  in code font: *Add a user to the allowlist (`whitelist`)*.

### Prescriptive documentation

*Source: <https://developers.google.com/style/prescriptive-documentation>*

Prescriptive — opinionated — documentation recommends a way to accomplish a goal instead of
listing options, and recommends a path where a task spans products. It shapes the
document's purpose and structure, the scenarios and procedures you choose, and the sample
commands you give, which should cover the most common use case.

#### Word choice for recommendations and requirements

Choose the auxiliary verb that says exactly what you mean, and generally avoid *should*,
which leaves the reader unsure whether an action is required.

- **Required** — *must*, or a plain imperative: "Do the following before you continue."
- **Recommended** — *We recommend ...*. *Should* is acceptable for a widely recognized
  recommendation: "You should use a strong password."
- **Optional** — *can*: "You can also use approach B."
- **Expected outcome** — state it: "The process returns 10 items."
- **Possible outcome** — *might* or *can*: "The process can take about 30 minutes."
- **Actual state** — not "The value should be true," but "You must set the value to true,"
  "The server sets the value to true," or "If the value is false, follow these steps."

Recommended: *The column of the data table that the filter operates on.* Not recommended:
*... that the filter should operate on.*

### Third-party content

*Source: <https://developers.google.com/style/other-sources>*

Don't copy content — text, images, code, logos, speech — from another source; it might
violate copyright. Paraphrase and link instead: define *recovery point objective (RPO)* in
your own words with a link, rather than quoting a definition.

Unless you're sure your company owns the assets, avoid copying from third-party sources of
any kind, from reference works such as dictionaries and Wikipedia, from open source product
documentation, and from GitHub — licenses vary and reuse is never safe to assume.

### Timeless documentation

*Source: <https://developers.google.com/style/timeless-documentation>*

Timeless documentation avoids words that anchor it to a moment or assume knowledge of
earlier or later versions. Document how the product works now.

| Recommended | Not recommended |
| --- | --- |
| These subcommands let you interact with HTTP load balancing. | These new subcommands ... |
| The following options aren't supported: | The following options aren't currently supported: |

Time-based words are fine in dated content — press releases, blog posts, release notes —
and in procedures marking a change of state: *The VM goes offline soon after you send the
shutdown command.*

Four kinds of word cause trouble: those that project plans (*eventually*), those already
implied by the document's existence (*currently*), those that go stale (*soon*, *latest*),
and those that assume prior knowledge (*new* — if you need it, give a date or version).
Avoid: *as of this writing*, *currently*, *does not yet*, *eventually*, *existing*,
*future*, *latest*, *new*, *newer*, *now*, *old*, *older*, *presently*, *soon*.

### Voice and tone

*Source: <https://developers.google.com/style/tone>*

Aim for a voice that's conversational, friendly, and respectful without being slangy or
frivolous — casual and approachable, not pedantic or pushy. Sound like a knowledgeable
friend who understands what the developer wants to do. Don't write exactly as you speak;
conversation is more verbose than documentation should be. Be human and let your
personality show, but remember the reader came for information, may be in a hurry, and may
be reading English as a second language.

**Avoid**: buzzwords and [jargon](#jargon); cutesiness; [figurative
language](#inclusive-language); placeholder phrases like *please note*; choppy or
long-winded sentences; starting every sentence the same way; pop-culture references;
exclamation marks; phrasing that denigrates any group; *let's do this*; *simply*, *it's
easy*, or *quickly* in a procedure; and internet slang such as *tl;dr*.

**Techniques**: if you're stuck, ask yourself "What am I trying to say?" — the answer is
usually the sentence you want. Ask a colleague if you're unsure of the tone. Read it aloud;
an awkward spoken sentence can usually be made more conversational. Use transitions between
sentences. Above all, make the information clear and direct.

Being polite is good, but *please* in instructions is overdoing it: *To view the document,
click **View***, not *please click **View***.

| Too informal | Just about right | Too formal |
| --- | --- | --- |
| Dude! This API is totally awesome! | This API lets you collect data about what your users like. | The API documented by this page may enable the acquisition of information pertaining to user preferences. |
| Then—BOOM—just garbage-collect. | To clean up, call the `collectGarbage` method. | Please note that completion of the task requires executing an automated memory management function. |

---
## Language and grammar

### Abbreviations

*Source: <https://developers.google.com/style/abbreviations>*

Abbreviations cover acronyms (pronounced as words, like *NATO*), initialisms (spelled out
letter by letter, like *CIA*), shortened words (*Dr.*, *etc.*, *min*), and
[contractions](#contractions); *acronym* is fine for the first two. Short versions of words
— *app*, *demo*, *sync* — aren't abbreviations and take no period. If you're unsure, say it
aloud: if you speak the short form as a word, treat it as one.

#### When to use abbreviations

Abbreviations exist to save time; one the reader has to decode costs time instead. Use only
standard acronyms and initialisms, spell them out on first reference, and be wary of
specialized ones your readers might not know (see [Jargon](#jargon)). Don't abbreviate terms
unrelated to the document's main topic — in a document about the internet of things (IoT),
leave *low Earth orbit* spelled out.

#### When to spell out a term

Spell out an unfamiliar abbreviation on first mention, with the abbreviation in parentheses
— *Border Gateway Protocol* (*BGP*) — then use the abbreviation alone. If a term appears
only once, include the abbreviation only if it's as common as the spelled-out form. If the
first mention is in a heading, spell it out in the paragraph that follows.

Consider your audience: spelling out helps translation and less fluent readers, but an API
document needn't expand *application programming interface*, and expanding *PDF* to
*portable document format* helps nobody. These rarely need spelling out: AI, API, DVD, file
formats such as PDF or XML, HTML, PC, RAM, REST, units such as MB or GiB, URL, USB.

##### Format abbreviation introductions

- Italicize both the term and its abbreviation: *Border Gateway Protocol* (*BGP*), not
  *Border Gateway Protocol* (BGP).
- Capitalize the spelled-out form only if it's a proper noun or conventionally capitalized —
  *data manipulation language (DML)*, not *Data Manipulation Language (DML)*.
- Include the abbreviation in link text.

#### Abbreviations not to use

Don't use *i.e.* or *e.g.*; write *that is* and *for example*. *Etc.* is occasionally
acceptable, but usually rephrase. Don't use internet slang such as *tl;dr*, *ymmv*, or
*RTFM*. Use the common full word — *approximately*, not *approx.* — and spell out symbols
that substitute for words: *10 times faster*, not *10x faster*.

#### Periods, plurals, and verbs

- No periods with acronyms or initialisms; a period after a shortened word, except in date
  and time abbreviations; none after a short form you say as a word (*app*); none in a
  country, US state, or DC abbreviation. For plurals, see [Pluralization](#pluralization).
- Don't use an abbreviation as a verb: *Use SSH to log in*, not *Then ssh into*.
- Choose *a* or *an* by the pronunciation most common for your audience — hence *a SQL*,
  *a FHIR*, and *an SAP*.

### Active voice

*Source: <https://developers.google.com/style/voice>*

Use active voice, where the grammatical subject performs the action, and make clear who is
performing it. Passive voice makes it easy to leave out who is supposed to act — the reader,
the computer, the server, an end user. Write *Send a query to the service. The server sends
an acknowledgment*, not *The service is queried, and an acknowledgment is sent*. You can
name the actor with *by*, but recasting as active is almost always better.

Passive voice is fine to emphasize an object over an action (*The file is saved*), to
de-emphasize the actor (*Over 50 conflicts were found in the file*), or when the reader
doesn't need to know who acted (*The database was purged in January*).

### Anthropomorphism

*Source: <https://developers.google.com/style/anthropomorphism>*

Don't attribute human qualities to software or hardware; it is figurative language, and so
less precise and harder to translate. Write *A Delimiter object specifies where to split a
string* and *The PC detects a new device*, not *tells the splitter* and *sees a new
device*.

### Articles (a, an, the)

*Source: <https://developers.google.com/style/articles>*

Include *a*, *an*, and *the*. Don't drop articles for brevity, including in headings and
titles: *Create a VM instance*, not *Create VM instance*. Articles aid comprehension and
translation. See also [Product names](#product-names) for articles before product names,
and [Abbreviations](#abbreviations) for *a* versus *an* before an abbreviation.

### Capitalization

*Source: <https://developers.google.com/style/capitalization>*

Follow standard American English capitalization rules, and additionally:

- Don't capitalize unnecessarily — know why a word is capitalized before capitalizing it.
- Don't make capitalization carry meaning. Kubernetes users may know *Pod* from *pod*, but
  newcomers won't.
- Don't use all-uppercase except in official names, in abbreviations that are always
  all-caps, or when referring to code that is.
- Don't use camel case except in official names or when referring to code that uses it.

#### Titles and headings

Use sentence case in [document titles and headings](#headings-and-titles): capitalize the
first word, the first word after a colon, and terms that are always capitalized. Don't end
with a period. When referring to a title from a document that follows this guide, use
sentence case even if the original uses title case, so the reference still matches once the
original is updated; for any other work, keep the original capitalization.

#### Colons, figures, lists, tables, and glossaries

- After a colon, start with a lowercase letter unless what follows is a proper noun (*Open
  source software: Hadoop*), a heading, a quotation, or text after a label such as
  *Caution* or *Note*.
- Use sentence case for captions, for labels and callouts in images and diagrams, for items
  in every kind of list, and for everything in a table — contents, headings, labels, and
  captions.
- Use lowercase for glossary and index terms unless the term is a proper noun; use sentence
  case for glossary definitions.
- When a hyphenated word starts a sentence or heading, capitalize only its first element,
  unless a later element is a proper noun or adjective.

#### Special capitalization style names

Don't name a casing style — *camel case*, *snake case* — to describe one; the names don't
localize and aren't standardized. Explain the requirement and give an example:

- Recommended: Enter the value for the `attribute` field with no spaces between words and
  the first letter of each word capitalized — for example, `AssertionAccount`.

### Contractions

*Source: <https://developers.google.com/style/contractions>*

Documentation uses an [informal tone](#voice-and-tone), so use common two-word contractions
such as *you're*, *don't*, and *there's*. Negation contractions are particularly worth
using: a reader scanning can miss a standalone *not*, but is unlikely to misread *don't* as
*do*. If you need to emphasize the negative, use *is <em>not</em>*.

Don't invent nonstandard contractions such as *guides're*, don't use *'s* to mean *is* after
a noun, and don't use three-word contractions such as *mightn't've*.

### Pluralization

*Source: <https://developers.google.com/style/pluralization>*

Follow standard US English pluralization and use the regular plural form. Don't form a
plural with *'s* — it collides with the possessive and the contraction.

#### Singular and plural agreement

Check agreement with long or complex subjects: *Confirm that the number of entries listed in
the directory is accurate*. With subjects joined by *and* or *or*: *The request payload and
header information are logged*; *Either the API keys or service account wasn't
authenticated*. Use a plural after *one or more* (*If one or more tests fail...*) — or
reword to *If any one test fails*. Use a singular after *more than one*: *You can create
more than one instance at a time*.

#### Plural abbreviations

Treat abbreviations as regular words: *APIs*, *IDEs* — never *API's*. If the abbreviation
ends in *s*, *sh*, *ch*, or *x*, add *es*: *OSes*, *BMXes*. Match the spelled-out term to
the abbreviation in number: *virtual machines (VMs)*.

With units of measurement, use the singular only for one: *0 degrees*, *0.5 degrees*, *1
degree*. Don't pluralize an abbreviated unit after a number (*64 GB*, not *64 GBs*), and put
a space — preferably nonbreaking — between the number and the abbreviation.

#### Plural product, feature, and class names

Don't form a plural or possessive from a product, feature, or company trademark. Use
singular class names and add a plural noun after them rather than pluralizing the name:
*`Intent` objects and `Activity` instances*, not *`Intent`s* or *`Intents`*.

#### Plurals in parentheses

Don't write optional plurals in parentheses. Pick singular or plural and stay consistent;
use *one or more* if you must indicate both. Write *To find your API key, visit the
**Credentials** page*, not *your API key(s)*; *the values of its children*, not *the
value(s) of its child(ren)*.

### Possessives

*Source: <https://developers.google.com/style/possessives>*

- Singular nouns, including those ending in *s*, take *'s*: *each vector's record*, *the
  storage class's quota*.
- Plural nouns ending in *s* take an apostrophe only (*the models' capabilities*); plural
  nouns not ending in *s* take *'s*.
- If a possessive is awkward, rewrite: *Analyze the business data*; *The rule that the
  Federal Trade Commission (FTC) issued*.

#### Product, feature, and code names

Don't form a possessive from a feature name, product name, or trademark — anyone's — when
describing function or performance. Use the name as a modifier or rewrite with *of*:
*monitor Google Search performance*, or *the performance of Google Search*, never *Google
Search's performance*. A company name takes *'s* (*Google's new office is nearby*), but not
when used as a trademark.

Don't form the possessive of a code item either. Take it from the following noun — *the
`wordCount` method's return value* — or rewrite as *the value returned by the `wordCount`
method*.

### Prepositions

*Source: <https://developers.google.com/style/prepositions>*

There's no rule against ending a sentence with a preposition. Put it where the sentence
reads most easily: *the client library documentation for the language you're interacting
with*, not *for the language with which you're interacting*. Include prepositions that add
clarity, omit unnecessary ones, and don't stack so many that the sentence clutters.

### Present tense

*Source: <https://developers.google.com/style/tense>*

Use present tense for general behavior not tied to a particular time: *Send a query to the
service. The server sends an acknowledgment* — not *will send*.

Future tense is fine for an action that genuinely happens later: *The file will be archived
the next time the backup process runs*; *A message is sent that will notify any Pub/Sub
subscribers* (delivery is asynchronous).

Don't use future tense for how a product will work after the next release — see
[Future features](#future-features) — and avoid the hypothetical *would*: *If you send an
unsubscribe message, the server removes you from the mailing list*.

### Pronouns

*Source: <https://developers.google.com/style/pronouns>*

Make sure every pronoun clearly refers to its antecedent.

#### Ambiguous pronoun references

Write *If you type text in the field, the text doesn't change*, not *it doesn't change*.
Usually follow a demonstrative pronoun with a noun: *Set this value to true*, not *Set this
to true*; *These approaches are your best options*, not *These are your best options*.

#### Gender-neutral pronouns

Don't use gender-specific pronouns unless the person referred to is actually that gender. In
particular, don't use *he*, *she*, *he/she*, or *(s)he* as a gender-neutral pronoun. Use
the singular *they*, which has a long history in English and is standard at many
publications.

#### Optional and relative pronouns

Keep optional pronouns such as *that* and *which* — they remove ambiguity: *Right-click the
link that you want to open*; *other option parameters, which are described in the following
section*.

*That* and *which* aren't interchangeable. *That* introduces a restrictive clause with no
comma — *The echidna that has a long snout is furry* describes one particular echidna.
*Which* introduces a nonrestrictive clause and takes a comma — *The echidna, which has a
long snout, is furry* describes all echidnas. Use *who* for a person if you like; *that* is
generally acceptable too. *Whose* works for people, animals, and things: *the variables
whose values are set at compile time*.

#### Personal pronouns

Avoid first-person pronouns except in FAQ questions, in a document where the author
comments in the first person, and in *we* used for your organization after naming it.
Prefer the second person — see [Second person](#second-person).

### Second person

*Source: <https://developers.google.com/style/person>*

#### Address the reader as *you*

Use *you* and *your*, not *we*, *our*, or *us*. Assume the reader is the person doing the
tasks, and reserve *user* for the user of the software your reader is building. Write *The
following sections describe how you can create a website*, not *how we can create a
website*; *Consider adding a description to your table*, not *Let's add a description to our
table*.

When telling the reader to act, use the imperative — the *you* is implied: *Click
**Submit***. The imperative is fine in running text once you've established who is being
addressed, but consider whether the text should be a [procedure](#procedures) instead.

Use the second person for what the reader does and the third person for what the software or
an end user does. In API documentation, state facts about programming elements in the third
person, and address the reader as *you* when telling them what to do.

#### First-person plural, used carefully

*We*, *our*, and *us* may stand for the organization that authors the document, as long as
the antecedent is clear: *Example Organization provides A and B, but we don't provide C and
D.*

#### Address your audience consistently

Decide who *you* is — a developer, a sysadmin, someone else — and stay consistent.
Sometimes an explicit audience sentence near the start of the document is worth adding.

### Sentence structure

*Source: <https://developers.google.com/style/sentence-structure>*

Mention the circumstance, condition, or goal before the instruction, so a reader can skip an
instruction that doesn't apply to them.

| Recommended | Not recommended |
| --- | --- |
| For more information, see [link]. | See [link] for more information. |
| To delete the entire document, click **Delete**. | Click **Delete** if you want to delete the entire document. |

### Verbs in reference documents

*Source: <https://developers.google.com/style/reference-verbs>*

Phrase a method's main description in terms of what the method does, not what the developer
uses it to do — the difference is usually just a final *-s*: *tasks.insert: Creates a new
task on the specified task list*, not *Create a new task*.

---
## Punctuation

### Colons

*Source: <https://developers.google.com/style/colons>*

A colon indicates that closely related information follows.

- **Introductory phrase.** The text before a colon that introduces a list must stand alone
  as a complete sentence: *The fields are defined as follows:*, not *The fields are:*.
- **Within sentences.** The first word after a colon is lowercase, except for a proper
  noun, a heading, a quotation, or text following a label such as *Caution*. See
  [Capitalization](#capitalization).

Prefer a colon to a dash in description lists — see [Dashes](#dashes).

### Commas

*Source: <https://developers.google.com/style/commas>*

- **Serial commas.** In a series of three or more items, put a comma before the final *and*
  or *or*: *zones, regions, and multi-regions*.
- **After introductory words and phrases.** *Finally, only groups that contain parameters
  appear in this list.*
- **Between two independent clauses** joined by *and*, *but*, *or*, *nor*, *for*, *so*, or
  *yet*, put a comma before the conjunction — unless both clauses are very short: *The
  libraries make feed creation easier, and they ensure that only valid feeds are produced*,
  but *Type your ID and click **OK***.
- **Between an independent and a dependent clause** joined by a coordinating conjunction,
  add a comma only if the sentence could be misread without one: *Direct-access flags are
  plain variables and can be read directly* (no comma), but *The manager acknowledged the
  last team member who entered the room, and started the meeting* (comma needed).
- **Before *which*** at the start of a nonrestrictive clause: *Name of the group, which has
  a maximum length of 200 characters.*
- **Around conjunctive adverbs.** Put a semicolon, period, or dash before *otherwise*,
  *however*, or *therefore*, and a comma after it: *The variable must have a value;
  otherwise, the server returns an error.*
- **Before *because***, only when it starts a nonrestrictive clause: *You can use the same
  key name in multiple backend services, because each set of keys is independent.*

### Dashes

*Source: <https://developers.google.com/style/dashes>*

#### Em dashes

Use an em dash to mark a break in the flow of a sentence—or an interruption—with no space
on either side. Type it as `&mdash;` in HTML, `Option+Shift+hyphen` on macOS, `Alt+0151` on
the Windows numeric keypad, or the Compose key followed by three hyphens on Linux.

Don't substitute a hyphen or an en dash for an em dash. A spaced en dash is becoming more
common in some countries, but for now use only the em dash.

#### En dashes

Don't use them. Use a hyphen or the word *to* — see
[Units of measurement](#units-of-measurement).

#### Colons instead of dashes in description lists

Don't separate an item from its description with a spaced dash or hyphen. Use a colon or a
period, and for a series of items use an HTML description list (`<dl>`).

- Recommended: *Example: This is an example.*; *Appendix A: My first appendix*
- Not recommended: *Example - This is an example.*; *Appendix A—My first appendix*

### Ellipses

*Source: <https://developers.google.com/style/ellipses>*

In general, don't use ellipses. Never use them as suspension points to indicate hesitation.

- **In a user interface.** Leave them out when documenting the element — a button labeled
  **Save ...** is documented as *click **Save*** — unless omitting them causes confusion.
- **In text.** Omit unnecessary information rather than eliding it. Ellipses are acceptable
  inside quoted text, except at the beginning or the end of the quotation. If the omitted
  material spans a sentence boundary, use four dots — the fourth is the period.
- **Punctuation and spacing.** Type three periods rather than the ellipsis character, keep
  them together, and put one space before and after — no space after if a punctuation mark
  follows immediately.

### Hyphens

*Source: <https://developers.google.com/style/hyphens>*

Use a hyphen where it aids clarity: to separate parts of words that could be misread, and to
combine terms that should be read as a unit. Hyphenation depends on the term's location in
the sentence, on readability, and on convention, and it has many exceptions. When unsure,
check, in order: the documentation you're working in, this guide's
[word list](#word-list), and [Merriam-Webster](https://www.merriam-webster.com/).

#### Prefixes

In general, don't hyphenate between a prefix and the main noun: *infrastructure*,
*megabyte*, *metadata*, *preprocessing*, *pseudocode*, *semiconductor*. Add a hyphen when:

- the prefix is *self* or *cross*: *self-managing*, *cross-region*;
- the noun is capitalized or a number: *non-Google*, *post-2000*;
- it prevents a misreading: *de-energize*, *re-sign*;
- the base term already has hyphens or spaces: *un-Google-like*;
- consistency within the document requires it: *pre-processing*, *post-processing*.

*Non* follows the same rules but is often hyphenated because it forms hard-to-parse words —
*noncurrent*, *nonempty* but *non-existence*, *non-integer*, *non-key*. Always hyphenate
*non* before a hyphenated compound: *non-KSA-based*.

#### Compound nouns

Write compound nouns closed: *webpage*, *hostname*, *tradeoff*, *workaround*. If
Merriam-Webster shows an open or hyphenated form but the closed form dominates in your
context, use the closed form. The [word list](#word-list) records well-established
exceptions such as *multi-region* and *style sheet*, and notes where noun, verb, and
adjective forms differ.

Hyphenate the components of a unit of measurement that are multiplied together: *5
vCPU-hours*, *40 person-hours*.

#### Compound modifiers before a noun

Hyphenate a compound modifier before a noun where it aids clarity — *a well-designed app*,
*Android-specific techniques*. It's almost never wrong to do so. Use a hyphen after *more*
or *most* when needed to clarify what they modify: *Edge locations with more-reliable
internet links*.

Avoid compound modifiers longer than two words; move some words after the noun instead —
*test cases that are specific to the 2023 edition*, not *edition-2023-specific test cases*.
If you must, hyphenate between each word: *cross-data-center replication*.

**Numbers and units.** Hyphenate a number and a spelled-out unit that together modify a
noun: *a 64-bit system*, *100,000-byte files*, *a five-minute wait*. Don't hyphenate an
abbreviated unit; use a nonbreaking space instead: `200&nbsp;GB disk`.

**Exceptions.** Don't hyphenate adverbs ending in *-ly* (*publicly available
implementations*), and don't hyphenate compounds that are conventionally open: *a managed
instance group*, *a machine learning model*.

#### Compound terms after a verb

Generally no hyphen after a verb: *The app is well designed*; *The logs are written in real
time*; *techniques that are Android specific*; *use the utility as is*.

Some compounds stay hyphenated anywhere: *deploy the app on-premises*, *create an add-on*,
*apps that are cloud-based*, *this page is customer-facing*, *designed to be
user-friendly*.

#### Ranges, spaces, and suspended hyphens

Use a hyphen, not an en dash, for a range of numbers: *8-20 files*, *5-10 minutes*. If a
hyphen is ambiguous, use *from*, *to*, or *through* — but don't mix the two: *from 8 to 20
files*, never *from 8-20 files*.

Never put a space on either side of a hyphen, except after a suspended hyphen: *scan for
new files at one-, two-, or three-hour intervals*.

### Parentheses

*Source: <https://developers.google.com/style/parentheses>*

Some readers skip anything in parentheses, so don't put important information there. Even
for less important information, consider whether commas, dashes, semicolons, or periods
would work as well. Keep a mid-sentence parenthetical short; otherwise use two sentences.

- Recommended: Enter a name for the instance—for example, `my-instance-99`.
- Recommended: Enter a six-digit hex number (for example, `228B22`), and then click **OK**.
- Not recommended: Enter a six-digit hex number (for example, if you want forest green,
  enter `228B22`), and then click **OK**.

If a full standalone sentence appears inside parentheses, the period goes inside them.
Don't use parentheses for optional plurals — see [Pluralization](#pluralization).

### Periods and end punctuation

*Source: <https://developers.google.com/style/periods>*

End a complete sentence with a period unless it's a question. Lists are the exception —
see [Lists](#lists).

- **URLs.** A period after a URL can look like part of it. Avoid URLs in text, rewrite so
  the URL isn't last, or put the URL on its own line with no final period. If you do use a
  period after a URL, leave no space before it.
- **Quotation marks.** Put the period inside the quotation marks, even when it isn't part of
  the quoted material: *you might say "Fixed typo."* If the quoted material ends with a
  question mark or exclamation point, don't add a period: *Children always ask "Why?"* For
  quoted literal strings, see [Quotation marks](#quotation-marks).
- **Parentheses.** The period goes after the closing parenthesis, unless the parentheses
  contain a complete sentence, in which case it goes inside.
- **Headings** take no period. **Numbers** use a period as the decimal point.
  **Abbreviations**: a period after a shortened word, none after an acronym's letters.
- **Spacing.** One space between sentences.

#### Exclamation points

Generally avoid them: they read as unprofessional or alarming, and translate poorly — in
Japanese or Korean they can read as shouting.

- **Concept and reference docs**: never.
- **Procedures**: avoid; use a period for completion steps — *The VM is created.*
- **Blog posts**: acceptable for enthusiasm, not in every paragraph.
- **Acceptable**: where syntax requires one (`!=`), in a literal error code or log message
  that must match exactly, and sparingly in tutorials to mark a milestone.

### Quotation marks

*Source: <https://developers.google.com/style/quotation-marks>*

Use straight double quotation marks and apostrophes.

#### When to use quotation marks

Technical writing uses them sparingly, apart from code. Use them for titles of shorter works
such as articles or episodes, unless they're part of a link; full-length works take italics.
Also use them:

| Guidance | Example |
| --- | --- |
| Referring to a section of a larger piece you can't link to directly. | The technique is described in the section "Deploying containers" of the Containers overview video. |
| Referring to a parent document's title when you're already linking to a section. | The [ML workflow section](https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform#ml-workflow) of "Introduction to Vertex AI" describes ... |
| Citing a person, slogan, or motto. | Martin Fowler has said, "We are still learning the techniques to write software effectively." |
| Using a term metaphorically, where that isn't established usage in the domain. | This configuration forms an "island" within the network. |

#### Commas and periods with quotation marks

Commas and periods go inside the quotation marks: *See the section titled "Care and feeding
of the emu."*

**Exception**: with a keyword or literal string, put other punctuation outside the quotation
marks so nothing extraneous falls inside. Better still, use code font and no quotation
marks at all: *If you enter `escape`, the program crashes.*

#### Straight and curly quotation marks

Always use straight marks. Code requires them, so using them everywhere is simpler than
switching; automatic conversion tools and manual typing both introduce mistakes; and curly
marks are hard to check when proofreading.

#### Single quotation marks

Use them only in code examples in languages that require them, and for a quotation nested
inside another quotation: *She said, "I heard him shout 'Help,' and saw him floundering in
the water."*

### Semicolons

*Source: <https://developers.google.com/style/semicolons>*

Avoid semicolons where you can. A few cases prefer one:

- Joining two closely related independent clauses where a period or comma is less
  effective: *You can easily test compatibility by computing the centroid; if it is on the
  opposite side of the planet, reverse the order of your vertices.*
- Before a conjunctive adverb or phrase joining two independent clauses: *... below the Main
  Camera; therefore, only the stereo cameras are affected*; *The URL from which a video ad
  loads; that is, the URL to use to fetch that ad.*
- Separating long or complex series items that contain their own punctuation: *checking for
  the following: present tense and active voice; typos, punctuation, and grammar; and
  whether you can shorten anything.*

### Slashes

*Source: <https://developers.google.com/style/slashes>*

Avoid slashes, except in code.

- **Dates.** Don't use slash-based date formats. See [Dates and times](#dates-and-times).
- **Alternatives.** Don't use a slash to separate them: *developed or hosted by a commercial
  entity*, not *developed/hosted*; *five or six times*, not *5/6 times*.
- **And/or.** *And* usually implies *or*, so one word is enough: *You can view and edit your
  own data.* If you need both, write them out — *raw events, processed events, or both* —
  and reserve *and/or* for space-constrained places such as tables.
- **File paths and URLs.** Use forward slashes (backslashes for Windows paths). Break a long
  URL immediately after a slash, and never insert a hyphen to break one.
- **Fractions.** Don't use slashes; *3/4* could be a fraction or an alternative. Write *¾*,
  *0.75*, or *75%*.
- **Abbreviations.** Spell out *care of* and *with*, rather than *c/o* and *w/*.

---
## Formatting and organization

### Dates and times

*Source: <https://developers.google.com/style/dates-times>*

#### Express times

- Use the 12-hour clock, unless the UI, a command, or a code sample uses 24-hour time — then
  use 24-hour time throughout the page.
- Use exact times where you can; *noon* and *midnight* are fine.
- Use hyphens in time ranges, with no spaces: *5-10 minutes ago*.
- Capitalize AM and PM and put one space before them: *3:45 PM*. Drop the minutes from round
  hours: *3 PM*.

##### Time zones

Avoid time zones unless they're necessary. When they are:

- Tell the reader if the time is local to them — *10 AM your local time*.
- Match the timestamp format shown in the user interface, if there is one.
- Spell the region out and add the UTC or GMT offset in parentheses: *US and Canadian
  Pacific Standard Time (UTC-8)*. Don't abbreviate the time zone name.
- Where an event's time doesn't shift for daylight saving, name the specific time zone
  without a UTC reference.

#### Express dates

Spell out months and days of the week in full, and give the four-digit year: *January 19,
2017*. With a day of the week, put it first: *Tuesday, April 27, 2021*.

- With month and year only, no comma: *She was hired in January 2017.*
- Abbreviate the month and day to three letters only to save space, as in a heading or
  table — capitalized, no period, and applied to the whole date and consistently throughout
  the document: *Mon, Sep 3, 2018*, not *Mon, September 3, 2018*.
- A full *month day, year* date mid-sentence takes a comma after the year: *The January 19,
  2017, release of ...* A month-and-year date doesn't: *The January 2017 release of ...*

**Why written-out dates.** Numeric dates are read differently around the world: 04/05/09 is
May 4 in the UK, April 5 in the US, and May 9, 2004 elsewhere. If you must use a numeric
format, use ISO 8601 `YYYY-MM-DD` with hyphens — *2017-04-15* — and, in a fictional example,
pick a day greater than 12 so it can't be mistaken for a month. Put the date before the
time: *2017-04-15 at 3 PM*.

#### Divisions of the year

Avoid seasons — spring in the northern hemisphere is autumn in the southern. Use the month,
the quarter, or the temperature.

| Recommended | Not recommended |
| --- | --- |
| During warmer months, data centers face a higher risk of cooling failures. | During summer months ... |
| In November and December, data centers experience higher traffic. | In winter, data centers experience higher traffic. |

### Examples

*Source: <https://developers.google.com/style/format-examples>*

Introduce examples with *such as*, *for example*, or *like*.

- **At the end of a sentence**, set the example off with a comma, parentheses, or an em
  dash — not a semicolon: *Choose a strong encryption algorithm, such as AES-256*; *You can
  monitor various metrics—for example, CPU utilization, storage capacity, and active
  connections*.
- **In the middle of a sentence**, keep it short and set it off: *Enter a six-digit hex
  number (for example, `228B22`), and then click **OK***.
- **For a longer example**, use a separate sentence: *You can assign tags to your VM
  instances to categorize them. For example, you could tag instances by environment with
  `env:prod`.*

### Figures and other images

*Source: <https://developers.google.com/style/images>*

Use images only where they explain something that words struggle with. Be discreet with
screenshots: capture only the UI that matters to the discussion.

#### Create and save images

- Don't use images of text, code samples, or terminal output — use actual text.
- Prefer SVG for diagrams, since it stays sharp when zoomed; otherwise PNG. Don't use a
  transparent background. For animation, use a resource-efficient format such as MP4, not
  animated GIF.
- Be consistent across a document set in which operating system you screenshot and in how
  the screenshots look.
- Crop screenshots to the relevant information: it focuses the reader and survives unrelated
  UI changes better.
- Don't include personally identifying information. Cover it with a solid 100%-opacity
  overlay — blurs and mosaics can be reversed — and flatten layered exports such as PDF or
  TIFF.
- Don't use image maps; they're bad for accessibility, inconsistent across browsers, and
  costly to maintain. Provide a list of text references after the image instead.
- Use descriptive [filenames](#filenames).

#### Text associated with images

Introduce most images with a complete sentence, ending in a colon if the image follows
immediately and a period if other material intervenes. Screenshots that directly follow
procedural text describing the UI need no introduction. Three kinds of text can accompany an
image: alt text, a figure caption, and a figure description.

##### Alt text

Alt text is a concise description that can replace the image for people using screen readers
or text-only browsers, or on a slow connection. It should account for the image's context,
not just its content, and it supports navigability, markup validation, and search.

If an image is decorative, or only illustrates something the text already says, use empty
alt text (`alt=""`) so assistive technology skips it — a screenshot of fields being filled
in, a UI icon, or an image that's there for visual appeal. The `alt` attribute itself is
always required: without it, screen readers may read the filename aloud. The test from the
HTML specification is that replacing every image with its alt text shouldn't change the
meaning of the page.

- Don't write *Image of* or *Photo of*.
- Include punctuation — screen readers pause at it.
- Use consistent alt text for repeated instances of an image.
- Avoid all-caps; some screen readers spell capitals out.
- Introduce diagrams in the text, not in the alt text, and don't let a caption stand in for
  alt text.
- Use a full sentence or a noun phrase, in 155 characters or fewer: `alt="Architecture of an
  app that's built with Apps Script."` If the image carries more than that, summarize in
  `alt` and describe it fully in the text.

##### Figure captions

A figure caption is a concise, comprehensive summary of the image. Captions and figure
numbers are both optional, but a `figcaption` must be wrapped with the `img` in a `figure`
element to be associated with it.

- If you use figure numbers, write "**Figure NUMBER.** DESCRIPTION."
- Use complete sentences and end punctuation.
- Refer to a figure by number — *as shown in figure 1* — never by position (*the image
  above*). Lowercase *figure* except at the start of a sentence. If you can't use numbers,
  show the figure again.
- Don't repeat the caption in the sentence that references the figure.

##### Figure descriptions

A figure description explains in text what the figure conveys, so that no new information
exists only in the image. Use one where the caption can't carry the figure's full purpose,
and punctuate it normally.

##### Text in figures

Avoid embedding explanatory text in graphics: it hurts accessibility and searchability and
raises localization costs. Where you must, also provide the same information as a figure
description, and:

- Keep the text brief, avoiding complete sentences and punctuation.
- Don't embed captions or descriptions in the image; put them in the text after it.
- Don't invent abbreviations to save space, and use full trademarked product names.
- Use sentence case, and use numbered callouts to structure a figure description rather than
  for detailed annotation.

#### High-resolution images

Provide a high-resolution asset with the `img` element's `srcset` attribute alongside `src`.
`srcset` takes a comma-separated list of URLs with resolution qualifiers (`1x`, `2x`); a
browser that supports it picks the right one and ignores `src`, so list every resolution
there.

```
<img src="/assets/images/skateboard.png"
  srcset="/assets/images/skateboard.png 1x,
  /assets/images/skateboard_2x.png 2x"
  width="375" alt="" />
```

- Set `width` to the CSS pixel size; don't state the height — it's calculated.
- Point `src` at the standard-resolution image, not the `2x` one, so low-resolution devices
  on older browsers don't download an oversized graphic.
- Name the double-resolution file `BASENAME_2x.EXTENSION` for human readers; the browser
  reads the `2x` qualifier, not the name.
- The `2x` image must be exactly twice the width and height, give or take a pixel. Never
  scale a `1x` image up to make it — if that's all you have, use it alone.

#### Layout of images on a page

- Don't position images manually with `style` attributes or workarounds; use your site's
  standard CSS image styles, and don't center the image.
- Don't make an image too small — full column width is fine — but don't exceed the column
  width either, and consider how it will print.
- Don't link to a figure from within the same page, unless the page is very long.
- Don't put an `img` element inside a `p` element.

### Footnotes

*Source: <https://developers.google.com/style/footnotes>*

Avoid footnotes: they aren't accessible and they complicate localization. Use a
[cross-reference](#cross-references-and-linking), a [note](#notes-and-other-notices), or a
[parenthetical](#parentheses) instead. If a footnote is genuinely the only option, use a
superscript number (`<sup>1</sup>`).

### Headings and titles

*Source: <https://developers.google.com/style/headings>*

Use sentence case, and make headings and titles descriptive and unique — readers navigate by
them.

#### Heading and title text

Write a document title from the document's primary purpose: if it's mostly a tutorial with
a conceptual introduction, the title is task-based.

| Guidance | Recommended | Not recommended |
| --- | --- | --- |
| For a task-based heading, start with a bare infinitive (base-form verb), as in quickstarts, how-tos, and tutorials. | Create an instance | Creating an instance |
| For a conceptual heading, use a noun phrase that doesn't start with an *-ing* verb. | Migration to Google Cloud | Migrating to Google Cloud |
| If a section applies only to some users or scenarios, prefix the heading with *Optional:*. | Optional: Customize your alias | Customize your alias (optional) |

- **Title phrasing.** Use one unique level-1 heading per page, and don't repeat the page
  title exactly in a heading on that page. A page titled *Create and start VM instances*
  might have the sections *Create a VM* and *Start a VM*.
- **Mixed styles.** Task-based and conceptual headings can coexist in one document; use
  whichever suits each section.
- **-ing verb forms.** Avoid them as the first word — *Transfer data sets*, not
  *Transferring data sets*. They translate inconsistently and lengthen headings. Gerunds
  are fine where there's no alternative (*Billing*, *Pricing*) and later in a heading
  (*Introduction to BigQuery monitoring*).

### Italics with terms

*Source: <https://developers.google.com/style/italics-terms>*

Italicize a new term on first mention when you define it immediately — *A **Clos network**
is a kind of multistage circuit switching network* — and italicize a word, phrase, or letter
referred to as itself: *Don't use **&** as a conjunction. Use the word **and** instead.* In
neither case use bold or quotation marks.

### Lists

*Source: <https://developers.google.com/style/lists>*

Don't use a list for a single item; use some other formatting to set it off. For choosing
between a list and a table, see [Tables](#tables).

#### Types of lists

| List type | Used for | HTML |
| --- | --- | --- |
| Numbered | Items whose sequence matters — ordered steps, phases, priorities. Nested sequential lists use lowercase letters, then lowercase Roman numerals. | `ol`, `li` |
| Bulleted | Items that aren't a sequence, such as nonsequential options or examples. Make clear whether every item is required. | `ul`, `li` |
| Description | Terms each with a definition or explanation — a glossary, for instance — where you want to draw attention to the terms. | `dl`, `dt`, `dd` |
| Description with run-in headings | Introductory terms or phrases each followed by an explanation, to highlight several concepts or save space. | `ul`, `li` |

A list item can contain more than one paragraph; use `p` elements rather than `br`.

#### Introductory sentences for lists

Precede a list with an introductory sentence giving context, ending in a colon if the list
follows immediately and a period if other material intervenes. A list needs no introduction
if the heading right above it supplies the context.

Introduce a list with a *complete* sentence, not a fragment the items finish. *The
following* works as a noun phrase.

| Recommended | Not recommended |
| --- | --- |
| Use the **Submit** button for any of the following purposes: | Use the **Submit** button to: |
| To get the USB driver, follow these steps: | To get the USB driver: |
| If you need to add an instance manually, do the following: | If you need to add an instance manually: |

#### Unusual list numbering

For reverse order, use `ol` with the `reversed` attribute. The `value` attribute can set a
number manually, but manual numbering usually turns into maintenance when items change.

#### Parallel syntax, capitalization, and end punctuation

Use the same structure for every item in a list.

**Numbered, lettered, and bulleted lists.** Start each item with a capital letter, unless
case carries meaning (as in glossary terms). End each item with a period or other
sentence-ending punctuation, except when the item is a single word, has no verb, is entirely
in code font, or is entirely link text or a document title. If the punctuation ends up
inconsistent, either rewrite for parallel construction or punctuate every item.

- *The following words are adjectives:* Big / Small / Gratuitous — no end punctuation.
- *You can do any of the following by using the API:* Create an item. / Replace one item
  with another. — full sentences, so periods.

**Description lists.** Rather than adding an explanatory phrase to just one item in a
bulleted list, use a description list and explain every item. Capitalize each term, don't
end the term with a period, and generally end each description with one.

**Run-in headings.** Capitalize the heading and end it with a period or a colon, applied
consistently within the list; whether the punctuation is bold is a judgment call. After a
period, start the description with a capital and end it with a period. After a colon, start
lowercase, and end with a period only if the description contains a verb or expresses a
standalone thought:

- **Coffee**: latte, mocha, cappuccino, espresso, macchiato
- **It increases fuel economy by reducing baggage weight**. By charging astronomical prices
  for anything larger than a wallet ...

Don't use a dash to separate an item from its description.

#### Comma-separated lists

In a list written into a paragraph, use [serial commas](#commas). Don't end with *etc.* or
*and so on*; introduce the list so it's clear that it isn't exhaustive: *The service
processes data like event logs, clickstream data, and e-commerce transactions.*

### Mathematical notation

*Source: <https://developers.google.com/style/mathematical-notation>*

#### Use HTML entities for mathematical symbols

Use HTML entities rather than keyboard symbols, except for `+`, `/`, and `=`, which use their
keyboard equivalents.

| Symbol | Markup | Symbol | Markup |
| --- | --- | --- | --- |
| − minus | `&minus;` | ≤ ≥ | `&le;` `&ge;` |
| × times | `&times;` | ≡ ≢ | `&equiv;` `&nequiv;` |
| ≠ | `&ne;` | ≈ ≉ | `&asymp;` `&nap;` |
| ± ∓ | `&plusmn;` `&mnplus;` | ≅ | `&cong;` |
| < > | `&lt;` `&gt;` | √ ∑ | `&radic;` `&sum;` |

For multiplication you can also use the dot operator (`&#8729;`) or asterisk operator
(`&#42;`) to match a UI, but never a plain asterisk in text — and you can omit the symbol
entirely where that's unambiguous, writing *ab* for *a* × *b*.

#### Format mathematical notation

- **Operators.** Use entities, not keyboard symbols — `&minus;`, not a hyphen. Put a
  nonbreaking space on both sides of an operator, and don't italicize operators. To render
  *a* − *b*: `<i>a</i>&nbsp;&minus;&nbsp;<i>b</i>` in HTML,
  `_a_&nbsp;&minus;&nbsp;_b_` in Markdown.
- **Variables.** Italicize them.
- **Expressions and equations.** Keep short ones inline, joined with nonbreaking spaces so
  they don't wrap. Put an expression on its own line if it forces an awkward break.
- **Fractions.** Prefer decimals. As words, hyphenate numerator and denominator unless one
  already contains a hyphen: *one and one-half*, *three-sevenths*, *three seventy-fourths*.
- **Exponents and subscripts.** Use `<sup>` and `<sub>` with no space before them; never the
  caret (`2^3`).

#### Notation as words

Notation can replace words in running text — *Check whether a > b* — unless doing so makes
the sentence ambiguous or ungrammatical, in which case use words: *The area is calculated by
multiplying the length by the width*, not *by multiplying l × w*.

For complex or multiline equations, consider a [diagram or image](#figures-and-other-images)
or a dedicated math rendering tool.

### Notes and other notices

*Source: <https://developers.google.com/style/notices>*

A notice offsets information that isn't part of the flow of the text — but readers skip
elements outside their focus, notices included. If you're unsure, write the information as
regular text first and then decide. Don't use many notices on one page: they lose their
distinctiveness, especially two or more in a row. If you find yourself nesting or stacking
them, reorganize the content instead.

#### Pick a notice type

- **Note** — an ordinary aside or tip; useful but not critical.
- **Caution** — proceed carefully: *We don't recommend using a broad `0.0.0.0/0` range.*
- **Warning** — stronger than a caution: don't do this, or the step is irreversible. Ignoring
  it can cost money, work, or security.
- **Success** — a successful action or error-free status. Only in interactive or dynamic
  content, never in static pages.

#### When to use a *note*

Use one when all of these hold: the information is relevant but not necessary — the reader
succeeds without it; the interruption isn't an obstacle, so it isn't pointing down a
different path; and it isn't part of the flow of your writing.

Don't use a note for a [cross-reference](#cross-references-and-linking), for prerequisites
or earlier steps (that information belongs before the step), for a full procedural step, for
anything the reader needs in order to succeed, or for something that simply continues the
preceding text.

In HTML, where your site doesn't specify otherwise:
`<aside class="note"><b>Note:</b> All VPC networks include firewall rules.</aside>`

### Numbers

*Source: <https://developers.google.com/style/numbers>*

#### Words or numerals

Spell out ordinals in text: *first*, *fifth*, *forty-third* — not *1st*, *5th*, *43rd*.

Spell out:

- numbers zero through nine: *four options*, *five minutes*;
- a number that starts a sentence (*Fifteen directories are created*) — though rearranging
  the sentence is often better; a four-digit year may start a sentence;
- a number followed by a numeral: *fifteen 100,000-byte files* (but *15 of the 100,000-byte
  files*);
- indefinite or casual numbers: *thousands of combinations*, *a million songs*.

Use numerals for 10 and greater — *24 hours*, *728 shipments* — and, even below 10, for:

- version numbers (*version 3*);
- technical quantities such as memory, disk space, queries, or usage limits (*6 queries per
  second*, *128 bits*);
- page, chapter, section, and step numbers;
- prices, and numbers without units such as those in mathematical expressions;
- numbers under 10 appearing alongside numbers over nine: *The menu contains 15 options but
  6 of them are deselected.*

Also use numerals for negative numbers, most fractions, percentages, dimensions,
measurements (*8 pixels*), ranges, and any number with a decimal point. Treat decimals as
plural even at or below 1.0 (*1.0 inches*) and put a zero before the point (*0.3 inches*).
Avoid Roman numerals except for sub-steps in numbered procedures.

Where a number and its noun must stay on one line, join them with a nonbreaking space.

#### Fractions, percentages, and ranges

- Express fractions as decimals where possible (*0.75*). As words, hyphenate numerator and
  denominator unless one is already hyphenated: *two-fifths*, *five sixty-fourths*.
- Use numerals and `%` with no space: *40%*. If a percentage starts a sentence, spell both
  out: *Forty percent of the files*.
- Use a hyphen with no spaces for a range — *2012-2016* — never an en dash.
- Use [suspended hyphens](#hyphens) for compounds sharing a base: *one-, two-, or three-hour
  intervals*.

#### Currency, commas, and dimensions

Make clear which country's currency you mean (see
[Units of measurement](#units-of-measurement)). For US dollars, use a comma for thousands, a
period before fractions of currency, a leading `$`, and no punctuation or spaces to the
right of the decimal: *$0.006653 per vCPU hour*, *$10,000 in fees*.

Follow standard American number formatting: commas separating groups of three digits in
numbers of four or more digits — *1,532,784 bytes*, *2,000 vertices* — a period for the
decimal point, and no separators to the right of it.

Use numerals and a lowercase *x* with no spaces for dimensions: *192x192*.

Where you can, give a numerical concept a real-world implication — for example, link to a
pricing calculator when a feature incurs fees.

### Paragraphs

*Source: <https://developers.google.com/style/paragraph-structure>*

Break paragraphs up so the page can be scanned. Each paragraph should address a single idea
in as few words and sentences as possible — and don't lengthen sentences to reduce the
number of them.

A paragraph over five or six sentences usually carries too much; split it or cut content.
But don't split a paragraph that holds a single idea: a one-sentence paragraph is fine, and
so is a longer one that stays on one idea.

Put the most important information first — readers don't read every word. Left-align text;
don't center, full-justify, or right-align it, and don't force line breaks inside sentences
and paragraphs.

### Phone numbers

*Source: <https://developers.google.com/style/phone-numbers>*

Never use a real phone number in an example. Use a US number in the reserved range
800-555-0100 through 800-555-0199.

- Use a nonbreaking hyphen (`&#8209;`) between the parts so the number doesn't wrap:
  `415&#8209;555&#8209;0132`.
- Format a real NANP number as area code, exchange code, four-digit number:
  *415‑555‑0132*.
- For other countries, include the country and area codes with a plus sign immediately
  before the country code, standing in for the exit code: *+1‑415‑555‑0132*.
- For an extension, follow the number with the word *extension*: *415‑555‑0132, extension
  987*.

### Procedures

*Source: <https://developers.google.com/style/procedures>*

A procedure is a sequence of numbered steps for accomplishing a task.

#### Introductory sentences

Introduce a procedure with a sentence that adds context the heading doesn't already give —
if the heading says it all, skip the introduction. End with a colon if the procedure follows
immediately, a period if other material intervenes. An imperative statement works; a
sentence fragment completed by the steps doesn't.

- Recommended: *To customize the buttons, follow these steps:* / *Customize the buttons:* /
  *To customize the buttons, do the following:*
- Not recommended: *To customize the buttons:*

#### Structure of steps

- **Single-step procedures.** Write the step as one sentence and format it as a bulleted
  list item, not a numbered list of one.
- **Sub-steps.** Label sub-steps with lowercase letters and sub-sub-steps with lowercase
  Roman numerals. Treat a step that has sub-steps like an introductory sentence, ending it
  with a colon or period.
- **Order within a step.** Describe the action; give the command; explain any
  [placeholders](#placeholder-formatting); explain the command further if needed; show the
  output; then, in a separate paragraph, give the result.
- **Multi-action steps.** Use one step per action, but combine sequential menu selections
  with angle brackets: *Click **File > New > Document***. Split steps that feel too long.

#### Choosing and reusing procedures

Where a task can be done several ways, document one procedure that works for every reader.
Prefer one that can be completed with a keyboard alone, that is shortest, and that uses a
language most of your audience knows. If you must document several, separate them into
different pages, headings, or tabs.

Don't repeat a procedure — reference and link to it: *Create a user as you did in the
previous step.*

#### Optional steps, context, goals, and results

- Start an optional step with *Optional:* — not *(Optional)*.
- State where the action happens before the action itself: *In Google Docs, click **File >
  New > Document***, not *Click **File > New > Document** in Google Docs*. Restate the
  context in each procedure when a task spans several headings.
- State the goal before the action: *To start a new document, click **File > New >
  Document***. Where the "To ..." form might make a required step look optional, use a colon
  instead: *Start a new document: click **File > New > Document***.
- State an action before its result, keeping both in the same paragraph: *Click **Run**. The
  query results appear after the query runs.* Where the result is just the next step's
  context, fold it into that step rather than stating it twice. A justification goes after
  the action too: *Store the private key in a secure location. You need it later.*

#### Summary of guidelines

| Guidance | Recommended | Not recommended |
| --- | --- | --- |
| Start each step with an imperative verb, in a complete sentence. | Clone the repository that contains the sample data. | You need the project ID later. Retrieve the project ID. |
| Use parallel structure and a consistent verb form. | Download the service account key. Click **More**, and then click **Download**. | Download the key by clicking **More** and then clicking **Download** file. |
| Don't use directional language; if an element is hard to find, provide a screenshot. | Click **Menu**. In the preceding diagram, ... | Click the button with three lines. In the diagram below, ... |
| Don't use *please*. | To open a document, click **File > Open**. | To open a document, please click **File > Open**. |
| Don't introduce code with *run the following command*; say what the command does. | In Cloud Shell, deploy the load generator: | Run the following command: |
| Fold a required **Enter** into the step. | Click the search box, type `custom function`, and then press **Enter**. | 1. Click the search box and type `custom function`. 2. Press **Enter**. |
| Don't include keyboard shortcuts. | Copy the command, and then paste it ... | Press Ctrl+C, and then press Ctrl+V ... |

Give the reader what they need to prepare for the task in advance, use as few steps as
possible, limit interruptions, and keep each instruction to one reader decision in its own
list item. Where there's more than one way to do something, give only the best way.

### Tables

*Source: <https://developers.google.com/style/tables>*

#### List or table?

| Item type | Example | How to present |
| --- | --- | --- |
| Each item is a single unit. | Programming language names; steps to follow. | A numbered, lettered, or bulleted [list](#lists). |
| Each item is a pair of related data. | Term and definition pairs. | A description list, or in some contexts a table. |
| Each item is three or more pieces of related data. | Parameters with a name, type, and description. | A table. |

Don't use tables to lay out a page, to hold code snippets, or to split a long
one-dimensional list into columns — tables are for genuinely two-dimensional data. Turn a
single-column table into a list, reconsider a single-row table (though reference
documentation sometimes wants one for consistency), and avoid tables inside a numbered
procedure.

#### Introducing and placing tables

Introduce a table with a complete sentence describing its purpose — not every screen reader
announces tables — ending in a colon if the table follows immediately and a period
otherwise. Refer to the table's position with *the following table* or *the preceding
table*, and don't put a table in the middle of a sentence. Avoid footnotes; if you must use
them, put them immediately after the table.

#### Captions

A document with one table needs no caption; just place the table next to the text that
refers to it. With several tables close together, caption each using a `caption` element as
the `table`'s first child, in the form "**Table NUMBER.** DESCRIPTION" — sentence case, no
final period. Refer to a table by number (*as shown in table 2*), lowercase except at the
start of a sentence.

#### Formatting and column heads

- Don't style the `table` element, and don't let font, color, or background alone signal a
  header — mark headers up with `th`.
- Don't merge cells (`colspan`, `rowspan`).
- Sort rows logically, or alphabetically if there's no logical order.
- Split a long or complex table — one with multiple header rows or columns — into several.
- Never present new information through an image or symbol alone; give it descriptive alt
  text.
- Write concise column heads in sentence case with no end punctuation, use `th` for the
  first row and column only, and add the `scope` attribute for accessibility.
- Use table CSS that adapts to different viewport sizes, and refer to tables by number
  rather than linking to them.

### Units of measurement

*Source: <https://developers.google.com/style/units-of-measurement>*

#### Spaces

Put a nonbreaking space between a number and its unit: `64&nbsp;GB`, `25&nbsp;mm` — not
*64GB* and not a plain space.

Exceptions: money, percent, and degrees of an angle take no space — *$10*, *£25*, *65%*,
*180°*. Temperature takes a nonbreaking space before the degree symbol but none between the
symbol and the scale (`50&nbsp;&deg;C`); Kelvin drops the degree symbol but keeps the space
(`300&nbsp;K`).

Don't hyphenate a number and an abbreviated unit modifying a noun unless clarity demands it:
`200&nbsp;GB disk`. Spelled-out units do take a hyphen — *a 128-bit system*.

#### Ranges, multiplied units, and thousands

- Repeat the unit for each number in a range, and join them with *to* rather than a hyphen,
  which can read as a minus sign: *-40 °C to 85 °C*.
- Hyphenate the components of a multiplied unit: *5 vCPU-hours*, *40 person-hours*.
- To indicate thousands with a lowercase *k*, use no space and add a noun so *k* isn't read
  as *kilobytes*: *55k download operations per day*.

#### Currency, rates, and byte units

Make the currency unambiguous — *$* alone could be US, Canadian, or several others — with an
indicator before the amount: *US$10*.

Use *per* rather than a division slash where space permits (*requests per day*, not
*requests/day*), and shorten *per* to *p* only in well-established rate abbreviations such
as *Gbps* and *MBps* (not *Gb/s*).

Measure bytes in the same system as the technology you're documenting. Don't write *MB* when
you mean *MiB*.

| Decimal units | Binary units |
| --- | --- |
| kB (kilobyte, 1000 bytes) | KiB (kibibyte, 1024 bytes) |
| MB (megabyte, 1000² bytes) | MiB (mebibyte, 1024² bytes) |
| GB (gigabyte, 1000³ bytes) | GiB (gibibyte, 1024³ bytes) |

---
## Linking

### Cross-references and linking

*Source: <https://developers.google.com/style/cross-references>*

A cross-reference links to nonessential information that adds to the reader's understanding.
Used well it helps navigation; used carelessly it disrupts.

#### Choose links selectively

Every link is a decision for the reader and a chance for them to lose their place, so
include few and choose the most relevant destination.

- **Provide context on the page** instead of linking, where you only need to define a term,
  explain a concept briefly, or give a couple of steps. Link when the reader needs another
  product's software or standards in depth — don't try to document someone else's standards.
- **Avoid duplicate links** to the same destination on one page. A second link is fine when
  it targets a specific section, when the page is very long and the links are far apart, or
  when the page has several entry points, such as a procedure section and a troubleshooting
  section.
- **Link to the most relevant page**, and to the most relevant heading on it.

#### Write descriptive link text

Use short, unique, descriptive phrases that give context for the destination. Screen reader
users often jump from link to link without the words between, and sighted readers scan for
links, so link text must work out of context. Sometimes you have to rework the sentence to
produce good link text.

Two options work: the exact page title, or a descriptive phrase capitalized as part of the
sentence. With a descriptive phrase, put the important words first, keep it short, and don't
reuse the same text for different targets in one document.

- Recommended: You can use Cloud Scheduler and Cloud Functions to manage [task scheduling on
  Compute Engine](https://cloud.google.com/blog/products/gcp/reliable-task-scheduling-on-google-compute-engine).
- Not recommended: See [this blog post](https://www.blog.google/products/pixel/pixel-4/).

**Avoid vague link text** such as *this document*, *this article*, or *click here* — the
text must make sense without the surrounding sentence.

**Avoid URLs as link text**; use the page title or a description instead. (Some legal
documents, such as Terms of Service, are an exception.)

**Include abbreviations** in the link text: [Google Kubernetes Engine
(GKE)](https://cloud.google.com/kubernetes-engine/docs), not *Google Kubernetes Engine*
followed by *(GKE)* outside the link.

**Link to commands** with the code element's description inside the link text, unless that's
awkward: *run the `gcloud instances create` command with the [`--hostname`
flag](https://cloud.google.com/compute/docs/instances/custom-hostname-vm#gcloud)*, not with
the flag's name linked and the word *flag* left outside.

#### Write link introductions

When a cross-reference gets its own sentence, introduce it consistently with "For more
information, see ..." or "For more information about ..., see ...". Use *about*, never *on*,
and use *see* for links and cross-references.

Add the "about ..." clause whenever the link text and its context don't make clear why the
reader is being sent there. Make the explanation specific without repeating the link text.

#### Explain unexpected link behavior

- **Downloads and email.** Say so in the link text and name the file type: *[download the
  security features PDF](https://www.example.com/security.pdf)*.
- **Same-page links.** Tell the reader, with a standard phrase: *see the Write descriptive
  link text section of this document*.
- **Sections on another page.** Word and format them like any cross-reference; if the
  section title matches one on the source page, add context naming the destination document.
- **New tabs.** Don't force a link to open in a new tab or window — let the reader decide.
  In the rare case where it's necessary, say so in the link text: *Accessible content (opens
  in a new tab)*.

### Headings as link targets

*Source: <https://developers.google.com/style/headings-targets>*

Many content management systems generate anchors from headings automatically. Add a custom
anchor when you want a shorter one, when the content is likely to be linked to often, or
when you're about to revise the heading — an automatic anchor changes with the heading text
and breaks existing links.

In HTML, wrap the heading in a `section` element with an `id`, or use an `a` element with a
`name`. Use lowercase anchor text with hyphens between words.

```
<section id="introduction-to-everything">
<h2>Introduction to everything</h2>
</section>
```

**Revising a heading.** Keep the old ID string as a custom anchor so existing links still
work — find it by inspecting the published page. In Markdown:

```
## Introduction to everything {: #introduction-to-some-things }
```

Don't change an existing custom anchor unless it contains a term you need to remove, such as
a disrespectful one. If you must change one, update the links that use the old anchor;
inbound links still reach the page, but not the section.

---
## Computer interfaces

### API reference code comments

*Source: <https://developers.google.com/style/api-reference-comments>*

Provide a complete API reference, typically generated from document comments in the source.
Adapt this guidance to the language, and see also
[AIP-192: Documentation](https://google.aip.dev/192).

#### Documentation basics

The reference **must** describe every class, interface, struct, and similar member; every
constant, field, enum, and typedef; and every method, including each parameter, the return
value, and any exceptions thrown.

Strongly recommended, where they make sense for the API and language:

- Put a code sample of roughly 5-20 lines at the top of each class or interface page.
- Put all API names, classes, methods, constants, and parameters in code font, linked to
  their reference pages; most generators do this automatically.
- Put string literals in code font inside double quotation marks.
- Spell class names exactly as in the code — `ActionBar`. Don't pluralize a class name; add
  a noun instead (`Intent` objects). If the class name is also a common word, you can use
  the ordinary English word in lowercase, not in code font (activities, action bar).

#### Classes, interfaces, structs

The first sentence states the class's purpose with information that can't be deduced from
its name and signature; later sentences cover how to instantiate it, its key features, and
any pitfalls. Generators often extract that first sentence for class lists, so make it
short, unique, and descriptive — don't repeat the class name, don't write "this class
does ...," and don't use an early period (write *for example*, not *e.g.*, which some
generators read as the end of the sentence).

#### Members and methods

Keep member (constant and field) descriptions as brief as possible, and link to the methods
that use them.

A method's first sentence states what the method does; later sentences explain why and how
to use it, prerequisites, exceptions, and related APIs. Document dependencies — permissions,
for instance — and what happens without them. Use present tense: *Adds a new bird to the
ornithology list.*

- An operation that returns data: start with the verb — *Adds a new bird ... and returns the
  ID of the new entry.*
- A boolean getter: *Checks whether ...*. Any other getter: *Gets the ...*.
- No return value: *Sets the ...*, *Updates the ...*, *Deletes the ...*, *Registers ...*;
  for a callback, *Called by ...*, then *Subclasses implement this method to ...*.
- A convenience constructor: *Creates a ...*.

**Parameters.** Capitalize the first word and end with a period. Start non-boolean
descriptions with *The* or *A*. For a boolean that tells the API to do something, state both
outcomes: *If true, validates the SSL certificate before proceeding. If false, trusts the
certificate without validating it.* For a boolean that reports an existing state, use *True
if ...; false otherwise.* Don't put *true* and *false* in code font or quotation marks
there. Where a parameter has a default, explain the behavior for each value and then give
the default with *Default:*.

**Return values.** Keep them brief; detail belongs in the class description. *The bird
specified by the given ID*, or *True if the bird is in the sanctuary; false otherwise.*

**Exceptions.** Where the generator inserts "Throws," begin with *If no key is assigned.*
Otherwise begin *Thrown when no key is assigned.*

**Deprecations.** Say what to use instead, in the first sentence — only that sentence
appears in summaries and indexes — and give the version it was deprecated in if you track
those. Later sentences can explain why: *Deprecated. Use #CameraPose instead.*

### Code in text

*Source: <https://developers.google.com/style/code-in-text>*

In ordinary sentences, put most things related to code in code font: it signals that the
text is to be entered verbatim, shows where it begins and ends, and separates it from the
surrounding words. Use the `code` element in HTML, backticks in Markdown.

#### Items to put in code font

Attribute names and values; class names; command output; command-line utility names
(`gcloud`, `kubectl`); data types; database elements such as row and column names; defined
constant values; DNS record types; HTML and XML element names (without angle brackets); enum
names; environment variable names; filenames, extensions, and paths; folders and
directories; HTTP content-type values, status codes, and verbs; IAM role names; IP
addresses; language keywords; method and function names; namespace aliases; package names;
port numbers; [placeholder variables](#placeholder-formatting); query parameter names and
values; strings such as URLs and domain names used in code; text the reader is to enter; and
UI elements rendered from previously entered text.

Don't put quotation marks around code unless they're part of the code.

#### Items to put in ordinary font

Domain names in prose; names of products, services, and organizations; and URLs the reader
is meant to follow in a browser — though a URL is usually better as a link with descriptive
text.

#### Items that are sometimes in code font

- **Boolean values.** Code font for the literal value (*If the update succeeds, returns
  `true`*), ordinary font for the evaluation of a condition (*If true, validates the SSL
  certificate*).
- **Command-line utility names.** Code font for the command, ordinary font for the project
  or product: *Invoke the GCC 8.3 compiler using `gcc`*; *The options for the `curl` command
  are explained on the curl project website.*
- **Email addresses.** Code font as computer input or output (*enter `alex`, not
  `alex@example.com`*), ordinary font and a link as a way to contact someone.

#### Code in UI elements

If a [UI element](#ui-elements-and-interaction) also meets the requirements for code font,
use both bold and code font: *In the **Network** list, select **`my-net-2`**.*

#### Method names, status codes, and grammar

Omit the class name when referring to a method, unless it prevents ambiguity: *call its
`get` method*, not *its `animal.get` method*.

Write an HTTP status code as *an HTTP `400 Bad Request` status code* — call it a *status
code*, not a response or error code, and put the number and name in code font. For a range,
write *an HTTP `2xx` status code*, using *Nxx* for the N00-N99 range, or give the explicit
range with both numbers in code font.

Don't use a code element as an English verb or noun, and don't inflect one. Add a noun and
inflect that instead:

| Recommended | Not recommended |
| --- | --- |
| The `ADDRESS` constant's value is defined in the `settings.h` file. | `ADDRESS`'s value is defined in `settings.h`. |
| To add the data, send a `POST` request. | `POST` the data. |
| You can't call the `close` method for a file before you call `open`. | `Close`ing the file requires you to have `open`ed it first. |

#### Linking API terms in Android

In generated reference documentation, link the first instance of each Android API element —
class, method, constant, XML attribute — in code font with a plain `a` element; use code
font without a link for later mentions in the same section. Link manifest elements and
attributes to the API guide pages, and a widget or layout attribute to its Javadoc entry.

Very common classes such as `Activity` and `Intent` don't need linking every time. Where you
use a term as a concept rather than a class — activity, service, fragment, view, loader,
action bar, intent, content provider, broadcast receiver, app widget — use lowercase and no
code font. When you mean an actual instance, use the formal class name and link it: *The
user interface for an activity is provided by a hierarchy of views—objects derived from the
`View` class.*

### Code samples

*Source: <https://developers.google.com/style/code-samples>*

- Follow the indentation rules of the relevant
  [code style guide](https://google.github.io/styleguide/) — usually spaces, not tabs, and
  two per level, though some contexts use four or use tabs.
- Wrap lines at 80 characters, or fewer for narrow windows or printing.
- Mark code blocks as preformatted text: `pre` in HTML, four-space indentation in Markdown.
- Indicate omitted code with a comment in the sample's own language — never three dots or an
  ellipsis character — and don't make a block with an omission click-to-copy.

Precede a sample with an introductory sentence or paragraph, ending in a colon if the sample
follows immediately and a period if other material intervenes or the last sentence isn't
directly about the sample.

- Recommended: *The following code sample shows how to use the `get` method. For information
  about other methods, see [link].* [sample]
- Also recommended: *The following code sample shows how to use the `get` method:* [sample]
  *For information about other methods, see [link].*

### Command-line syntax

*Source: <https://developers.google.com/style/code-syntax>*

#### Best practices

- Link inline to the command reference, usually from the text that introduces the command.
- Work out the arguments actually needed for the task and use as few optional ones as
  possible; the reference carries the full list.
- Give a click-to-copy example the reader doesn't have to edit. Square brackets, pipes,
  braces, and ellipses break a pasted command, so keep them out of click-to-copy examples.

#### Format a command

Use `pre` in HTML or a code fence in Markdown.

- Beyond 80 characters, break before a hyphen, double hyphen, underscore, or quotation mark,
  and indent continuation lines by four spaces.
- Every line but the last must end with the continuation character: ` \` on Linux and Cloud
  Shell, ` ^` on Windows. Without it the command fails.
- Format placeholders as [placeholders](#placeholder-formatting), and follow the command
  with a description of each one.
- Use end punctuation for option descriptions that are complete sentences, not for single
  words or noun phrases — unless the list mixes both.

#### Command prompt

Start each line of a multi-line input block with the prompt symbol; consider CSS that stops
the symbol being copied. Don't show the current directory path before the prompt, even when
the instructions change directories — but do add a prompt indicator when the context changes,
such as from a local to a remote machine.

The `$` prompt is optional for a one-line command; if a document has both one-line and
multi-line commands, use it consistently throughout. Put input and output in separate code
blocks.

#### Arguments

- **Optional arguments** go in square brackets, each in its own pair:
  `gcloud dns GROUP [GLOBAL_FLAG] [FILENAME]`.
- **Mutually exclusive arguments** go in braces, separated by pipes: `{FILE_1|FILE_2}`. The
  reader chooses exactly one.
- **Repeatable arguments** take three dots with no spaces: `[GLOBAL_FLAG ...]`.

Since those characters break pasted commands, keep them out of click-to-copy examples by
removing the optional arguments and linking to the reference; by giving a separate code
block per option; by documenting the options as separate tasks under their own headings; or,
if you must include them, by saying so where you introduce the command.

#### Output from commands

Show output only where it adds value — the reader has to copy a value from it, or verify
one. Introduce it with *The output is similar to the following:* or *The output is the
following:*, customized where you need to call something out. Mark omitted output lines with
three dots on their own line, not an ellipsis character.

#### Command-line terminology

Don't map `gcloud` CLI nomenclature onto Linux nomenclature. Linux commands are complicated;
describing what the whole command does usually beats naming its parts. Ask whether the
reader needs the element's name at all.

In the `gcloud` CLI, the syntax distinguishes a *command* from a *command group*, though
documentation generally calls all of it commands. A *flag* is any element other than the
command or group name, and a command or flag may take an *argument*, such as a region value.
*Option* works as a catchall when the precise term would just get in the way.

Linux commands instead have *options*, *parameters*, and *arguments*: in `find
/usr/src/linux -follow -type f -name '*.[ch]'`, `find` is the command name,
`/usr/src/linux` an argument (a path), `-follow` an option, and `-type f` an option with a
value. The asterisk is a *metacharacter* used for globbing, along with `?` and `^`; `|` is a
*pipe*, and `>`, `<`, `<<`, `>>` are redirection symbols.

**Linux signals** need vocabulary that's discouraged elsewhere. Use these terms only for
process control, and don't substitute softer synonyms:

| Signal | Meaning |
| --- | --- |
| `SIGKILL` | Kills a process; can't be caught, blocked, or ignored. Don't substitute *cancel*, *end*, *exit*, *quit*, *stop*, or *terminate*. |
| `SIGTERM` | Requests that a process terminate, giving it a chance to clean up child processes. |
| `SIGQUIT` | Sent from a keyboard to quit a process; some processes can catch or ignore it. |
| `SIGINT` | Interrupts a process immediately — for example, `Control+C`. Don't substitute *suspend* or *pause*. |
| `SIGPAUSE` | Tells a process to pause, or sleep, until a signal arrives. |
| `SIGSUSPEND` | Temporarily suspends execution, to protect a critical section. |
| `SIGSTOP` | Stops execution for later continuation via `SIGCONT`; can't be caught or ignored. |

### Placeholder formatting

*Source: <https://developers.google.com/style/placeholders>*

A placeholder stands for a value the reader must replace — `PROJECT_ID` — or, in example
output, for a value that simply varies, such as `HTTP_RESPONSE_CODE`.

#### Formatting placeholders

Don't use a single *x* or a run of *x*'s as a placeholder; use an informative name. (Where a
run of *x*'s is the standard, as in HTTP status codes, it's fine.)

- **Inline, in code:** `<code><var>PLACEHOLDER_NAME</var></code>` in HTML; in Markdown,
  backticks wrapped in asterisks — `` *`PLACEHOLDER_NAME`* ``.
- **Inline, not code:** the `var` element alone.
- **In a code block:** a `pre` element with `var`-tagged placeholders in HTML; a code fence
  in Markdown, which can't carry inline formatting.

Write placeholder text in uppercase with underscores — `API_NAME`, `METHOD_NAME` — never
`API-name`, `apiName`, or `api_name`. If uppercase-with-underscores is wrong for your
context, choose something else and be internally consistent. Don't include possessive
adjectives: not `MY_API_NAME` or `YOUR_API_NAME`. Keep brackets, braces, and ellipses
outside the `var` element.

#### Explain placeholders

Explain a placeholder the first time you use it, and again later only if the document is
long, introduces several other placeholders, or isn't read start to finish.

For a single placeholder: *Replace `BUILD_ID` with the ID of the `WORKING` build that you
copied in the preceding step.*

For two or more, follow the command with a list introduced by *Replace the following:*,
ordered as the placeholders appear in the command, each with a colon and a lowercase
description — even when the value seems obvious. Introduce an example within a description
with an em dash or *such as*.

```
bq mk --project_id=ADMIN_PROJECT_ID --location=LOCATION --reservation RESERVATION_NAME
```

Replace the following:

- `ADMIN_PROJECT_ID`: the project that owns the reservation
- `LOCATION`: the location of the reservation
- `RESERVATION_NAME`: the name of the reservation

**In output**, explain placeholders the same way, tagging them with `var` and introducing
the list with *This output includes the following values:*.

### UI elements and interaction

*Source: <https://developers.google.com/style/ui-elements>*

#### Focus on the task

Where practical, say what the reader should accomplish rather than which widget to operate:
*Refresh the page*; *Expand the **Advanced options** section*. It explains the purpose of
the instruction and survives UI changes. But know your audience: sometimes the point of a
procedure is to walk through the page, or the UI isn't obvious — then *Click **Refresh***
is right.

#### Format names of UI elements

Put the name of any UI element in bold — `b` in HTML, `**` in Markdown — for buttons, menus,
dialogs, windows, list items, and anything else with a visible name. Don't use code font
unless the element also meets the [requirements for code font](#code-in-text), in which case
use both.

Don't bold a feature or product name except where it names an element on the page.

- Recommended: In the **New project** window, select the **New activity** checkbox, and then
  click **Next**.
- Not recommended: In the New Project window, select "New Activity", and then click the
  "Next" button.

Give context for an element documented outside a procedure: *... in the **Current jobs**
section of the service console*.

**Capitalization.** Follow the page, but use sentence case when a label is all uppercase
(*Click **Refresh***, not *Click **REFRESH***) or when several labels are inconsistently
cased.

**Grammar.** Don't use a UI element as a verb or noun: *In the **Name** field, enter an
account name*, not ***Name** the account*; *To save the settings, click **Save***, not
***Save** the settings*.

#### Terminology

Focus on the feature and its function, and name the UI element where that adds clarity —
both *Go to **File > Tools*** and *In the **File** menu, click **Tools*** are fine. Never
use slang such as *hamburger icon* or *zippy*.

- **Window** — usually the whole application window, but also a modular element you can open
  and close. **Page** is the term for a web page and for a console's subpages. **Dialog** is
  a smaller window in front of the main one — not a *pop-up window*. **Pane** (or *panel*) is
  a rectangular region within a larger window; don't call it a window, section, area, or
  column. **Section** is a labeled grouping of controls within a window or pane.
- **Menu bar and menus.** Call an item in a menu a *command*, not a choice, menu item, or
  option — except when documenting how to build an interface. Refer to *the **File** menu*,
  and write *In the **File** menu, select **Open***. Don't use *drop-down* as a synonym for
  *menu*.
- **Angle brackets** are an alternative for menu paths. Put a nonbreaking space before each
  bracket, bold the whole sequence rather than each name, and wrap the bracket in a span
  with `aria-label="and then"` so screen readers don't say "greater than." Use this only for
  menu items, never for a mix of different UI elements.
- **Navigation menu** — the control listing pages you can go to. Not *navigation bar*,
  *pane*, *panel*, or *window*.
- **Toolbar** — a set of buttons for common actions; one with a menu is a *menu button*.
  Name the toolbar if the reader might struggle to find the button.
- **Tab** — *the **Edit** tab*. **Text box** — *the **Owner** box*, and *field* rather than
  *box* in Google Cloud and Google Workspace documentation. **List box** — *the **Item**
  list* or *box*, whichever is clearer. **Combo box** — *the **Font** box*, with *type or
  select*. **Spin box** — *the **Font Size** box*, with *enter*.
- **Checkbox** — *the **Bookmarks** checkbox*. Prefer *select* and *clear* to *check* and
  *uncheck*, and describe state as *selected* or *not selected*.
- **Radio button** — use its label, or the group's label: *For **Startup mode**, select an
  option.*
- **Expander arrow** — avoid referring to it where you can; when you must, say *expander
  arrow* and *expandable section*, never *expando* or *zippy*.
- **Toggle** — never a verb. *To turn on the setting, click the **Wi-Fi** toggle*, and say
  which position it should end in when its starting state is unknown.

#### Buttons and icons

Refer to a button by its label: *Click **OK***, not *Click the "OK" button*. Where a button
carries an icon, use the name from its tooltip and put the icon before the name, separated by
a nonbreaking space if needed. If the tooltip matches the icon's name, give the icon an empty
`alt` attribute. To find an icon's name, inspect the element for `aria-labelledby`,
`aria-label`, `aria-describedby`, `label`, `placeholder`, or `title`; if a button with an
icon has no tooltip, file a bug — tooltips matter for accessibility and discoverability.

Drop a trailing ellipsis from an element name: *Click **Browse***, not *Click **Browse ...***.

Don't use directional language such as *above*, *below*, or *right-hand side*. For a
hard-to-find element, use the icon with its name, add context (*On the Cloud Run toolbar,
click **Refresh***), or provide a screenshot.

#### Keyboard keys

Use the `kbd` element — `Press <kbd>Control+C</kbd>` — or monospace in non-HTML markup. Use
`code`, not `kbd`, for a key typed to enter its value as text.

- Use uppercase for letter keys: `Control+S`, not `Control+s`.
- Refer to a key by name, or as *the `Esc` key* if that's ambiguous.
- Spell modifier keys out — Command, Control, Option, Shift — with no symbols, and write
  combinations as `MODIFIER+KEY_NAME`, or `MODIFIER+Shift+KEY_NAME` with Shift.
- Put the macOS shortcut in parentheses after the Windows and Linux one: *press `Control+C`
  (or `Command+C` on macOS)*.
- Spell out characters that could confuse — comma, hyphen, period, plus.
- Call it a *keyboard shortcut* or *key combination*. Use *press* for causing an action, and
  *enter* or *type* for entering text.

#### Prepositions

| Preposition | UI element | Example |
| --- | --- | --- |
| in | dialogs, fields, lists, menus, panes, windows | In the **Name** field, enter `wsfc-1`. |
| on | pages, tabs, toolbars | On the **Edit** tab, click **Save**. |

#### Verbs in procedures

Use *click*, *choose*, *drag*, *enable*, *enter*, *type*, *go to*, *hold the pointer over*,
*press*, *select*, *tap*, and *turn on* / *turn off*. See each entry in the
[Word list](#word-list).

---
## HTML and CSS

### HTML and semantic tagging

*Source: <https://developers.google.com/style/semantic-tagging>*

Use HTML elements for what they were designed for — the title of a standalone work goes in a
`cite` element, for instance. Where no semantically relevant element exists, use CSS or one
of the few elements that carry visual style without semantics.

- Don't lay out pages with frames or tables; use your site's CSS.
- Don't use heading elements to style text; use them only for hierarchical headings.
- `em` means emphasis, not italics: use `i` for italics that aren't emphasis.
- `strong` means strong importance, not bold: use `b` for bold that isn't important.
- `br` is only for line breaks that are part of the content, as in poems or addresses — not
  for spacing. Use `p` and adjust line spacing in CSS.

### HTML formatting

*Source: <https://developers.google.com/style/html-formatting>*

Follow Google's [HTML/CSS style guide](https://google.github.io/styleguide/htmlcssguide.html),
except that you shouldn't leave out optional elements. These basics apply to other source
formats too, including YAML and Markdown:

- Indent with spaces, never tabs — editors treat tabs differently and some Markdown features
  require spaces — two spaces per level.
- Use all-lowercase elements and attributes.
- Don't leave trailing spaces, except where Markdown needs them.

Break lines at 80 characters, with two exceptions: a `meta` element at the start of a file
must be on one line, and a URL can't contain a line break — put a long one on its own line
so the surrounding text is still reviewable. Break `pre` blocks at 80 characters too, but
match a file's existing line length if it consistently uses another, and never let a line
break change the meaning of the code.

### Markdown versus HTML

*Source: <https://developers.google.com/style/markdown>*

Use either. Markdown is easier to write and to read in source; HTML is more expressive,
particularly for [semantic tagging](#html-and-semantic-tagging), and can do things Markdown
can't — you may need the `code` element for special characters such as nonbreaking spaces.
The choice is mostly preference, but follow whatever your team or document template already
uses.

---

## Names and naming

### Example domains and names

*Source: <https://developers.google.com/style/examples>*

Never use real domain names, email addresses, or people's names in examples, and never
reveal personally identifiable information. Use fictitious examples or
[placeholders](#placeholder-formatting) such as `USER_ID`.

- **Domain names.** Use example.com, example.org, or example.net, reserved by IANA for
  documentation. Google also owns altostrat.com, examplepetstore.com, example-pet-store.com,
  myownpersonaldomain.com, my-own-personal-domain.com, and cymbalgroup.com for this purpose.
  For an internationalized domain name, use one of the IDN Test TLDs.
- **Email addresses.** Combine an example domain with an example given name —
  <dana@example.com> — or use a generic address such as <support@example.net>. Don't use
  person names, product names, or made-up names in the address.
- **Person names.** Draw given names from this list: Alex, Amal, Ariel, Bola, Charlie, Cruz,
  Dana, Dani, Hao, Ira, Izumi, Jie, Kai, Kalani, Kim, Kiran, Lee, Lucian, Luka, Mahan, Noam,
  Nur, Quinn, Raha, Rosario, Sasha, Tal, Taylor, Tristan, Yuri. For a surname, use an
  initial: *Quinn N.*
- **Company names.** Use Example Organization, and distinguish two companies with a
  descriptor: Enterprise Example Organization, Startup Example Organization.
- **Phone numbers.** Use the reserved US range 800-555-0100 through 800-555-0199.
- **IP addresses.** Use the RFC 5737 IPv4 documentation ranges — `192.0.2.0/24`,
  `198.51.100.0/24`, `203.0.113.0/24` — and the RFC 3849 IPv6 range, `2001:db8::/32`.
- **Street addresses.** Use a fictional address, such as *1800 Amphibious Blvd., Mountain
  View, CA 94045* or *8 Rue du Nom Fictif, 341 Paris*.
- **Project names.** Make them meaningful and applicable to the reader's environment, never
  `foo`, `bar`, or `baz`; number them where you need several — *production-1*,
  *production-2*.
- **Service account IDs.** Use the numeric ID `123456789012345678901`.

#### Further notes about example people

Real people read your examples, so write them so those readers feel respected and welcomed,
and include a variety of people. Use the gender-neutral singular *they*, and don't specify
gender unless it's integral to the information — some names on the list imply a gender in a
given language or culture, so check that a chosen name doesn't carry a conflicting
connotation. Watch for stereotypes reinforced by hypothetical examples, such as executive
roles given consistently gendered personas or engineering roles given consistently ethnic
ones.

Use the [Alice and Bob](https://wikipedia.org/wiki/Alice_and_Bob#Cast_of_characters) cast
only when documenting a technical specification that uses those characters — and then use
only names from that cast.

### Filenames

*Source: <https://developers.google.com/style/filenames>*

Make file and directory names lowercase: most Unix-style systems are case sensitive, so
`Impersonate-Service-Accounts.html` and `impersonate-service-accounts.html` are two
different files. Separate words with hyphens, not underscores — search engines read hyphens
as spaces and generally don't recognize underscores, so underscores hurt SEO. Use only
standard ASCII alphanumeric characters, and avoid generic names such as `document1.html`.

- Recommended: `avoiding-cliches.jd`. Sometimes OK: `avoiding_cliches.jd`. Not recommended:
  `avoidingcliches.jd`, `avoidingCliches.jd`, `avoiding-clichés.jd`.
- **Exceptions.** Match an existing directory that already uses underscores — adding
  `lesson_4.jd` beside `lesson_3.jd` is fine — and accept the filenames that reference
  generators produce.

#### Refer to files

Use [code font](#code-in-text) for a filename, follow it with the word *file*, and spell it
exactly as it is even when it breaks the naming guidelines: *In the following `build.sh`
file, modify the default values.* If you show the file's contents, introduce the
[code sample](#code-samples) with a sentence naming the file.

Don't use a file type as a verb: *Extract a zip file*, not *Unzip a zip file*.

Refer to a file type by its formal name, not its extension — *a PNG file*, not *a `.png`
file*; *a Bash file*, not *an `.sh` file*.

| Extension | File type | Extension | File type |
| --- | --- | --- | --- |
| `.adoc` | AsciiDoc file | `.pdf` | PDF file |
| `.csv` | CSV file | `.png` | PNG file |
| `.exe` | executable file | `.ps` | PowerShell file |
| `.gif` | GIF file | `.py` | Python file |
| `.img` | disk image file | `.sh` | Bash file |
| `.jar` | JAR file | `.sql` | SQL file |
| `.jpg`, `.jpeg` | JPEG file | `.svg` | SVG file |
| `.json` | JSON file | `.tar` | tar file |
| `.md` | Markdown file | `.tf` | Terraform file |
| `.txt` | text file | `.yaml` | YAML file |
| `.wasm` | Wasm file | `.zip` | zip file |

### Trademarks

*Source: <https://developers.google.com/style/trademarks>*

Follow the usage guidelines the trademark owner provides. Always use a trademarked term to
modify a noun, never as a noun by itself and never as a verb, and never form a possessive or
plural from one or alter it in any way.

- Recommended: Another option is to use a Chromebook notebook computer.
- Not recommended: Another option is to use a Chromebook. / Chromebook's features rely on an
  internet connection. / ... google "notebook computers".

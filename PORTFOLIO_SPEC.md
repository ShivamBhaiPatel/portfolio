# Portfolio Rebuild — Specification

**Owner:** Shivam Bhai Patel
**Target domain:** `shivambhaipatel.com`
**Repo (new):** `D:\WorkingProjects\Portfolio`
**Supersedes:** `D:\WorkingProjects\portfolio-site` (live, git-tracked, last commit `405843f`)
**Status:** DRAFT — for review. No code written yet.
**Date:** 2026-09-03

---

## 0. How to review this document

This spec exists so that reviewers can challenge the *decisions* before any code
is written. If you are a reviewing agent, the sections most worth attacking are:

- **§2 Positioning** — is the framing right for the stated goal?
- **§4 Content inventory** — is anything claimed here unverifiable or inflated?
- **§5 Design system** — will this actually read as non-generic, or is it just
  a different set of defaults?
- **§10 Risks** — what did we miss?

Leave findings as a list at the bottom under §12. Do not edit §4 facts without
verifying against the source repository.

---

## 1. Goal

Land senior full-stack / systems engineering roles (₹20L+ FTE band, or global
remote contract) by making the depth of the existing work legible to a hiring
manager in under 90 seconds.

The current site does not do this. It presents a competent but generic
"Java Backend Engineer" profile and omits every piece of work that actually
differentiates the candidate.

### Success criteria

| # | Criterion | How it is measured |
|---|-----------|--------------------|
| S1 | A hiring manager can name the flagship project after 30s on the page | Manual test with 3 readers |
| S2 | Every "live" link resolves to a working app | Automated link check in CI |
| S3 | Each featured project states a problem, an architectural decision, and a consequence | Editorial review |
| S4 | Lighthouse ≥ 95 on performance and accessibility, mobile | `lighthouse` run in CI |
| S5 | Page reads as human-authored, not template-generated | Subjective; see §5 anti-patterns |

### Explicit non-goals

- Not an agency site. No pricing tables, no "our process" graphics, no stock client logos.
- Not a blog platform. A `/log` may come later; it is out of scope for v1.
- Not a CMS. Content lives in typed TS files, edited in the repo.

---

## 2. Positioning

**Decision:** Individual engineer seeking senior roles. Hiring-manager-facing.

**Rejected alternative:** consultant/studio framing. It reads as sales to the
audience being targeted, and the freelance channel (LinkedIn, referrals) does
not depend on this site.

### Headline framing

Current: `Java Backend Engineer | Spring Boot | Microservices | AWS`

This is a keyword string, and it under-sells. The work spans JVM backends,
Next.js frontends, browser automation engines, and multi-agent developer
tooling. "Java Backend Engineer" invites a maintenance-role offer.

Proposed direction (exact copy to be written in build phase):

> **Systems engineer.**
> I build the machinery other software runs on.
>
> Four years across enterprise JVM backends, browser-automation engines,
> and multi-agent developer tooling. Previously Reflexis / Zebra Technologies.

Rationale: "systems engineer" is a claim the portfolio can actually *prove* on
the same page. A claim you can prove one scroll later is worth more than three
you cannot.

### What the reader must conclude

1. This person ships production systems, not tutorials.
2. This person makes architectural decisions and can explain the trade-offs.
3. This person operates at a level above the years-of-experience number.

---

## 3. Information architecture

```
/                       Home — the whole argument, one scroll
  ├── Hero              Claim + availability + two links
  ├── Selected work     3 deep cards (Workflow Studio, FlowTrace, PracharFlow)
  ├── Also running      Compact row: TradeSense, Enterprise Platform, DealDekho
  ├── Experience        Reflexis + consulting, metric-forward
  ├── How I work        4–5 short prose statements (replaces "skills chips")
  └── Contact           Email, LinkedIn, GitHub, resume. No form.

/work/workflow-studio   Case study
/work/flowtrace         Case study
/work/pracharflow       Case study

/resume.pdf             Static asset
```

**v1 scope = home + three case studies.** Everything else waits.

### Section-by-section composition

Deliberately varied. Check 5 in §5 forbids six identical cards in a grid; this is
how that is honoured.

**Hero** — no image, no avatar, no gradient. Display-size claim, two lines of
support, a mono metadata line (`available · Q4 2026 · Prayagraj, remote`), two
text links. Fits above the fold on a laptop with room to spare. The restraint is
the statement.

**Selected work** — three entries, three different treatments:

| | Project | Treatment |
|---|---|---|
| 1 | Workflow Studio | Full-bleed band. Inline SVG: core at centre, four surfaces around it, connector as optional swap. The `tradesense/package.json` dependency line quoted in mono beneath. |
| 2 | FlowTrace | Two-column. Left: the problem in prose. Right: the `vendor-injected.mjs` header quoted verbatim, credited to its path. |
| 3 | PracharFlow | Prose-led, no card. The rejected-approach argument (§4.4) told as a paragraph, then the parametric-composition answer. |

**Also running** — a bare table, not cards: name, one line, stack in mono, link.
Three rows. The visual downgrade is intentional and readable as intent — the
reader sees you ranking your own work, which is itself a signal.

**Experience** — reverse-chronological, hairline rules between roles, no
timeline graphic, no company logos. Metrics inline in the prose, not extracted
into stat tiles.

**How I work** — four or five short first-person statements replacing the skill
chips. Each one falsifiable and drawn from an actual decision on this page. For
example: *"I put boundaries where the compiler can enforce them. `core`'s
tsconfig sets `types: ["node"]`, so importing the editor API from the engine is a
build error rather than a 3 a.m. one."* This section is where the reader decides
whether you think, so it gets written last, when the case studies have supplied
the evidence.

**Contact** — one line of prose and four links. No form, no card, no heading
larger than the body text.

### Why case studies as separate pages

A card can hold three lines. An architecture decision needs three paragraphs and
a diagram. Putting the depth on `/work/*` keeps the home page fast to scan while
giving the reader who *is* interested somewhere to go — and gives you a URL to
paste into a cold outreach message.

---

## 4. Content inventory

Everything below was verified on 2026-09-03 against the source repositories and
by HTTP request. **Do not add a project to the site that is not in this table.**

### 4.1 Live-link verification

| URL | HTTP | Verdict |
|-----|------|---------|
| `https://prachar.shivambhaipatel.com/` | 200, 201 KB, title *"One creative, made for you, every day"* | **Live** — server-rendered, real content |
| `https://tradesense.shivambhaipatel.com/` | 200, 98 KB, title *"TradeSense Institutional Trading Terminal"* | **Live** |
| `https://workflow.shivambhaipatel.com/` | 200, Vite SPA shell, title *"Workflow Studio — Autonomous Multi-Agent Orchestrator"* | **Live** — client-rendered dashboard |
| `https://enterprise-platform.netlify.app/` | 200, 44 KB, but **9.3 s** first response | **Live but cold-starts badly** — see R3 |
| `https://deal-dekho.vercel.app/` | connection failed (`000`) | **DOWN — must not be linked** |
| `https://tradesence.shivambhaipatel.com/` | DNS/connection failed | **Does not exist** — the spelling is `tradesense` |

> The two failures above were both present in the plan this spec replaces.
> Ship a dead link on a portfolio and the reader concludes the rest is also
> unmaintained. Link only what row 1–4 covers.

### 4.2 Flagship — Workflow Studio

- Repo: `github.com/ShivamBhaiPatel/workflow-studio` · **v1.4.0** · last commit 2026-09-03 (active)
- Live: `workflow.shivambhaipatel.com` (Vite dashboard SPA)

**Product shape — verified 2026-09-03 against the repo.** This is a pnpm
workspace with the engine extracted from its surfaces, not a VS Code extension.
Earlier notes (including `agent-memory/projects/workflow-studio/project.md`,
which still says "VS Code extension, v0.4.1") are **stale — do not use them.**

| Package | What it is |
|---|---|
| `@workflow-studio/core` v1.3.0 | DAG workflow engine, task parser, Jira mirror, local API server. Ships a `workflow-studio` CLI bin. |
| `@workflow-studio/connector` v0.1.0 | Optional shared-state connector. Without it core runs local on SQLite; with it, shared state routes to a Postgres-backed fleet store. |
| `@workflow-studio/installer` | Dependency / prerequisite installer |
| `@workflow-studio/server` | Server surface |

Surfaces that consume the core: the **VS Code extension** (root package), the
**CLI** (`bin/workflow-studio`), the **dashboard SPA** at
`workflow.shivambhaipatel.com`, and **TradeSense**.

**This is the architecture story to tell.** Not "I built an AI tool" — anyone can
say that. The specific, senior claim is: *I found the engine hiding inside my own
editor extension, pulled it out behind a package boundary, and now four different
surfaces run on it.* Two details make it credible rather than aspirational:

- `core/tsconfig.json` sets `types: ["node"]`, so an accidental `vscode` import
  is a **compile error**. The boundary is enforced by the compiler, not by
  discipline. `compile:core` passing is itself the proof.
- `core/package.json` carries an explicit `files` allowlist with a comment
  explaining why: without it, npm packs the whole directory and ships the
  vscode-dependent code the package exists to exclude.

Both are the kind of detail that separates someone who has actually maintained a
package boundary from someone describing one.

**The problem, in its own words:** running Claude, Gemini, Codex and Copilot on
one project means paying a handoff tax by hand every time you switch — restating
state, tracking who was mid-task, and later discovering two agents built the same
thing twice.

**What it is:** the control plane. It holds the task queue, hands the next task
to an agent with context pre-assembled, gates the result on approval, and records
what happened.

Points worth featuring:
- Task queue is a plain file (`TASK_QUEUE.md`), not a hidden database — inspectable, diffable, reviewable in a PR.
- Lossless handoff between agents from different vendors mid-task.
- Jira/Bitbucket sync: branch per ticket, PR on completion, ticket updated with a change summary.
- A reviewer agent that independently re-checks a worker agent's "done" claim before merge.
- Inter-agent message bridge for concurrent agents on one repository.

**The proof point to lead with:** TradeSense does not merely *use* Workflow
Studio — it **depends on it**. `tradesense/package.json` line 21:

```json
"@workflow-studio/core": "link:../workflow-studio/core"
```

That is a real dependency edge, checkable by anyone who clones either repo. A
developer tool that a second shipped product imports as a package is a
categorically different claim from a developer tool with a demo video, and it
is the strongest single sentence available anywhere on the site.

Show the dependency line verbatim. A `package.json` fragment is evidence; a
sentence claiming reuse is marketing.

**The diagram for this case study** draws itself: `@workflow-studio/core` in the
centre, four surfaces around it (VS Code extension, CLI, dashboard SPA,
TradeSense), `@workflow-studio/connector` as an optional swap turning local
SQLite into a Postgres fleet store. One picture, and the reader understands both
what was built and why the boundary matters.

**Honesty constraint:** describe what is built and running today. Roadmap items
(desktop packaging, dependency installer, open-sourcing) go in a clearly labelled
"where it's going" paragraph, not in the feature list.

### 4.3 FlowTrace — *missing from every previous plan*

- Repo: `github.com/ShivamBhaiPatel/flowtrace` · last commit 2026-08-26
- ~37,000 lines across three components: Chrome extension recorder, Windows desktop build of the recorder, replayer service.

**The problem:** large business applications — ERPs especially — are configured,
not just installed. Every customer's instance differs and every quarterly vendor
update can break flows that worked yesterday. "Does *Create Supplier* still work
in this instance today?" costs an experienced person twenty minutes by hand, per
flow, every time.

The alternatives it sits between: checking by hand costs ~20 min per flow per
patch, and writing automated tests needs someone who knows both the test
framework and the business process — with scripts that break constantly, because
these applications regenerate element IDs every session. FlowTrace has a business
user record themselves doing the task once; after that it replays on demand and
reports every step with a screenshot and an explicit verdict.

**The four claims the case study makes, all already true in the repo:**

1. **It self-heals.** When a recorded selector stops matching, the replayer hands
   the live page to a model with a small set of browser tools and asks it to
   accomplish the step's stated goal. If it succeeds *and the engine
   independently re-verifies the page*, the fix is written back onto the
   recording — the next run replays it with no AI call. Fixes are shared across
   recordings, matched by the step's label and error class rather than the raw
   selector, because the IDs regenerate.
2. **It refuses to report success it hasn't verified.** Every defect found in the
   engine so far has been in the layer deciding whether a step really worked —
   because a mistake there doesn't announce itself, it silently turns a wrong
   outcome green. The model's own claim is never trusted. A refused save counts
   as a refusal *unless* the message is recognisably a confirmation: that way of
   failing costs a false red, visible and cheap, instead of a false green.
3. **It knows what the application did** — capturing generated invoice and
   transaction IDs by reading confirmation dialogs *before* the click that
   dismisses them, since dialog and number vanish together.
4. **It is vendor-neutral by construction.** Everything application-specific sits
   behind one interface, one file per application. A new ERP is one file.

**Why it belongs on the front page:** three enforced architectural boundaries
(recorder core ↔ patches; replay engine ↔ service, communicating only through env
vars, a results file and one JSON line per event on stdout; mechanics ↔
evidence), 45 behaviour checks named for the defect each prevents rather than the
code it covers — three of them written after fixes to *other* bugs introduced new
ones — and a stated known gap (the PDF report has almost no coverage). It also
shows range in one system: browser extension, Windows desktop app, backend
service.

> Much of this copy can come almost directly from `flowtrace/README.md`, which is
> the strongest technical writing in any of the repositories. Adapt it; do not
> re-generate it. The line *"The recorder and replayer share no code and never
> run together. The recording file is the entire contract between them"* should
> survive to the page intact.

**Provenance, stated once and positively:** FlowTrace is your own product. The
FirstCron engagement is separate consulting work with its own repository and
belongs under experience, described at outcome level. Standing hygiene: no client
data, instance URLs, or ERP configuration in screenshots, fixtures, or case-study
text.

**The detail to build the case study around:** `recorder/scripts/vendor-injected.mjs`
extracts Playwright's injected script out of `playwright-core`'s minified
`coreBundle.js`, where it lives as an escaped string literal, and vendors it as a
pinned build artifact — so the recorder gets Playwright's real selector generator
(roleUtils, elementText, the CSS tokenizer, the scoring table) without dragging
`chrome.debugger` or a CDP session into a browser extension. The script's own
header explains why it asserts loudly at every step: the extraction is
marker-based against a third-party bundle and *will* break on a future Playwright
version, and the failure that matters is not a stopped build but silently
vendoring 4 KB of something else and shipping quietly worse selectors.

That is a genuine engineering decision with a stated failure mode and a
deliberate mitigation. Quote the file. It is worth more than any three bullet
points on the page.

### 4.4 PracharFlow

- Repo: `github.com/ShivamBhaiPatel/pracharflow` · last commit 2026-09-03 (active)
- Live: `prachar.shivambhaipatel.com`

Template-based marketing-content SaaS for Indian small businesses and political
workers. Daily creatives delivered over Telegram (phase 1), WhatsApp (phase 2).

**The architectural decision worth telling:** AI image generation was rejected.
It cannot reliably render Devanagari, reproduce an exact party logo, or reproduce
a real person's face — and for a politician's hoarding a lookalike face or wrong
party symbol is a product-killing defect. Non-deterministic output also makes
preview-then-deliver impossible. The system uses parametric template composition
(layout JSON with typed slots, Skija/Skia compositor) instead.

This is the single best story on the site: a real constraint, a rejected obvious
answer, a reasoned alternative, and a consequence. Lead the case study with it.

### 4.5 Secondary — "also running"

| Project | One line | Link |
|---------|----------|------|
| TradeSense | Multi-agent market research panel over live market data. Analyses; never places an order. **Built using Workflow Studio** (Jira TRDS, phase 1 complete). | live |
| Enterprise Platform | Java 21 / Spring Boot orchestration across Oracle Fusion, Cognos, Power BI, SAP S/4HANA, Dynamics 365. Next.js 15 + WorkOS front end. | live (slow) |
| DealDekho | Price comparison across 6 Indian marketplaces; aggregator-first ingestion, affiliate revenue model. | **no link until redeployed** |

**DealDekho — corrected status.** The dead Vercel URL understates this badly. Per
agent-memory and `ai/CURRENT_STATE.md`, the application is substantially complete:
Next.js 15 front end, PostgreSQL 16 with Prisma migrations, auth, SEO
(sitemap, OG image route, structured data), Sentry, dark mode, rate limiting and
Zod validation, and 62 passing API tests across 12 suites. What remains is the
crawler/parser layer. The deployment is down because of a hosting issue, not
because the product is unfinished.

The architectural decision worth telling: **aggregator-first**. Rather than
scraping six e-commerce sites directly — the brittle, adversarial, IP-blocked
path everyone tries first — it ingests from two or three Indian comparison
aggregators via a separate `nexus-service`, and a browser extension (ShopLens)
feeds real user-observed prices back through an integration API. That is a
deliberate answer to the anti-bot problem, and it is more interesting than any
scraping war story.

**Action:** redeploy before launch. This is a five-project site without it and a
six-project site with it, and it is the most immediately legible project to a
non-specialist reader. See R1.

TradeSense carries a compliance line in its own README ("no component places an
order, in any phase"). Reproduce that framing on the card — showing that you
scoped a system's blast radius deliberately is a senior signal.

### 4.6 Experience — dates CONFIRMED, use exactly these

> **✅ Q8 RESOLVED 2026-09-03 by Shivam directly. Not blocking any more.**
>
> | Role | Location | Dates |
> |---|---|---|
> | Software Engineer, Reflexis Systems (Zebra Technologies) | Pune, India | **Nov 2021 – Mar 2024** |
> | Independent Software Consultant | Remote, India | **Apr 2024 – Present** |
> | ↳ FirstCron Services Pvt Ltd (SyntraFlow) — *current client* | Delhi, India | ongoing |
> | ↳ SamMegh Technologies — *contract* | — | **Dec 2024 – Sep 2025** |
>
> Rendering notes:
> - **"FirstCron Services Pvt Ltd"** is the full legal name — use it on first
>   mention, then "FirstCron". **SyntraFlow** is the *product* built for them, not
>   the company; do not use the two as synonyms.
> - **The product is called SyntraFlow** (confirmed by Shivam 2026-09-04). It was
>   formerly *SyntraIntelli*; the client renamed it because the old name was hard
>   to pronounce. Use SyntraFlow, with no "formerly known as" gloss. Anything in
>   older notes saying SyntraIntelli is stale, not wrong-at-the-time.
> - SyntraFlow is the **client's** product. FlowTrace is **Shivam's own**. Two
>   systems, two owners — never written as aliases.
> - The client engagements are **nested under** the consulting span, not listed as
>   separate employers. Three top-level entries would misrepresent a
>   two-position history.
> - **Locations belong to the right party.** Shivam works remote from Prayagraj;
>   Delhi is FirstCron's location, not his. Do not render "Delhi, India" as his
>   own posting.
> - SamMegh is labelled **contract** and is closed (Sep 2025). FirstCron is
>   ongoing. That contrast is useful — it shows a retained client alongside a
>   completed engagement — so keep both visible rather than collapsing them.
>
> **On the apparent contradiction, recorded so it does not resurface.** A peer
> agent reported Shivam describing a 5–6 month gap and a total nearer 4.5 years,
> which looked inconsistent with continuous dates. It is not. "Independent
> Software Consultant, Apr 2024 – Present" is a *self-employment span*, and a
> quiet stretch with no client work inside that span does not make the dates
> false — it means the span is not wall-to-wall billed engagement, which is
> ordinary for consulting and requires no explanation on a portfolio.
>
> **The one rule that follows:** state the dates plainly and do **not** add any
> claim of continuous or unbroken client delivery across that period. No "3+
> years of consecutive client delivery", no implied utilisation. The dates are
> accurate; a gloss on top of them would not be.
>
> Total experience reads as "four years" in the hero (Reflexis Nov 2021 to now is
> longer, so "four years" is conservative and safe). Do not inflate it to five.
>
> The bullets below are reused from
> `portfolio-site/src/components/sections/Experience.tsx` — specific,
> metric-bearing, and the strongest thing on the current site. **The dates are a
> separate matter and must not be copied through.**
>
> As written, the current site presents continuous employment: Reflexis
> Nov 2021 – Mar 2024, Independent Consultant Apr 2024 – Present, SamMegh
> Dec 2024 – Sep 2025 nested inside. That is 4 y 10 m with no break. A peer agent
> reports Shivam has since described a gap of 5–6 months and a total nearer
> 4.5 years — arithmetically consistent with a real gap, and inconsistent with
> the site as it stands.
>
> **This reaches the spec second-hand and is NOT confirmed by Shivam here.**
> Treat it as unresolved. But the risk runs one way: if there is a gap, the live
> site papers over it, and a recruiter cross-checking against LinkedIn or a
> résumé will find the discrepancy. A gap costs a sentence; a contradiction
> between a candidate's own site and his own résumé costs the interview.
>
> **Blocking on Q8. Do not write the experience section until Shivam confirms the
> real dates.** Career gaps are ordinary and need no apology — an honest range,
> with at most a short factual note, is sufficient.

The achievements themselves, once the dates are settled:

**Independent Software Consultant** (Apr 2024 – Present) — FirstCron / SyntraIntelli,
SamMegh Technologies. Oracle Fusion ERP automation across 50+ entities; Playwright
record/parameterize/batch-replay engine with screenshot evidence and PDF/Excel
reporting; React/Express/MySQL dashboard with RBAC; Spring Boot query optimisation
cutting endpoint latency ~30%; API response 800 ms → under 300 ms.

**Software Engineer, Reflexis Systems (Zebra Technologies)** (Nov 2021 – Mar 2024) —
Java/Spring Boot/DB2 retail workforce platform; REST APIs across hundreds of
enterprise retail locations; production defects −25% via test coverage; monolith
→ microservice-aligned refactor; Jenkins CI/CD cutting release cycles from
bi-weekly to under 2 days; JVM/GC tuning for +30% throughput.

### 4.7 Content to delete

| Item | Reason |
|------|--------|
| "Jobs Made Easy" project | College-capstone tier next to the above. Removing it raises the floor. |
| Skill chip cloud (HTML5, CSS3, JPA…) | Listing web primitives reads junior. Skills should be inferable from the case studies. |
| Four generic "what I do" icon cards | Occupies prime space, asserts nothing, proves nothing. |
| Contact form (`/api/send-email`, EmailJS) | Nobody senior fills a form. Removing it also deletes a server route, a dependency, and a spam surface. |
| Emoji contact icons (📱 📧 💼) | Cheapens an otherwise serious page. |
| Phone number in hero | Move to resume PDF only. |
| `Geometric-pattern-background-vector-in-white.jpg` | Stock texture. |

---

## 5. Design system

**Direction:** warm editorial / paper. Reference points: technical journals,
architecture monographs, Evil Martians' and PostHog's engineering writing.

### Anti-patterns — an automatic review failure

The following are the visual signature of generated portfolio sites and are
prohibited:

- Dark navy or slate-900 canvas with purple/blue gradient
- Glassmorphism, blur panels, glow behind avatars
- Animated gradient-mesh or particle backgrounds
- Full-width hero with a centred gradient-text headline
- Emoji as section iconography
- Rounded 2xl cards with `shadow-lg` on every element
- `Inter` as the display face
- Copy beginning "I'm a passionate developer…"

### Evidence: the tell, measured on your own sites

"Should not look AI-generated" is an adjective until it is a checklist. So here
is what the existing deployments actually do, as measured on 2026-09-03. These
are not hypothetical failure modes — they are the failure mode, shipped.

**`workflow.shivambhaipatel.com`** — from the served HTML:

```html
<html class="dark"> <meta name="theme-color" content="#07090e">
<body class="bg-[#07090e] text-slate-100 selection:bg-indigo-500">
```

Near-black canvas, `slate-100` text, `indigo-500` selection. That is the exact
palette the phrase "AI-generated SaaS site" refers to.

**`workflow-studio-dashboard/packages/web/src/styles/globals.css`** — the colours
are Tailwind's factory swatches, used unmodified:

| Value in the file | What it is |
|---|---|
| `#7c3aed` | `violet-600`, straight from the default palette |
| `#ef4444` | `red-500` |
| `#f59e0b` | `amber-500` |
| `#1f2937`, `#111827` | `gray-800`, `gray-900` |
| `.welcome-gradient` | a `linear-gradient(to bottom right, …)` on the landing panel |

**The diagnosis.** Nothing here is ugly. The problem is that it is *nobody's*.
Every generated site reaches for the same twelve hex values because they are what
the framework hands you, so a reader who has seen four of these pages recognises
the fifth instantly — before reading a word. The palette is the tell, not the
layout.

> Note the asymmetry: the dashboard's CSS is full of genuinely careful work —
> distinct badge states for cursor-active, hover, type-error, unclosed,
> unknown-function and deprecated, each with its own treatment. Real thought went
> in. It is invisible because it is painted in stock colours. That is exactly the
> trap this portfolio must not fall into: **the work is good and the surface
> makes it look automatic.**

### The nine checks

Mechanical, checkable, and a reviewer can run them against a screenshot. Failing
any one is a build failure, not a matter of taste.

1. **No unmodified framework palette values.** Every colour on the site must come
   from the §5 token table. If a hex in the codebase is greppable in Tailwind's
   default palette, it is wrong. This single rule removes most of the tell.
2. **No dark-navy-and-indigo.** The site is light-first paper. Dark mode is warm
   charcoal (`#14130F`), not slate.
3. **No gradient as decoration.** Gradients may not appear on backgrounds, cards,
   buttons, or headline text. (A gradient *encoding data* in a diagram is fine.)
4. **Not Inter, not system-ui, for display.** See §5 Type.
5. **No uniform card grid.** If every project is the same rectangle in the same
   grid, it reads as generated from a list — because it was. Vary the treatment:
   the flagship gets a full-width band with a diagram, the second gets a
   two-column split, the compact three get a text row with no card at all.
6. **No emoji as UI.** Not in section headers, not as icons, not as bullets.
7. **Every number is traceable.** No "40+ projects", no "5+ years", no counters
   that tick up on scroll. `800 ms → under 300 ms` with the method named is
   worth more than any round number.
8. **At least one visible imperfection per page.** A parenthetical aside, an
   admitted limitation, a "this broke twice before it worked". Generated copy is
   uniformly confident; that uniformity is the giveaway.
9. **Quote real artefacts.** A `package.json` line, a code comment, a filename.
   Verbatim, in mono, credited to its path. Nothing else proves authorship as
   cheaply — a generator cannot cite your `vendor-injected.mjs` header because it
   has never read it.

### Tokens

Light (default):

| Token | Value | Use |
|-------|-------|-----|
| `--paper` | `#F7F5F0` | page ground |
| `--raised` | `#FFFFFF` | cards, rare |
| `--ink` | `#16150F` | body text, headings |
| `--muted` | `#6B675C` | captions, metadata |
| `--rule` | `#E0DCD2` | 1px separators |
| `--accent` | `#8A3B12` | links, one live-status dot. Burnt sienna, used sparingly |

Dark (`prefers-color-scheme` + explicit toggle):

| Token | Value |
|-------|-------|
| `--paper` | `#14130F` |
| `--raised` | `#1C1B16` |
| `--ink` | `#EDEAE1` |
| `--muted` | `#918C7E` |
| `--rule` | `#2E2C25` |
| `--accent` | `#D98B5F` |

Contrast target: WCAG AA (4.5:1 body, 3:1 large) in both themes. To be verified,
not assumed.

### Type

| Role | Face | Notes |
|------|------|-------|
| Display | **Fraunces** (variable) | Headings only. Optical-size axis, soft serif — carries the "human touch" requirement. |
| Body | **Instrument Sans** | Deliberately not Inter. |
| Technical | **JetBrains Mono** | Stack labels, metrics, timestamps, file paths, status. |

Self-host via `next/font` — no render-blocking Google Fonts request, no layout
shift, no third-party dependency at runtime.

### Layout rules

- Single measured column, ~68ch for prose. Not a full-bleed 1440px grid.
- Separators are 1px `--rule` lines. Shadows are not used to create hierarchy.
- Whitespace and type scale carry hierarchy.
- Motion: opacity/translate on scroll-in, ≤200 ms, and fully disabled under
  `prefers-reduced-motion`. No parallax, no counters that tick up.

### The "human touch" — concretely

Abstract instruction, so make it mechanical:

1. **Prose over bullets** in at least one section per page. Bullets are what generators produce.
2. **Marginalia** — mono-set notes in the left margin on desktop (dates, line counts, "still running").
3. **First person, past tense, specific.** "The obvious answer was AI image generation. It doesn't render Devanagari." — not "Leveraged cutting-edge AI."
4. **Admit a constraint or a trade-off** in every case study. Generated copy never does this; it is the strongest human tell available.
5. **One hand-drawn-feel SVG diagram** per case study — inline, themed, not a screenshot of a whiteboard tool.

---

## 6. Technical stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15, App Router, RSC | Static export; matches the rest of the portfolio's stack |
| Language | TypeScript, `strict: true` | |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | Tokens in §5 map directly to `@theme` vars |
| Fonts | `next/font/local` | Self-hosted, subset |
| Content | Typed TS modules under `content/` | Single source of truth; no CMS |
| Diagrams | Hand-authored inline SVG | Themed via `currentColor` |
| Package manager | **pnpm** | Project standard |
| Analytics | Plausible or none | No Google Analytics; no cookie banner |
| Deploy | Static export → Vercel or nexus | Decide in build phase |
| CI | GitHub Actions: `tsc --noEmit`, `eslint`, link check, Lighthouse | S2 and S4 must be enforced, not hoped for |

**No** framer-motion, no shadcn, no component library. This is roughly eight
components; a design system would be more code than the site.

### Repository layout

```
Portfolio/
├── PORTFOLIO_SPEC.md          this document
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── work/[slug]/page.tsx
├── components/                ~8 components, no barrel files
├── content/
│   ├── projects.ts            typed; drives cards AND case studies
│   ├── experience.ts
│   └── site.ts                name, links, availability flag
├── public/
└── styles/globals.css         @theme tokens
```

`content/projects.ts` is the single source of truth. Adding a project must not
require touching a component.

### Content model

The type is designed so that the *required* fields are the ones that make a
project worth showing. If you cannot fill `tension` and `decision`, the project
does not go on the page — the type enforces the editorial standard.

```ts
export type Evidence = {
  /** Verbatim excerpt — a package.json line, a code comment, a config value. */
  quote: string
  /** Repo-relative path it came from. Rendered as the citation. */
  source: string
  lang?: 'json' | 'ts' | 'css' | 'text'
}

export type Project = {
  slug: string
  name: string
  /** One line. No adjectives that cannot be falsified. */
  summary: string

  /** The constraint that made this hard. Required — see §8. */
  tension: string
  /** What was chosen, and what was given up to choose it. Required. */
  decision: string
  /** What it cost or what it bought. Numbers if they exist. Required. */
  consequence: string

  /** Verbatim artefacts. At least one. Check 9 in §5. */
  evidence: Evidence[]

  stack: string[]
  repo?: string          // omit if private — never link a 404
  live?: {
    url: string
    /** Set by the link checker, not by hand. */
    status: 'up' | 'down' | 'unverified'
    note?: string        // e.g. "cold start ~10 s"
  }
  /** 'flagship' renders the band, 'featured' the split, 'compact' the table row. */
  tier: 'flagship' | 'featured' | 'compact'
  /** Anything not yet built, stated as roadmap. Never in `summary`. */
  roadmap?: string[]
}
```

Two rules the components enforce:

- A card with `live.status !== 'up'` renders **without a link**, showing the
  status instead. Fixes R2 structurally — a broken deploy degrades the page, it
  does not embarrass it.
- `roadmap` renders under a visibly separate heading. Nothing unbuilt can leak
  into present-tense prose, because the type gives it nowhere else to go.

---

## 7. Build plan

| Phase | Deliverable | Gate |
|-------|-------------|------|
| P0 | This spec reviewed and approved | Reviewer sign-off in §12 |
| P1 | Scaffold, tokens, fonts, layout shell | `tsc` + `eslint` clean |
| P2 | Home page: hero, selected work, also-running, experience, contact | Visual review against §5 anti-patterns |
| P3 | Three case studies + one SVG diagram each | Editorial review: each has a stated trade-off |
| P4 | CI: type check, lint, link check, palette guard, Lighthouse | S2, S4 and §5 checks 1–4 pass |
| P5 | Deploy to `shivambhaipatel.com`, retire `portfolio-site` | Old repo archived, not deleted |

Screenshots/OG images and the `/log` section are deliberately deferred past P5.

---

## 8. Case study template

Every `/work/*` page follows the same six beats. The shape is fixed so the
*content* has to carry the difference — which is the opposite of how a template
site works, and the reason all three will read differently.

1. **The situation** — two or three sentences. What existed, who it was for.
2. **The tension** — the constraint that made the obvious answer wrong. This is
   the beat generated writing cannot fake, because it requires having been stuck.
3. **The decision** — what was chosen, and explicitly what was given up.
4. **The evidence** — a verbatim artefact, in mono, credited to its path.
5. **The diagram** — one inline SVG, `currentColor`, themed, hand-authored.
6. **What it cost / what's left** — the limitation, the roadmap, the thing that
   still breaks. Ends on honesty rather than a call to action.

Worked example of beat 2, so there is no ambiguity about the standard:

> **PracharFlow.** The obvious answer was AI image generation, and it does not
> work here. It cannot reliably render Devanagari, reproduce an exact party logo,
> or reproduce a real person's face — and on a politician's hoarding a lookalike
> face or the wrong party symbol is not a blemish, it is a product-killing
> defect. Non-deterministic output also makes preview-then-deliver impossible,
> and preview-then-deliver is the entire product. So the system composes
> parametric templates instead: layout JSON with typed slots, rendered through
> Skia. Slower to author a template, and every design must be built rather than
> prompted. In exchange, the output is exact and identical every time.

Length target: 500–800 words per case study. Long enough to demonstrate
reasoning; short enough that it gets read.

---

## 9. Copy principles

- Active voice, first person, past tense for shipped work.
- Every claim carries a number or a link. If neither exists, cut the claim.
- No adjectives that cannot be falsified ("robust", "scalable", "cutting-edge",
  "seamless", "passionate").
- Roadmap is labelled as roadmap. Nothing unbuilt is described in present tense.
- Metrics keep their context: "800 ms → under 300 ms *on client ERP endpoints,
  via indexing and schema redesign*", not a floating "-60% latency".

---

## 10. Risks and open questions

| # | Risk | Mitigation | Owner |
|---|------|-----------|-------|
| R1 | DealDekho is down for hosting reasons though the app is largely complete (62 tests green, crawler layer outstanding) | Redeploy before launch — the cost is a deploy, not a rebuild. Ship v1 without the link if it slips. Never link it broken. | Shivam |
| R2 | Featured apps could break after launch and go unnoticed | Scheduled link check; card falls back to "in development" rather than showing a dead link | Build phase |
| R3 | Enterprise Platform cold-starts at 9.3 s — a visitor will assume it's broken | Warm it, move to a non-sleeping host, or label the card "cold start ~10 s" | Shivam |
| R4 | Public repos may contain secrets or client-identifying material | Security pass on any repo before it is linked from the site | Pre-P5 |
| R5 | ~~FlowTrace ownership~~ — **resolved.** It is own work; the FirstCron engagement is separate | Feature as own product. Keep client data, instance URLs and ERP config out of screenshots and fixtures | Resolved |
| R5b | FirstCron / SamMegh named on the résumé section | Lower risk — the current live site already names both, so this is not a new disclosure. Confirm anyway | Shivam |
| R5c | Stale agent-memory misdescribed two projects and skewed this spec's first draft | **Done 2026-09-03** — `projects/workflow-studio/project.md` and `projects/flowtrace/repo-layout.md` rewritten from the repos. A wider staleness audit of the remaining project folders is running | Resolved / in progress |
| R6 | Workflow Studio may be commercialised — a full public teardown could undercut that | Decide depth now: showcase the architecture, withhold the implementation | Shivam |
| R7 | Six projects at four years invites a "breadth without depth" read | Three deep case studies, not six shallow ones. Depth is the counter-argument. | Spec, resolved |

### Open questions for Shivam

1. **Q1** — Is DealDekho being redeployed before launch? (Confirmed built; the blocker is hosting.)
2. **Q2** — Availability status line: actively looking, open to conversations, or omit it entirely? (Affects hero.)
3. ~~**Q3** — Is there an up-to-date `resume.pdf`?~~ **Answered 2026-09-03: there
   is none.** `portfolio-site/public/` holds four images and no PDF (verified in
   the live git-tracked repo, not the stale zip copy). The current site links
   `/resume.pdf`, so **that link is broken in production today.** Either a résumé
   is written before launch or the link is cut — the hero CTA and §4.7 depend on
   which.
8. ~~**Q8** — real employment dates?~~ **RESOLVED 2026-09-03.** Reflexis
   Nov 2021 – Mar 2024; Independent Consultant Apr 2024 – Present. See §4.6 for
   the dates and the one rule attached to them.
9. **Q9** — Are the repos public or private? A peer agent reports **all repos are
   private**; unverified here. If true, every `repo` field in §6's content model
   must be omitted rather than linked, and the case studies carry quoted
   evidence instead. This changes §4.2–4.4 materially, so settle it before P3.
4. **Q4** — Which repos are public? A case study that links to a 404 repo is worse than one that links to nothing.
5. **Q5** — R6: how much of Workflow Studio's internals go public?
6. ~~**Q6** — May FlowTrace be shown?~~ **Resolved 2026-09-03** — independent
   work; see the repo comparison in §4.3. No longer blocking.
7. **Q7** — Can the TradeSense-built-with-Workflow-Studio claim be stated
   publicly, with the Jira/PR evidence trail? It is the site's best sentence, but
   it exposes how the work was produced. Confirm you are comfortable with that.

---

## 11. What changes versus the current site

| | Current | New |
|---|---|---|
| Positioning | Java Backend Engineer | Systems engineer, proven on the page |
| Flagship work | Absent | Workflow Studio, FlowTrace, PracharFlow |
| Projects shown | 2 (one a capstone) | 3 deep + 3 compact, all verified live |
| Depth | Bullet lists | Case studies with trade-offs and diagrams |
| Skills | Chip cloud incl. HTML5/CSS3 | Inferred from the work |
| Contact | 4-field form + emoji | Email, LinkedIn, GitHub, resume |
| Aesthetic | Generic dark/gradient template | Warm editorial, self-hosted type, hairline rules |
| Correctness | — | CI-enforced: no dead links, AA contrast, Lighthouse ≥95 |

---

## 12. Review findings

> Reviewers: append below. Format — `[severity] section — finding — suggested action`.

### Review #1 — PORT-opus5-M1, 2026-09-03, against the build on `localhost:3005`

Implementation by `WFST-opus5-M1`. Structure and craft are sound: header nav with
real anchors, skip link, theme toggle with a System state, three genuinely
different project treatments (check 5 honoured), inline architecture diagrams,
mono evidence blocks with path attribution, and a `/styleguide` route with a
contrast table. Nothing structural needs redoing. Four content defects:

| # | Sev | Finding | Action |
|---|-----|---------|--------|
| D1 | **critical** | **Fabricated citation.** The PracharFlow card cites `render/.../SkiaRenderer.java:42`. That file does not exist — `find` over the repo returns nothing. Real files include `CompositorService.java`, `compose/LayoutComposer.java`, `font/TypefaceRegistry.java`. | Remove immediately; replace with a real file and a line actually opened. Re-verify every other citation on the site. |
| D2 | **critical** | **The evidence is the defect.** The Workflow Studio card quotes `"@workflow-studio/core": "link:../workflow-studio/core"` as proof. The line is real (`tradesense/package.json:21`) but it does not resolve — core is at `packages/core`, the link omits `packages/`. | Fix the repo first, then quote the corrected line; or quote a different artefact. Never quote a broken link as proof of craft. |
| D3 | high | **"Extracted the entire core" is false.** `packages/core/src/index.ts` is a 37-line re-export barrel — 17 `export *` statements pointing back into root `src/`. Its own comment (lines 25–28) says exporting the DAG runtime "is an export change, not an extraction". | Say the true thing, which is stronger: a boundary drawn through an existing codebase with the compiler enforcing it. |
| D4 | high | **Inflated adjectives** (§9 violation). "Zero-trust *cryptographic* state verification" — nothing cryptographic exists; the engine independently re-verifies the page. "Chrome MV3 *AST* extraction" — it is marker-based string extraction from a minified bundle. | Replace with the literal mechanism. Both are more impressive stated accurately. |
| D5 | low | FlowTrace quote attributed to `README.md:12`; the text is at lines 84–85. | Correct the line number. |

**Lesson for the spec, not the implementer.** D1 and D4 are the same failure in
two costumes: reaching for an impressive-sounding artefact instead of the real
one. Check 9 exists to prevent exactly this, and it was not enough on its own —
because it says *what* to do without saying *verify before you write it*. §5
check 9 is therefore amended: **every citation must be opened and its line number
confirmed before it ships, and CI must fail the build on a citation whose file or
line cannot be resolved.** A fabricated path on a page whose entire argument is
"this work is real" is self-refuting.

---

## 14. Review #2 — contrast, the hero panel, and interactivity (2026-09-03)

Raised by Shivam after a browser review. All three of his observations are
correct. Two of them trace back to defects in §5, one is an implementation
defect, and the most serious problem is one he did not raise — I found it while
checking the first.

### F1 — The light theme has no tonal range. Shivam is right.

Measured from `styles/globals.css`:

| Token | Light | Note |
|---|---|---|
| `--paper` | `#f7f5f0` | page ground |
| `--raised` | `#ffffff` | cards |

Those two surfaces are roughly **3% apart in luminance**. Every section, every
card, and the page behind them therefore occupy the top sliver of the tonal
range. Text contrast is not the problem — `ink` measures 16.79:1 and `muted`
5.18:1, both comfortably AA. The problem is **surface separation and the absence
of any dark anchor**: nothing on the page is darker than a hairline rule.

That is why it reads as "white on white on cream". A page can be light and still
have range; this one has lightness without range.

**Root cause is §5, not the implementation.** The token table gives six colours
of which five are pale. It never provided a dark ground, so none was used.

**The fix, which stays inside check 1 (no new palette values):** use `--ink` as a
*surface*, not only as text. One or two full-bleed bands grounded in `--ink`
with `--paper` text — the classic editorial dark plate. Candidates: the flagship
Workflow Studio band, and the contact section as a closing plate. This gives the
page rhythm — light, dark, light — costs nothing in new colour, and makes the
diagrams inside those bands far stronger.

Secondary: widen the `paper`/`raised` gap slightly so a card reads as a card
without a shadow, and introduce `--paper-sunk` (a shade *below* paper) for inset
areas such as code blocks. Both derived by `color-mix` from existing tokens.

### F2 — CRITICAL: the hero panel is the exact thing this spec exists to prevent

Shivam noted the right-hand panel "is not properly interactive — on tab it shows
one fixed value". That is true, but it is the least of what is wrong with it.
`components/hero.tsx` lines 91–139:

**It violates check 1 wholesale.** The panel is built from raw Tailwind default
values and bypasses the token system entirely: `neutral-100/200/300/400/500/600/
800/900`, `emerald-400/500/600`. Under check 1, "if a hex is greppable in
Tailwind's defaults it is wrong", this is an automatic build failure.

**It violates check 2.** Those neutrals are *cool* greys. In dark mode the panel
goes cool-slate while the rest of the page is warm charcoal `#14130f`.

**It violates the §5 anti-pattern list three times over** — `backdrop-blur-md`
(glassmorphism), `rounded-xl` with `shadow-[0_4px_20px_-4px_...]` (rounded card
with a drop shadow doing the hierarchy), and a pulsing emerald status dot.

**And the content is fabricated.** `SYS_NODE_PRAYAGRAJ`, `v2.4.0`,
`PING: 14ms (ACK)`, `SECURE_IPC_BRIDGE`, `ACTIVE (99.99% UP)`. None of it is
real. There is no node, no ping, no IPC bridge, no uptime measurement. It is a
decorative dashboard imitating live telemetry that does not exist.

**This is the same defect as the fabricated `SkiaRenderer.java` citation**, in a
more prominent position. §9 requires every number to be traceable; "99.99% UP" is
not merely untraceable, it is invented. A portfolio arguing "my work is real"
should not open with a fake instrument panel — and a reader who *does* build
monitoring systems will recognise it as decoration on sight.

**Ruling: do not make it more interactive. Remove it or make it true.** Animating
fabricated telemetry produces a more elaborate fiction, not a better hero.

Three honest replacements, best first:

1. **Nothing.** Delete the panel; let the hero be the claim and whitespace. §3
   already argued the restraint is the statement, and the current panel is the
   single strongest reason the page reads as generated.
2. **A real status row.** The apps genuinely are live. Fetch real HTTP status for
   `prachar`, `tradesense`, `workflow`, `enterprise-platform` at build time and
   render actual results — including "down" where it is down. Real, useful,
   falsifiable, and it doubles as the §6 link check.
3. **A static artefact.** The `@workflow-studio/core` boundary diagram, or the
   quoted `tsconfig` line. Set in the token palette, no chrome.

### F3 — The doubled separator after the hero

Shivam is right that the band under the hero looks odd. Cause:
`hero.tsx:11` ends the section with `border-b border-rule`, and the following
`<Section>` is rendered with `rule={true}`, drawing a second hairline. Two rules
with an empty gap between them read as an unfinished divider.

**Fix:** one rule, not two. Drop `rule` on the first section after the hero. Do
not "fill" the band with decoration — the answer to an odd empty strip is to stop
drawing it, not to put something in it.

### F4 — Raw palette values and decorative motion beyond the hero

Same class as F2, found in `app/page.tsx:46`: `border-t-neutral-900`,
`dark:border-t-neutral-100`, `hover:border-neutral-400`,
`dark:hover:border-neutral-600` — all outside the token system. `TiltCard`
(3D tilt on hover) also exceeds §5's motion rule, which permits opacity and
translate only, ≤200 ms.

**Action:** grep the whole tree for Tailwind default colour utilities and replace
every one with a token. Then add the CI guard §5 check 1 always implied but never
enforced: **fail the build if any `neutral-|slate-|gray-|zinc-|emerald-|indigo-|
violet-|red-|amber-` utility appears in the source.** Like the citation checker,
this converts an editorial rule into something a machine enforces — and it would
have caught the hero panel before it was ever seen.

### F5 — Where interactivity is actually warranted

Shivam wants the page to feel more alive; the instinct is right, the location was
wrong. Interaction should **demonstrate the work**, never decorate it:

- **The architecture diagram** — hover or focus a surface (extension, CLI,
  dashboard, TradeSense) and highlight what it imports from `core`. This teaches
  the boundary that is the whole point of the case study.
- **FlowTrace self-healing** — step through: selector drifts → model proposes →
  engine re-verifies → fix written back. The mechanism *is* the story.
- **Real live status**, per F2 option 2.
- **Copy-to-clipboard** on evidence blocks and the email address. Small, useful,
  never fake.

Every one must work without JavaScript and be reachable by keyboard, not just
hover.

---

## 15. Review #3 — end-to-end browser audit (2026-09-03)

Method: headless Chromium (Playwright 1.62.1) driven by a purpose-written
harness — **5 routes × 4 viewports × 2 colour schemes = 40 page loads**. Per load
it captured console output, failed requests, layout overflow, heading order,
link/button accessible names, section geometry, and computed WCAG contrast for
every text node against its resolved background (~249 nodes per page).
Screenshots reviewed at 1920 in both themes.

Artefacts: `scratchpad/audit.mjs`, `audit.json`, `home-light.png`, `home-dark.png`.

### What is clean — verified, not assumed

- **Zero console errors, zero page errors, zero failed requests** across all 40 loads.
- **Zero images missing `alt`.** Zero links without an accessible name. Zero links
  with `target="_blank"` lacking `rel="noopener"`. Zero buttons without a name.
- **Exactly one `<h1>` per route.**
- **Text contrast passes AA nearly everywhere** — 2 failures out of ~249 nodes
  per page.

That is a genuinely well-built front end. The findings below are design and
content, not hygiene.

### G1 — Contrast: Shivam's complaint is real, but it is NOT a text-contrast bug

Measured, so the fix targets the right thing:

| | Result |
|---|---|
| Text nodes checked per page | ~249 |
| AA failures | **2** |
| The failure | `muted` on the terminal band: `rgb(105,100,89)` on `rgb(8,7,6)` = **3.42:1**, needs 4.5 (11px). Both themes, home page, `[dag-engine]` label. |

So legibility is fine. The flatness comes from **surface geometry**, and the
harness proves it — home page, light, 1920:

```
section#work        1920px wide   bg = rgba(0,0,0,0)   ← transparent
section#secondary   1920px wide   bg = oklab(0.970 …/0.7)  ← 0.970 vs paper 0.968
section#experience  1920px wide   bg = rgba(0,0,0,0)
section#principles  1920px wide   bg = rgba(0,0,0,0)
section#contact     1920px wide   bg = rgba(0,0,0,0)
body                             rgb(247,245,240)
```

**Five of six sections are fully transparent, and the sixth is 0.2% lighter than
the page.** The entire light theme is one surface. There is no dark plate, no
sunk surface, nothing to give the eye a rhythm. Shivam described it as
"white/near-white on white" — that is exactly what the numbers say.

**Dark mode does not have this problem.** The screenshots make it plain: warm
charcoal `#14130f` with `#edeae1` text reads well, and the terminal band and HUD
sit into it naturally. **The light theme is the one that needs work**, which is
worth knowing before anyone "fixes contrast" globally and breaks the good half.

Fix as in §14 F1: promote `--ink` to a *surface* for one or two full-bleed bands,
add a `--paper-sunk` below paper for inset areas, and widen `paper`/`raised`
slightly. All by `color-mix` from the existing six — check 1 stays satisfied.
Also fix the one real failure by using `ink`-on-terminal at ≥4.5:1 rather than
`muted`.

### G2 — Ragged left margin: sections do not share a left edge

Visible in the screenshot and confirmed by geometry. At 1920:

| Element | Container | Left edge |
|---|---|---|
| Header, hero | `shell` (80rem = 1280px) | x ≈ 360 |
| `#work`, `#experience`, `#contact`, … | `wide` (72rem = 1152px) | x ≈ 424 |

A 64px step between the hero's left edge and every section beneath it. On a page
whose whole argument is precision, a wandering left margin is the first thing a
designer's eye catches — and it is *more* damaging than the width itself.

**Fix:** one shared page edge. Adopt Amendment 1 (§13) — bands full-bleed with
contents to 80rem — and make every section resolve to the same left edge as the
header. Prose measure narrows *inside* that column; it must not move the column.

### G3 — The empty band beneath the hero, quantified

Confirms §14 F3 with a measurement: an **~85px strip bounded by two hairline
rules** and containing nothing (visible in both screenshots between y≈563 and
y≈648). Cause is the doubled rule — `hero.tsx:11` `border-b border-rule` plus the
next `<Section rule={true}>`.

**Fix:** delete one rule. Do not fill the band.

### G4 — Mobile horizontal overflow (390px viewport)

Real bug, both themes: `document.scrollWidth` **400px** against a 390px viewport,
so the whole page scrolls sideways. Culprits, from the harness:

| Element | Width |
|---|---|
| `table.w-full.min-w-[640px]` (inventory) | **745px** |
| `div.…overflow-hidden.min-w-[640px]` (its wrapper) | 640px |
| two `<svg>` diagrams | **580px** each |

**Fix:** §5 already requires wide content to scroll *inside its own*
`overflow-x:auto` container. The wrapper has `overflow-hidden`, not `auto`, so
the table pushes the page instead of scrolling within itself. Give the diagrams
`max-width:100%` with `viewBox` scaling. Nothing but the intended scroller may
exceed the viewport.

### G5 — Heading hierarchy skips h2 → h4 on every case study

`/work/workflow-studio`, `/work/flowtrace`, `/work/pracharflow` all jump from
`h2` to `h4` at "Consequence & Verified Outcome" and again at "Active Roadmap".
Screen-reader users navigating by heading level lose the structure.

**Fix:** make them `h3`, or restructure so the level is earned. Purely a tag
change; the visual size is set by classes and need not move.

### G6 — Navigation label disagrees with itself

The header calls the section **"Values"**; the hero's inline nav calls the same
anchor **"How I Work"**; the section id is `#principles`. Three names, one
destination.

**Fix:** pick one. §3 specifies **"How I Work"**; the section id can stay
`#principles`.

### G7 — Light-mode HUD is a colour-temperature outlier

Visible in `home-light.png`: the hero panel is cool grey on warm cream — it reads
as pasted in from another site, because its palette *is* from another system
(§14 F2, raw `neutral-*`). In dark mode the mismatch largely disappears, which is
why this must be judged in light mode.

Superseded anyway by §14 F2: the panel's content is fabricated telemetry and it
should be removed or made real, not restyled.

### Priority order for these

1. **G4** mobile overflow — a broken page on phones, and cheap to fix.
2. **§14 F2** the fabricated HUD — highest credibility risk.
3. **G2 + §13** shared left edge and width — the "A4 document" complaint.
4. **G1** light-theme tonal range.
5. **G3, G5, G6** — small, quick, visible.
6. **§14 F4** palette guard + citation guard in CI, so none of this returns.

---

## 16. Review #4 — the proposed footer rebuild (2026-09-03)

An external agent proposed a four-column footer with copy-paste TSX. **Verdict:
adopt the structure, reject the code.** The diagnosis is largely right; the
implementation would reverse several fixes landed today and ship a dead link.

### Where the proposal is right

- **Remove the location from the copyright line.** Agreed — it is already in the
  hero, and the copyright line is not the place for it.
- **A footer project directory.** Agreed. A reader who has scrolled to the bottom
  is the most interested reader on the page and should not have to scroll back up.
- **The footer should feel like an anchor.** Agreed in principle — with the
  caveat in H3 below, because "deep structured technical console" is the exact
  reasoning that produced the fabricated HUD.

### Blocking defects in the proposed code

**H1 — Roughly 30 raw Tailwind palette values.** `neutral-100/200/300/400/500/
600/800/900/950` and `emerald-400/500/600` throughout. This is §5 check 1, the
single rule the project's whole visual argument rests on, and it would fail the
palette guard specified in §14 F4. Every colour must be a token.

> Note: the **current** footer already violates this — `components/footer.tsx:7`
> is `border-neutral-800 bg-neutral-950 text-neutral-400`. So this is a
> pre-existing defect the proposal preserves rather than introduces. Both need
> fixing. `bg-neutral-950` is also cool black against a warm-charcoal page
> (check 2).

**H2 — Two broken anchors.** The proposal links `#inventory` and `#values`.
Neither exists. The real ids, verified in `app/page.tsx`, are `work`,
`secondary`, `experience`, `principles`, `contact`. A footer whose links do
nothing is worse than no footer.

**H3 — Fabricated status line, again.**
`SYS_STATUS: NOMINAL · ZERO CLIENT-SIDE RUNTIME BLOAT`. Nothing measures
"NOMINAL", and the second half is **false** — the page ships client JavaScript
(`hero.tsx`, `tilt-card.tsx`, `theme-toggle.tsx` are all `"use client"`). This is
the same defect as the hero HUD and the `SkiaRenderer.java` citation: invented
instrumentation as decoration. Cut it.

**H4 — The Cal.com link is dead.** `https://cal.com/shivambhaipatel/intro`
returns **404** (checked). It is already in `content/site.ts:13`, and the
proposal promotes it to a prominent "Book Intro Call (20m)" call to action. Shipping
a 404 as your primary conversion CTA is worse than having no booking link.
**Either create the Cal.com event or remove the link from `site.ts`.** GitHub and
LinkedIn both resolve 200.

**H5 — Reintroduces the ragged left margin.** `max-w-6xl` is 72rem. §13 and G2
require every band to resolve to the same 80rem edge as the header. This would
re-open the defect fixed hours earlier.

**H6 — A directory where three of four entries go to the same place.** Workflow
Studio, FlowTrace and PracharFlow all link `#work`. Deep-link each to its case
study — `/work/workflow-studio`, `/work/flowtrace`, `/work/pracharflow` — which
is what a reader clicking a project name wants.

**H7 — Two factual errors in the labels.**
- *"FlowTrace / SyntraFlow"* — ~~SyntraFlow does not exist~~ **RETRACTED
  2026-09-04: SyntraFlow is the correct current name; the client renamed it from
  SyntraIntelli. My claim was based on stale memory and cost six correct strings
  on the live page before Shivam caught it. The *ownership* point below stands
  and was always the real issue.** SyntraFlow is
  the product built for FirstCron (client work); FlowTrace is the independent
  product. Merging the names re-imports precisely the client-IP confusion removed
  from agent-memory today. Label it **FlowTrace**, nothing else.
- *"DealDekho · Telemetry Platform"* — DealDekho is a **price-comparison
  aggregator**. It has nothing to do with telemetry.

**H8 — DealDekho must not be linked at all right now.** It is down (§4.1). The
§6 content model requires `live.status !== 'up'` to render without a link.

**H9 — Small regressions.** Hardcoded `© 2026` replaces the existing
`new Date().getFullYear()`. Emails and URLs are hardcoded rather than read from
`content/site.ts`, duplicating the single source of truth. The `href` values
arrive as `[https://…](https://…)` — Markdown link syntax that would ship
literally. And the proposal adds a *second* availability badge while its own
critique argues against redundancy.

### What to build instead

Four columns, same structure, all colours from tokens:

1. **Identity** — name, "Systems engineer", one-line description, copyright with
   a computed year. No location, no availability badge (the hero has it), no
   fake status string.
2. **Systems** — Workflow Studio, FlowTrace, PracharFlow deep-linked to their
   case studies. DealDekho listed **without a link** until it is redeployed.
3. **Navigation** — `#work`, `#secondary`, `#experience`, `#principles`,
   `#contact`, `/resume`. Use real ids.
4. **Connect** — GitHub, LinkedIn, email (all from `site.ts`), plus Cal.com
   **only once the event exists**.

Optional colophon: "Built with Next.js." Honest and checkable. Nothing about
bloat.

**Open question Q10:** `content/site.ts:8` uses `shivambhaipatel1997@gmail.com`;
the old live site uses `shivam25797@gmail.com`. Confirm which is canonical — a
portfolio should show the address you actually read.

---

## 17. SEO and machine-readability (2026-09-03)

### Current state: essentially nothing

Audited `app/layout.tsx` and the tree. Present: a title template and
`themeColor`. **Absent:** description, `metadataBase`, canonical, Open Graph,
Twitter card, OG image, `robots.txt`, `sitemap.xml`, JSON-LD, favicon, manifest,
`llms.txt`, per-route metadata. The description is a deliberate placeholder with
a comment saying real copy lands with the content work — correct call at the
time, now due.

### Be honest about the goal

This site will not rank for "java developer india". That term is owned by job
boards with millions of backlinks, and chasing it is wasted effort. The
achievable and genuinely valuable targets are:

1. **His name.** "Shivam Bhai Patel" must return this site first — above
   LinkedIn, GitHub and any namesake. A recruiter who has his CV *will* search
   the name. This is the single highest-value SEO outcome and it is winnable.
2. **His project names.** "Workflow Studio multi-agent", "FlowTrace ERP
   replay", "PracharFlow". Low competition, and someone searching these is
   already interested.
3. **Answer engines.** Increasingly a recruiter asks an assistant "who is this
   candidate, what have they built". That is what the AI-context work below is
   for, and it is the part most portfolios have not done.

**No keyword stuffing.** §9 governs: it would trip the same over-claiming
reflex the whole site is built to avoid, and modern ranking punishes it anyway.

### S1 — Core metadata (`app/layout.tsx`)

- `metadataBase: new URL("https://shivambhaipatel.com")` — required, or OG and
  canonical URLs render relative and break on every social platform.
- `description` — one sentence, ~155 chars, plain English, no buzzwords. Must
  survive a non-technical reader (see the recruiter review, §18).
- `alternates.canonical` per route. `trailingSlash: true` is set, so canonicals
  must match that form exactly or they self-conflict.
- `openGraph`: type `profile`, siteName, locale `en_IN`, title, description, url,
  images.
- `twitter`: `summary_large_image`.
- `robots`: `index, follow`, plus `googleBot` with `max-image-preview:large`,
  `max-snippet:-1` — otherwise Google may truncate the snippet in exactly the
  result that matters.
- `authors`, `creator`.
- **Per-route metadata on every `/work/*` page and `/resume`.** Generic
  inherited titles waste the pages most likely to rank.

### S2 — OG image

Recruiters share links in Slack, WhatsApp and email. A link with no preview card
looks broken. Generate with `next/og` `ImageResponse` at 1200×630: name, "Systems
engineer", and the project name on case-study routes. Site palette, no stock art.

> **Static export caveat:** `output: "export"` cannot render `ImageResponse` at
> request time. Generate at build into static files, or commit pre-rendered PNGs.
> Verify the built output actually contains them — a missing OG image fails
> silently and is only visible when someone shares the link.

### S3 — `robots.txt` and `sitemap.xml`

Use `app/robots.ts` and `app/sitemap.ts` (both work under static export).
Sitemap lists `/`, the three `/work/*` routes, and `/resume`, with real
`lastModified` values.

### S4 — Structured data (JSON-LD) — the highest-leverage item

This is what makes Google show a knowledge panel for his name, and what answer
engines read first. Inline `<script type="application/ld+json">`:

- **`Person`** on the home page — `name`, `jobTitle`, `url`, `image`, `email`,
  `sameAs` (GitHub, LinkedIn — this is how search engines *link the identities
  together*, and it is the mechanism behind ranking for his name),
  `worksFor`, `alumniOf`, `address` (Prayagraj, IN), `knowsAbout` (a real,
  short list — not 40 keywords).
- **`WebSite`** with `url` and `publisher`.
- **`SoftwareApplication`** or **`CreativeWork`** per case study —
  `name`, `description`, `author` (referencing the `Person`), `url`,
  `programmingLanguage`.
- **`BreadcrumbList`** on `/work/*`.

Every value must match visible page content. Structured data that contradicts
the page is a manual-action risk, and it is the same honesty rule as §9.

### S5 — AI and scraper context ("AI context")

Deliberate position: **he wants to be read by AI crawlers.** Most sites block
them; blocking here would be self-defeating, because the target reader
increasingly asks an assistant about a candidate before opening the site.

- **`/llms.txt`** — the emerging convention: a plain-Markdown summary at the
  root, written for a model rather than a browser. Who he is, what he has built,
  each project in two lines with its real constraint and decision, the stack,
  the contact routes, and links to the case studies. This is the file an
  assistant will quote when asked "what has this person built" — so it must be
  factual, specific and free of adjectives. Draft it from §4 of this spec, which
  is already written to that standard.
- **`robots.txt` explicitly ALLOWS** `GPTBot`, `ClaudeBot`, `PerplexityBot`,
  `Google-Extended`, `CCBot`, `Applebot-Extended`. State the intent in a comment
  so the choice reads as deliberate.
- **Semantic HTML, real text.** Nothing that matters may live only inside an
  image, a canvas, or a `::before`. The diagrams are inline SVG — good — but each
  needs `<title>`/`<desc>` so its meaning survives extraction.
- **Server-rendered content.** Static export already guarantees this; keep it
  that way. Anything rendered only after hydration is invisible to most
  scrapers.

### S6 — Hygiene

Favicon and `apple-touch-icon` (currently absent — the tab shows a blank page
icon, which reads as unfinished). `manifest.webmanifest`. `lang="en"` is set;
consider `en-IN`. Verify no `noindex` survives from development.

### S7 — What to measure after launch

Google Search Console verified; confirm the name query ranks first within a
fortnight. Test the OG card with a real share into Slack or WhatsApp before
announcing the site. Validate JSON-LD in the Rich Results Test. Re-run
Lighthouse SEO — target 100, which is achievable on a static site.

---

## 19. CONSOLIDATED STATE — read this before changing anything (2026-09-04)

Ten review messages have gone to the implementer. This section is the single
current statement of what is settled, what is protected, what was rejected, and
what is left. **Where this section disagrees with an older one, this wins.**

### 19.1 PROTECTED — do not change without asking

These survived review and several were singled out as the site's strongest
assets. Changing them is a regression, not an improvement.

| Protected | Why |
|---|---|
| **Case-study structure**: situation → constraint → decision → consequence | The recruiter called it "genuinely rare — better than most 10-year engineers produce" |
| **"Trade-offs & What's Left" sections** | Same. Admitted limitations are the strongest honesty signal on the site |
| **The plain-English lead sentences** on Workflow Studio, FlowTrace, PracharFlow | These do the first-filter job. A "tighter" rewrite was proposed and **rejected** — see 19.3 |
| **"I build the machinery other software runs on."** | The one line a non-technical person can repeat to a hiring manager |
| **The terminal / editorial aesthetic** | Well executed; lands with engineering managers. The objection was never the style |
| **Status labels** — "in redeployment", "cold start ~10 s" | Honesty mechanism. Removing them was proposed and **rejected** — see 19.3 |
| **`/resume.pdf`** — real 192 KB `%PDF-1.4` file | Verified working. Do not replace with a print-dialog flow |
| **Token palette + the six-colour system** | The whole anti-generic argument rests on it |
| **Skip link, one `h1` per route, accessible names, `rel="noopener"`** | Verified clean across 40 page loads. Do not regress |
| **`content/*.ts` as single source of truth** | Status flags and copy must stay data-driven, not hardcoded in markup |

### 19.2 SETTLED FACTS — do not re-derive or "correct"

| Fact | Status |
|---|---|
| Product for FirstCron is **SyntraFlow** | Renamed from SyntraIntelli. Anything saying SyntraIntelli is **stale**. Confirmed by Shivam 2026-09-04 |
| **FlowTrace ≠ SyntraFlow** | FlowTrace is Shivam's own product; SyntraFlow is the client's. Never aliases, never a slash |
| **FlowTrace is NOT used in SyntraFlow, and is not deployed at FirstCron** | Confirmed by Shivam 2026-09-04. SyntraFlow has its **own separate** recorder/replayer. FlowTrace is an internal tool intended for the **enterprise automation platform** (SAP / Oracle / ERP) — and that integration is **planned, not shipped**, so it may only ever appear in future tense. The "50+ business entities" figure belongs to the FirstCron engagement in the experience section, never attached to FlowTrace. *Merged three times now — treat any sentence containing both names as stop-and-ask.* |
| **Workflow Studio: "used on" ≠ "imported by"** | Two distinct relationships, never to be blurred. **USED ON** — it is a development-time tool run while *building* FlowTrace, PracharFlow and the enterprise platform; those repos keep a `.workflowstudio/` directory but contain no Workflow Studio code and do not depend on it at runtime. **IMPORTED BY** — exactly one product depends on it as a library: **TradeSense** (`tradesense/package.json`, finance nodes on the DAG runtime). Listing projects that merely *used* the tool alongside the one that *imports* it would weaken the rare claim by diluting it into the common one |
| **FlowTrace ↔ enterprise platform: NOT integrated** | Confirmed 2026-09-04. Both sides are built: FlowTrace recorder + replayer tested standalone and working; the platform's UI and backend built, with login and dashboard tested. **The API bindings between them are unwritten** — Shivam estimates ~4–5 hours, his goal for the weekend of 2026-09-05. Never "integrated", "powering", "deployed within" or "runs on top of" until it lands |
| **PracharFlow: Telegram tested, WhatsApp coded but untested** | Confirmed 2026-09-04. Accurate wording: "Delivered over Telegram in production. WhatsApp delivery is implemented; end-to-end testing is pending." Distinguishing *written* from *tested* is a credibility asset, not a weakness |
| **Electron packages the FlowTrace desktop build** | Confirmed 2026-09-04 — Windows executable/installer and macOS DMG. Stack chip is correct |
| **SQLite WAL is real** | Verified in source: `workflow-studio/src/engine/db.ts:559` runs `pragma('journal_mode = WAL')`. Keep the label |
| Reflexis: **Nov 2021 – Mar 2024**; Consulting: **Apr 2024 – Present** | Confirmed. FirstCron ongoing; SamMegh contract Dec 2024 – Sep 2025 |
| **800 ms → 300 ms belongs to SamMegh only** | FirstCron pipeline work is a *different task*; must not borrow the number |
| **"Available within 1 week · Full-time / Contract"** — exact wording | Not "0-day", not "immediate joiner". **No explanatory clause** — a "currently on a per-day contract" note was proposed and dropped 2026-09-04: a recruiter can read it as a *preference* ("does contract work, not available full-time") rather than as a circumstance. The line needs no justification |
| **All GitHub repos are private** (five checked, all 404) | Quoted-artefact evidence cannot be presented as reader-verifiable |
| Hero total reads **"four years"** | Conservative and safe. Do not inflate |
| **"Open to relocation anywhere in India — or remote"** | Confirmed by Shivam 2026-09-04. **Name no city.** "Bangalore" was an *inference* written as a claim; it is also narrower than the truth and filters him out of Hyderabad / Pune / NCR / Chennai roles. Lead with mobility, not with his base city — "Prayagraj" first triggers the Tier-2 geographic discount |
| `cal.com/shivambhaipatel/intro` is **404** | Link must not ship until the event exists |

### 19.2b THE RULE THAT KEEPS BEING BROKEN — facts only Shivam owns

Three times in one day a claim about Shivam's *life* was written onto the page
without him saying it: "0-day notice", "Open to Bangalore", and (earlier) the
invented telemetry and citation. The Bangalore case is the instructive one,
because the inference was **reasonable and roughly true** — which makes it
harder to catch, not less serious.

**Anything about where he will live, when he can start, what he is paid, what he
will accept, who he has worked for, or what he is willing to do is a fact only he
owns.** It cannot be inferred, reasoned toward, or filled in from context. If it
is not in writing from him, leave the field out or ask. A plausible guess is the
worst outcome available: it is invisible until a recruiter asks him about it in a
call and he does not recognise his own portfolio.

This applies with equal force to review suggestions. A reviewer proposing "add
0-day notice" or "say Bangalore" is proposing **content about his life**, not
copy — it routes to Shivam, never straight to the page.

### 19.3 REJECTED PROPOSALS — do not action if re-circulated

1. **Strip the "in redeployment" / "cold start" labels.** Removing the label
   while keeping the link sends recruiters to a dead page — strictly worse. The
   honest options are fix the deploy, or drop the project from the primary
   inventory. Shivam's call.
2. **The "tighter HR-friendly lead"** ("Developer Productivity Infrastructure:
   a multi-agent orchestration engine…"). More jargon, not less; contradicts its
   own reviewer's advice. Current sentence stays.
3. **"0-day notice / immediate joiner."** Overstates a genuinely strong
   position and invites correction at offer stage.
4. **The verbatim footer TSX** (§16). Structure adopted; code rejected — raw
   palette, broken anchors, fabricated status line, dead Cal.com CTA, 72rem width.
5. **Live client-side status fetching.** CORS makes it unreliable and it breaks
   `window.open`. Build-time probe plus optional Worker instead (§17 / the
   link-status design).

### 19.4 OPEN QUEUE — in order

1. J2 — remove the 800/300 line from the FirstCron block; grep for a third copy
2. H1 — availability wording in the recruiter card
3. J5 — "Archived" contradicts the FlowTrace case study
4. J6 — "50+ entities" → "50+ business entities at a single client"
5. G4 + J9 — mobile horizontal overflow (400px at a 390px viewport) and the clipped theme toggle
6. G2 + §13 — one shared left edge; bands full-bleed to 80rem
7. G1 — light-theme tonal range (five of six sections are transparent)
8. G3, G5, G6 — doubled rule under the hero; h2→h4 skips; nav naming
9. A2 — Enterprise Platform over-claim
10. CI guards — palette guard and citation resolver
11. §17 — SEO and `llms.txt`, JSON-LD first

### 19.5 BLOCKED ON SHIVAM

- Cal.com: create the event or remove the link.
- Canonical email: `shivambhaipatel1997@` (in `site.ts`) vs `shivam25797@` (old site).
- DealDekho: redeploy before launch, or move it out of the primary inventory.
- Real figure for the FirstCron pipeline improvement, if one exists.
- Reflexis baseline volume, if he can source and defend it.
- Whether to make a repo public or publish `@workflow-studio/core` to npm —
  the single highest-leverage credibility fix available (§18 / recruiter #1).

---

## 13. Amendment 1 — page width and chrome (2026-09-03)

Raised by Shivam on seeing the build: it reads as a desktop page squeezed into an
A4 document. **He is right, and this is a defect in §5, not in the
implementation.** "Single measured column, ~68ch for prose. Not a full-bleed
1440px grid" was my rule; it was implemented faithfully (`wide` = 72rem = 1152px
for every band, `shell` = 80rem for header and footer).

**What went wrong in the reasoning.** A 68ch measure is correct for *running
prose* and I over-generalised it into a rule for the *page*. A portfolio home
page is not an essay: it carries a hero, architecture diagrams, an evidence
table, and a project inventory, none of which obey a reading measure. Applying
one measure to all of it produces the document look — and a document is the one
thing a portfolio must not be mistaken for, because "first impression" is the
whole job of the page.

**The amendment.** Keep the editorial character; stop letting the reading measure
govern structure.

| Element | Before | After |
|---|---|---|
| Running prose, case-study body | 68ch | **68ch — unchanged.** This part was right. |
| Section bands, project cards, inventory table | 72rem | **full-bleed background, contents to 80rem** |
| Architecture diagrams | 72rem | **up to 90rem**; they are the widest thing on the page and should feel it |
| Hero | 72rem | **80rem**, with the claim itself still breaking at ~20ch so it stays a shape, not a line |
| Header / footer | 80rem | unchanged |

The test: on a 1920px display the page must not look like a sheet of paper
floating on a background. Bands should touch both edges; only the *text inside
them* should be measured.

### Chrome — what the page needs, decided

Shivam asked whether it needs a header, sidebar, footer, contact and messaging.
Answers, with reasons:

- **Header — yes, and it exists.** Keep it. A portfolio without navigation makes
  the reader scroll to find out whether there is anything worth scrolling for.
- **Footer — yes, and it exists.** Repeat the contact routes there; the footer is
  where a convinced reader looks.
- **Sidebar — no.** It adds chrome without content and is the shape of an app,
  not a portfolio. **Instead:** a sticky marginalia rail on wide viewports
  showing section position, which §5 already calls for and which does the useful
  half of a sidebar's job.
- **Contact section — yes, and it exists. No form.** §4.7 stands: nobody senior
  fills a four-field form, and it costs a server route, a dependency and a spam
  surface. Make the routes unmissable instead — email as a large direct link with
  copy-to-clipboard, LinkedIn, GitHub, and a booking link if Shivam wants one.
- **Messaging / live chat — no.** A chat widget on a personal portfolio signals
  "vendor", is unstaffed the moment he is asleep, and is third-party JS on a page
  whose whole argument is craft.

**Still blocking, unchanged:** Q8 (real employment dates). Shivam has said the
timeline is a simple date correction and not a concern — but the dates themselves
have not yet been supplied, so §4.6 cannot be written. Everything else in P2/P3
can proceed around it.

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

### 4.6 Experience — carry over verbatim

Reused from `portfolio-site/src/components/sections/Experience.tsx`. These are
specific and metric-bearing; they are the strongest thing on the current site.

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
3. **Q3** — Is there an up-to-date `resume.pdf`? The current site links `/resume.pdf`; it needs to match the new positioning.
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

_(empty)_

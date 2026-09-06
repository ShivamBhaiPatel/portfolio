# Standing decisions

What was chosen, what was rejected, and why. Read this before changing anything
structural — several of these were reversed at least once by someone who did not
know the reason, which is why the file exists.

---

## Content

### Every quoted artefact is real

Where the site shows code with a file path and a line number, that file contains
those characters at that line. A quote block is a **factual claim about a file**.

This was broken four times: a citation to `SkiaRenderer.java`, a file that does
not exist; a `README.md:12` reference where the text was at lines 84–85; a
paraphrase presented under a "Verbatim Code Evidence" heading; and a `link:` path
quoted as the *corrected* value while the repository still held the broken one.

**Finding the line is not the same as verifying the behaviour.** "SQLite WAL" was
confirmed on the strength of finding `pragma('journal_mode = WAL')` in the
source — but the engine runs sql.js in memory, so the pragma is a no-op the
author knowingly left in. The label now reads "SQLite persistence".

Before any performance, durability or concurrency claim ships, confirm the
mechanism actually takes effect.

### No invented instrumentation

Removed: a hero panel reporting `SYS_NODE_PRAYAGRAJ`, `PING: 14ms`,
`SECURE_IPC_BRIDGE` and `ACTIVE (99.99% UP)`; a footer line reading
`SYS_STATUS: NOMINAL · ZERO CLIENT-SIDE RUNTIME BLOAT` (also false — the page
ships client JS); a `VERIFIED 2026` badge with no issuing body; and a self-awarded
`100/100 ATS Score`.

These are decoration shaped like evidence. On a page whose argument is that the
work is checkable, they are self-refuting — and a reader who *does* build
monitoring systems recognises a fake instrument panel on sight.

### Facts about a person come from that person

Anything about where Shivam will live, when he can start, what he is paid, what
he will accept, or who he has worked for **cannot be inferred**, however
reasonable the inference looks.

"Open to Bangalore" was reasoned from his willingness to relocate and written as
a commitment. It was also *narrower than the truth* — he is open to anywhere in
India — so the invented specific would have filtered him out of roles. The same
applies to review suggestions: a reviewer proposing "add 0-day notice" is
proposing content about his life, not copy.

### Verification status is stated, not blurred

Work that is written but untested, or built but not integrated, says so:
PracharFlow's WhatsApp delivery is implemented with end-to-end testing pending;
FlowTrace and the enterprise platform are each built and tested standalone with
integration outstanding.

This is a **credibility asset**. "Two systems, each independently tested,
integration pending" is a state every hiring manager has lived. What is not
survivable is implying the integration exists, because the follow-up question is
always "walk me through how they talk to each other".

### Project separation

- **FlowTrace** is Shivam's own product. **SyntraFlow** is FirstCron's product,
  with its own separate recorder/replayer. They are not aliases and never share
  a sentence. Merged three times; treat any sentence containing both as
  stop-and-ask.
- **SyntraFlow** is the current name — renamed from *SyntraIntelli* because the
  old name was hard to pronounce. Notes saying SyntraIntelli are **stale, not
  correct**; do not "fix" the current name backwards.
- **Workflow Studio** has two distinct relationships with the other projects.
  It is **used on** FlowTrace, PracharFlow and the enterprise platform as a
  development-time tool — those repos keep a `.workflowstudio/` directory but
  contain no Workflow Studio code. It is **imported by** exactly one product:
  TradeSense. Listing projects that merely *used* the tool alongside the one that
  *imports* it dilutes a rare claim into a common one.

### Status labels are honest

DealDekho shows *In redeployment*, not *Archived* and not a bare link. Removing
the label while keeping the link was proposed and rejected: the reader then
clicks through to a dead page and concludes the work is abandoned, which is
exactly what the label prevents. A label changes when the **deployment** changes.

---

## Design

### The six-token palette

Every colour comes from six tokens. If a hex is greppable in Tailwind's default
palette, it does not belong here.

This is the rule the whole anti-generic argument rests on. Generated portfolios
share a palette because it is what the framework hands you, so a reader who has
seen four of them recognises the fifth before reading a word. The problem is not
that those colours are ugly — it is that they are *nobody's*.

Also prohibited: gradients as decoration, glassmorphism, emoji as UI, Inter as a
display face, and a uniform grid of identical cards.

### Measure governs text, not layout

A ~68ch measure is right for running prose and was wrongly generalised to the
whole page, producing a document-like column with large empty margins. Prose
stays at 68ch; bands go full-bleed with contents to 80rem; diagrams may go wider.
**Every section resolves to the same left edge as the header** — a wandering left
margin is the first thing a trained eye catches.

### No contact form

Nobody senior fills a four-field form, and it costs a route, a dependency and a
spam surface. Email, LinkedIn, GitHub and the résumé instead. No live chat
either: it signals *vendor*, and it is unstaffed whenever he is asleep.

### No sidebar

It is the shape of an app, not a portfolio, and adds chrome without content. A
sticky marginalia rail does the useful half of the job.

---

## Technical

### Static export

`output: "export"`. A route that cannot be statically rendered fails the build
rather than failing silently at deploy.

This has teeth. `/api/v1/ats/audit` exported a `POST` handler, which forced the
whole route dynamic — so under static export it was **not emitted at all**, and
the endpoint the ATS drawer advertises in its footer would have 404'd in
production while working perfectly in `next dev`. The POST handler was removed.
Per-request auditing would need a real server, not a route handler in this build.

### `content/` is the single source of truth

Adding or changing a project must not require touching a component — including
its live/down status, which is data, not markup. A hardcoded status in two places
is how a card saying "in redeployment" ends up next to a footer link that 404s.

### Trailing slashes

`trailingSlash: true`, so sitemap URLs and canonicals must carry the slash.
Without it every sitemap entry resolves via a 308 and disagrees with the page's
own canonical tag.

### AI crawlers are allowed deliberately

`robots.txt` names GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot and
others explicitly, and `/llms.txt` is a plain-text summary for them. Most sites
block these. Blocking here would be self-defeating: the target reader
increasingly asks an assistant about a candidate before opening the site.

`llms.txt` is held to the same standard as the site. It was once written in
Windows-1252 and opened with a replacement character — in the one file whose
entire purpose is machine-reading.

### SEO targets

The site will not rank for "java developer india"; job boards own that. The
winnable targets are **his name** — a recruiter holding his CV will search it,
and this site must come back above LinkedIn and GitHub — his **project names**,
and **answer engines**. The highest-leverage item is JSON-LD `Person` with
`sameAs` pointing at GitHub and LinkedIn: that is the mechanism by which search
engines link the identities to one person.

---

## Repository

- Branches are `main` and `development`. Work on `development`; `main` receives
  merges and is what Netlify deploys.
- **No commit trailers.** No `Co-Authored-By`, no generator attribution. The
  authorship is Shivam's alone.
- The repository is **private**, and `PORTFOLIO_SPEC.md` is the reason it should
  stay that way until that file is removed or relocated — see `docs/README.md`.

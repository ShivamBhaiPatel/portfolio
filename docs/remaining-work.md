# Remaining work

The site is live at https://shivambhaipatel.com and passing its checks. Nothing
below blocks it being seen; everything below is worth doing before it is
actively announced or linked from applications.

Verified state as of 2026-09-04, measured with a headless-browser harness across
5 routes × 4 viewports × 2 colour schemes (40 loads) against production:
all 200s, **zero** horizontal overflow, **zero** console errors, **zero** page
errors, **zero** WCAG AA contrast failures, one `<h1>` per route, no heading-level
skips, no images missing `alt`, no links without an accessible name.

---

## 1. Raw framework palette values — the largest outstanding item

About **60 raw Tailwind default utilities** remain across ten files:
`text-neutral-400` (×12), `text-neutral-900` (×6), `text-neutral-300` (×5),
`border-neutral-300` (×5), `bg-emerald-500/400` (×6), `text-amber-400`, plus
gradient stops `from-neutral-800`, `via-neutral-800`, `via-neutral-200`.

Files: `header.tsx`, `hero.tsx`, `section.tsx`, `experience-section.tsx`,
`project-flagship.tsx`, `resume-modal.tsx`, `resume-sheet.tsx`, `latex-modal.tsx`,
`ats-audit-drawer.tsx`, `app/page.tsx`.

Replace each with a token. The gradient stops additionally break the
no-decorative-gradients rule. See `decisions.md` for why this rule carries the
weight it does.

## 2. Light-theme tonal range

Four of six sections still render on a single surface, so the light theme has
lightness without range. Text contrast is fine — this is about **surface
separation**, not legibility, and a global contrast adjustment would be the wrong
fix. Dark mode does not have this problem; do not "fix" both at once.

Approach, adding no new palette values: promote `--ink` to a *surface* for one or
two full-bleed bands (the flagship band and the contact plate are the
candidates), add a `--paper-sunk` below paper for inset areas, and widen the
`paper`/`raised` gap slightly. All derivable with `color-mix`.

## 3. CI guards — overdue

Two scripts that convert editorial rules into machine-enforced ones:

- **Palette guard** — fail the build if any `neutral-|slate-|gray-|zinc-|
  emerald-|indigo-|violet-|red-|amber-` utility appears in source.
- **Citation resolver** — parse the citation strings out of `content/`, resolve
  each path, and assert the quoted text appears at the cited line.

Both defect classes recurred repeatedly under human review. The citation resolver
alone would have caught four separate defects automatically. These should land
before the palette work, so the cleanup stays clean.

## 4. SEO — structured data first

Present: `robots.txt` (AI crawlers explicitly allowed), `sitemap.xml` with
trailing slashes, `llms.txt`, `icon.svg`.

Missing, in leverage order:

1. **JSON-LD `Person`** with `sameAs` → GitHub and LinkedIn. This is how search
   engines link the identities to one person, and it is what makes the *name*
   query rank. Highest-value item on this page.
2. `metadataBase`, a real one-sentence `description`, canonicals, and per-route
   metadata on the three case studies and `/resume` — those are the pages most
   likely to rank, and generic inherited titles waste them.
3. **OG image** (1200×630). Recruiters share links in Slack and WhatsApp; a link
   with no preview card looks broken. Note that `output: "export"` cannot render
   `ImageResponse` at request time — generate at build or commit pre-rendered
   PNGs, then verify they exist in `out/`. A missing OG image fails silently.
4. `apple-touch-icon`, `manifest.webmanifest`.

## 5. Status worker

Written, not deployed. Three steps in [`status-worker.md`](./status-worker.md).

## 6. `netlify.toml`

Build settings currently live only in the Netlify dashboard, so they are not
reproducible from the repository. Add build command, `publish = "out"`, and a
**pinned Node version** — an unpinned Node is the most common cause of a
first-deploy failure after a Node major release.

---

## Owner actions — not code

| Item | Why it matters |
|---|---|
| **DealDekho redeploy** | Built and largely complete (62 passing API tests); down for hosting reasons. Flip `live.status` to `"up"` in `content/projects.ts` once the URL is live. |
| **Cal.com** | `cal.com/shivambhaipatel/intro` returns **404**. Either create the event or remove the link from `content/site.ts` — a dead booking link is worse than none. |
| **Canonical email** | `content/site.ts` uses `shivambhaipatel1997@gmail.com`; the old site used `shivam25797@gmail.com`. Confirm which is read. |
| **PracharFlow "under 150ms"** | Unsourced. Needs percentile, hardware and output size, or state it qualitatively — an interviewer will ask. |
| **Reflexis baseline volume** | "+30% throughput" and "−25% defects" have no baseline. Real, defensible figures would turn an internal utility into Tier-1 scale. Do not estimate. |
| **Make one thing openable** | All five repos are private, so quoted excerpts cannot be verified by a reader. Publishing `@workflow-studio/core` to npm, making one repo public, or recording a 90-second capture of FlowTrace healing a selector was rated the single highest-leverage credibility fix available. |

---

## Deliberately not doing

- A contact form, or live chat.
- A sidebar.
- Client-side link probing at click time.
- Tunnel-status health checks.
- Removing honest status labels.

Reasons for each are in [`decisions.md`](./decisions.md).

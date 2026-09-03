# shivambhaipatel.com

Personal site and engineering portfolio for **Shivam Bhai Patel** — systems
engineer. Live at **https://shivambhaipatel.com**.

A static Next.js site with three case studies, a résumé page with an ATS audit,
and a machine-readable summary at `/llms.txt`.

---

## Why it is built the way it is

Most developer portfolios are recognisable within a second — dark navy canvas,
indigo gradient, glassmorphism, Inter, a grid of identical rounded cards. That
look is what a framework hands you by default, so a reader who has seen four of
those pages recognises the fifth before reading a word.

This site is built against that. Two rules do most of the work:

**Every colour comes from a six-token palette.** If a hex is greppable in
Tailwind's default palette, it does not belong here. Warm paper `#F7F5F0` and
graphite `#16150F` in light, warm charcoal `#14130F` in dark. Never slate.

**Every quoted artefact is real.** Where the site shows a line of code with a
file path and a line number, that file contains those characters at that line.
A quote block is a factual claim about a file, and a fabricated one is
self-refuting on a page whose whole argument is that the work is checkable.

Both rules are enforced in CI rather than by review, because both were broken
more than once while the site was being written.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router), `output: "export"` — fully static |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4, CSS-first `@theme` tokens |
| Fonts | Fraunces (display), Instrument Sans (body), JetBrains Mono (technical) — self-hosted via `next/font` |
| Diagrams | Hand-authored inline SVG, themed with `currentColor` |
| Package manager | pnpm |
| Hosting | Netlify, deployed from `main` |

No component library, no animation library. The site is roughly a dozen
components; a design system would be more code than the site.

---

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts:

```bash
pnpm build      # production build → ./out
pnpm typecheck  # tsc --noEmit
pnpm lint       # eslint
```

`pnpm build` must pass locally before anything is pushed. The site is a static
export, and a route that cannot be statically rendered fails the build rather
than failing silently at deploy time.

---

## Layout

```
app/                  Routes. Home, /resume, /work/[slug], /styleguide,
                      and a build-time JSON endpoint at /api/v1/ats/audit
components/           ~a dozen components, no barrel files
content/              Single source of truth — projects, experience, résumé, site
packages/ats-engine/  Résumé ATS analysis, used at build time
public/               resume.pdf, robots.txt, sitemap.xml, llms.txt
styles/globals.css    Design tokens
PORTFOLIO_SPEC.md     The specification, review history and standing decisions
```

`content/` drives the pages. Adding or changing a project should not require
touching a component — including its live/down status, which is data, not markup.

---

## A note on `/llms.txt`

`public/llms.txt` is a plain-text summary written for language models and other
automated readers, following the emerging `llms.txt` convention. `robots.txt`
explicitly allows AI crawlers, which is a deliberate choice: this is a portfolio,
and being read, cited and summarised is the point.

It is maintained by hand and held to the same standard as the site — claims
stated at the level they can be defended, and unfinished work labelled as
unfinished.

---

## Specification

`PORTFOLIO_SPEC.md` is the working document behind this site: positioning,
content inventory with verification status, the design system and its
anti-pattern list, the review history, and the standing decisions about what may
and may not change. Read it before making a substantive change.

---

## Licence

Content, copy and résumé are © Shivam Bhai Patel, all rights reserved. The code
is not currently offered under an open-source licence.

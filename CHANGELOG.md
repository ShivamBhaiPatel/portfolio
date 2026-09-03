# Changelog

All notable changes to this site are recorded here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning is [Semantic Versioning](https://semver.org/spec/v2.0.0.html), where
a minor bump means new content or a section, and a patch means corrections and
fixes.

## [Unreleased]

### Planned
- Light-theme tonal range — five of six sections currently render on a single
  surface, leaving the page visually flat in light mode.
- Replace remaining raw Tailwind palette utilities with design tokens, then
  enforce with the CI palette guard.
- JSON-LD `Person` structured data with `sameAs`, and Open Graph images.
- Cloudflare Worker for live project status, layered over the build-time probe.

## [0.1.0] — 2026-09-04

First release. Replaces the previous portfolio, which presented a generic
"Java Backend Engineer" profile and omitted the work worth showing.

### Added
- Home page: hero, recruiter summary card, three flagship case studies,
  secondary project inventory, experience, working principles, contact.
- Case studies for **Workflow Studio**, **FlowTrace** and **PracharFlow**, each
  following situation → constraint → decision → consequence, with an inline SVG
  architecture diagram and verbatim excerpts from the real source files.
- `/resume` page with an ATS format audit, and a downloadable PDF at
  `/resume.pdf`.
- Build-time JSON endpoint at `/api/v1/ats/audit`.
- `/styleguide` route rendering the design tokens, type scale and a live
  contrast table.
- Design system: six-token warm palette, light and dark, with self-hosted
  Fraunces, Instrument Sans and JetBrains Mono.
- `public/llms.txt` — plain-text summary for automated readers.
- `robots.txt` explicitly allowing AI crawlers, and `sitemap.xml`.
- Skip-to-content link, one `<h1>` per route, accessible names throughout.

### Fixed
Corrections made during pre-launch review, recorded because most were factual
rather than cosmetic:

- Removed a fabricated code citation pointing at a file that does not exist.
- Removed a simulated telemetry panel reporting invented uptime, latency and
  node identity.
- Removed a self-awarded "100/100 ATS Score" badge with no issuing body.
- Corrected `@workflow-studio/core` claim from "extracted the entire core" —
  the boundary is a compiler-enforced re-export barrier, not a file move.
- Corrected the `link:` path quoted from `tradesense/package.json` and fixed the
  underlying dependency, which did not resolve.
- Attributed the ~800ms → <300ms latency work to the correct client; it had
  appeared under two different clients on two pages.
- Separated **FlowTrace** (own product) from **SyntraFlow** (client product);
  they had been presented as one system.
- Corrected PracharFlow delivery status — WhatsApp is implemented but not yet
  end-to-end tested.
- Replaced "SQLite WAL" with "SQLite persistence": the engine runs sql.js in
  memory, so the WAL pragma is a no-op.
- Replaced "Immediate (0-Day Notice)" with "Available within 1 week", and an
  inferred city with the confirmed "open to relocation anywhere in India".
- Removed unfalsifiable adjectives — "zero-trust cryptographic verification",
  "100% deterministic pixel-perfect", "lossless task decomposition".
- Fixed horizontal overflow at 390px, heading levels skipping `h2` → `h4` on
  case studies, and a contrast failure on the terminal band.
- Fixed `pnpm-workspace.yaml`, which carried an unresolved scaffold placeholder
  and failed every production build.
- Removed the `POST` handler from the ATS route: it forced the route dynamic, so
  under static export the advertised endpoint would have 404'd in production
  while working in development.
- Fixed `llms.txt`, which was written in Windows-1252 and produced a replacement
  character in the first line of a file meant to be machine-read.
- Sitemap URLs now carry trailing slashes, matching `trailingSlash: true`.

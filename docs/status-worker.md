# Project status: the two-layer design

Every project on the site shows a status — *Live*, *In redeployment*, *cold start
~10 s*. This is how that works, what is built, and what is left.

**Current state: layer 1 is live and working. Layer 2 is written but not
deployed.** The site is running correctly on build-time status; the freshness
layer is simply switched off. Nothing is broken.

---

## The requirement

Every project renders as a link, but a visitor must **never** land on an error
page. A project that is down should say so in place, rather than opening a dead
tab.

## Why the obvious approach does not work

The first instinct is to check each link from the browser when the reader clicks
it. That fails three ways, and all three were established before the current
design was chosen:

1. **CORS.** A browser `fetch` from our origin to `deal-dekho.vercel.app` is
   blocked. With `mode: "no-cors"` the response is *opaque* — status is always
   `0` and unreadable. A hard connection failure can be detected because the
   promise rejects, but a healthy 200 cannot be told apart from a 500. That is
   exactly the false-green this system exists to prevent.
2. **Popup blocking.** `window.open` called after an `await` is no longer
   attributed to the user gesture, so blockers eat it. The reader clicks a
   *working* project and nothing happens — a worse bug than the one being fixed,
   and it hits the good links rather than the broken one.
3. **No server.** `next.config.ts` sets `output: "export"`. There are no route
   handlers at request time and nowhere to proxy a check through.

## The design

**Layer 1 — build-time probe (live).** Status is baked into
`content/projects.ts` and rendered server-side. Correct at deploy, instant,
present in the HTML, works with JavaScript disabled, never a spinner.

**Layer 2 — Cloudflare Worker (written, not deployed).** After paint, the page
asks the worker for current status and updates only what differs.

The layering is the point, not an implementation detail. If the worker is down,
rate-limited, slow or blocked, the page silently keeps the build-time value.
`lib/use-system-status.ts` enforces this: a 2-second `AbortController` timeout
and a `.catch()` that does nothing. No spinner, no error state, no layout shift.
That is the difference between adding a feature and adding a dependency.

**Click behaviour.** Every project renders as a link. If the current status —
baked, or upgraded by the worker — is down, the click is intercepted and shows
the status inline instead of navigating. If it is up, there is no interception
and no delay.

## Why Cloudflare Workers

Three of the projects already sit behind Cloudflare, and the free tier is 100k
requests/day with no cold start. Cloud Run and Lambda both work but add cold
starts and more setup for what is one `fetch` and a cache write.

**A worker is just an HTTPS endpoint — hosting the site on Netlify is
irrelevant.** It only needs CORS permitting the site origin.

> Optional improvement, not done: if apex DNS moved to Cloudflare (proxied), a
> worker route on `shivambhaipatel.com/api/status/*` with all other paths passing
> through to Netlify would make the call same-origin and remove CORS entirely,
> while the site still deploys to Netlify exactly as now. The apex is **not**
> currently on Cloudflare — verified, no `CF-RAY` header — so this is a DNS
> change, not a given.

## Security: the constraint that is not optional

`packages/status-worker/index.ts` probes a **fixed allowlist compiled into the
worker**. It must never fetch a URL supplied by query string, header or body.

A worker that fetches whatever it is handed is an **open proxy** — it can be
pointed at internal or cloud-metadata addresses and used to launder traffic
through this domain. This is the most common way this exact pattern is abused.
The allowlist is the control. Do not add a `?url=` parameter for convenience.

## One thing that must not be built

**Do not probe Cloudflare tunnel status as the health signal.** `cloudflared`
maintains its connection to the edge independently of whether the service behind
it is alive. When the app crashes, the tunnel stays connected and Cloudflare
returns 502 or error 1033 — so a tunnel-status check reports *healthy* while the
app is *broken*.

That is a false green, and it is precisely the failure mode FlowTrace's case
study claims to have solved. Probe the HTTP endpoint and require a 2xx: one
check that catches a dead app, a dead tunnel and a dead host. Note also that two
of the targets are not tunnelled at all — the enterprise platform is direct
Netlify, DealDekho is Vercel — so plain HTTP probing is required regardless.

---

## What is left — three steps

1. **Deploy the worker.**
   ```bash
   cd packages/status-worker
   npx wrangler deploy
   ```
2. **Set the endpoint in Netlify.** Environment variable
   `NEXT_PUBLIC_STATUS_ENDPOINT` = the deployed worker URL, then redeploy.
   `lib/use-system-status.ts` returns early when this is unset, which is why the
   upgrade layer currently does nothing. **This is the only reason it is off.**
3. **Tighten CORS.** The worker currently returns
   `Access-Control-Allow-Origin: "*"`. Narrow it to the site origin — the design
   called for the origin, not a wildcard.

### Also worth doing

- **Cache results** in the Workers Cache API or KV with a ~5 minute TTL. Do not
  probe upstream on every request; a portfolio does not need per-visitor probing
  and it would look like abuse to the targets.
- **Treat a 2xx slower than ~3 s as up-but-slow**, so the enterprise platform's
  cold start surfaces honestly. It returns 200 but took **9.3 seconds** when
  measured — a visitor staring at a blank tab for ten seconds assumes it is
  broken.
- **Add a scheduled rebuild** (nightly GitHub Action). It refreshes the baked
  layer so the no-JS and worker-down paths do not drift, and it is what fails the
  build when a link marked `up` is actually dead.

## Files

| Path | Role |
|---|---|
| `content/projects.ts` | Layer 1. `live.status` drives the label and whether a link renders. Single source of truth. |
| `lib/use-system-status.ts` | Layer 2 client. Baked defaults, 2 s timeout, silent fallback. |
| `packages/status-worker/index.ts` | The worker. Fixed allowlist, CORS, `/status` and `/api/status`. |
| `packages/status-worker/wrangler.toml` | Deploy config (`portfolio-status-probe`). |

When DealDekho is redeployed, flipping `live.status` from `"down"` to `"up"` in
`content/projects.ts` re-enables the link in the project card *and* the footer.
One line, no markup edit, no forgotten anchor.

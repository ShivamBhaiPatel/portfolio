/**
 * Cloudflare Worker for System Link Health Probing
 *
 * Fixed target allowlist to prevent open-proxy / SSRF abuse.
 * Deployed with: npx wrangler deploy
 */

interface Env {}

const ALLOWED_TARGETS: Record<string, string> = {
  "workflow-studio": "https://workflow.shivambhaipatel.com",
  "pracharflow": "https://prachar.shivambhaipatel.com",
  "tradesense": "https://tradesense.shivambhaipatel.com",
  "enterprise-platform": "https://enterprise-platform.netlify.app",
  "dealdekho": "https://deal-dekho.vercel.app",
};

export default {
  async fetch(request: Request, env: Env, ctx: unknown): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    if (url.pathname !== "/status" && url.pathname !== "/api/status") {
      return new Response("Not Found", { status: 404 });
    }

    const now = new Date().toISOString();
    const entries = Object.entries(ALLOWED_TARGETS);

    const systems = await Promise.all(
      entries.map(async ([slug, targetUrl]) => {
        const start = Date.now();
        try {
          const res = await fetch(targetUrl, {
            method: "HEAD",
            headers: { "User-Agent": "CF-Worker-Health-Probe/1.0" },
            redirect: "follow",
          });
          const elapsed = Date.now() - start;

          if (res.ok) {
            return {
              slug,
              url: targetUrl,
              status: elapsed > 3000 ? "slow" : "up",
              latencyMs: elapsed,
              note: elapsed > 3000 ? `Live (cold start ~${Math.round(elapsed / 1000)}s)` : "Live",
            };
          }

          return {
            slug,
            url: targetUrl,
            status: "down",
            latencyMs: elapsed,
            note: "In redeployment",
          };
        } catch {
          return {
            slug,
            url: targetUrl,
            status: "down",
            latencyMs: Date.now() - start,
            note: "In redeployment",
          };
        }
      })
    );

    return new Response(
      JSON.stringify({
        timestamp: now,
        systems,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300, s-maxage=300",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  },
};

import { NextResponse } from "next/server";
import { runATSAudit } from "../../../../../packages/ats-engine/src";
import { RESUME_PLAIN_TEXT } from "../../../../../content/resume";

/**
 * GET /api/v1/ats/audit — the ATS report for the published résumé, as JSON.
 *
 * `force-static` plus a GET-only surface is what makes this route survive
 * `output: "export"`. It is emitted as a real file at build time and served by
 * the CDN like any other asset.
 *
 * There used to be a POST handler here that audited arbitrary text. It was
 * removed, and the reason is worth recording so nobody adds it back: a route
 * exporting POST cannot be statically rendered, which forced the whole route
 * dynamic. Under a static export a dynamic route is not emitted at all — so the
 * endpoint the ATS drawer advertises in its footer would have 404'd in
 * production while working perfectly in `next dev`. Nothing on this site may
 * advertise a URL that does not answer.
 *
 * If per-request auditing is ever wanted, it needs a real server — a Netlify
 * Function or a Worker — not a route handler in this build.
 */
export const dynamic = "force-static";

export async function GET() {
  const report = runATSAudit(RESUME_PLAIN_TEXT);

  return NextResponse.json({
    status: "ok",
    engine: "@portfolio/ats-engine",
    resume: "Shivam Bhai Patel",
    report,
  });
}

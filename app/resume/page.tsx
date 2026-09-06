import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../../content/site";
import { ResumeSheet } from "../../components/resume-sheet";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: `Resume — ${site.name} | ${site.role}`,
  description: `Official technical resume of ${site.name}. 4+ years architecting robust Spring Boot APIs, deterministic Playwright automation engines, and modern Next.js/React full-stack applications.`,
  alternates: {
    canonical: "https://shivambhaipatel.com/resume/",
  },
  openGraph: {
    title: `Resume — ${site.name}`,
    description: `Engineering resume of ${site.name} (${site.role}) — Reflexis / Zebra Technologies, FirstCron, SamMegh.`,
    url: "https://shivambhaipatel.com/resume/",
    type: "profile",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume — ${site.name}`,
    description: site.bio,
  },
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-paper text-ink py-md px-sm sm:px-md print:min-h-0 print:p-0 print:m-0 print:bg-white print:text-black">
      {/* Utility Bar (Excluded from Print) */}
      <div className="max-w-[800px] mx-auto mb-md print:hidden flex flex-wrap items-center justify-between gap-sm border-b border-rule pb-sm font-mono text-xs">
        <Link
          href="/"
          className="text-muted hover:text-ink transition-colors flex items-center gap-1"
        >
          <span>← Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-sm">
          <PrintButton />
        </div>
      </div>

      {/* Render Document */}
      <div className="max-w-[800px] mx-auto print:max-w-none print:w-full print:m-0 print:p-0">
        <ResumeSheet />
      </div>
    </main>
  );
}

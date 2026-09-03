"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ResumeSheet } from "../../components/resume-sheet";
import { PrintButton } from "./print-button";

export default function ResumePage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("print") === "true") {
        setTimeout(() => {
          window.print();
        }, 400);
      }
    }
  }, []);

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

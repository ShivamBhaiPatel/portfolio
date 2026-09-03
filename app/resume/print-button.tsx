"use client";

import { useState } from "react";
import { RESUME_PLAIN_TEXT } from "../../content/resume";
import { ATSAuditDrawer } from "../../components/ats-audit-drawer";
import { LatexModal } from "../../components/latex-modal";

export function PrintButton() {
  const [copied, setCopied] = useState(false);
  const [atsOpen, setAtsOpen] = useState(false);
  const [latexOpen, setLatexOpen] = useState(false);

  function copyText() {
    navigator.clipboard.writeText(RESUME_PLAIN_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <>
      <div className="flex flex-col sm:items-end gap-2 w-full">
        {/* Actions Button Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* ATS Audit Checklist Badge */}
          <button
            type="button"
            onClick={() => setAtsOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-wash border border-rule hover:border-rule-strong text-ink font-mono text-xs transition-colors cursor-pointer"
            title="View ATS Format Checklist"
          >
            <span className="w-2 h-2 rounded-full bg-accent inline-block" />
            <span className="font-semibold">ATS Format Checklist</span>
          </button>

          {/* LaTeX Source View */}
          <button
            type="button"
            onClick={() => setLatexOpen(true)}
            className="px-2.5 py-1.5 rounded-sm border border-rule bg-wash text-ink hover:border-rule-strong font-mono text-xs transition-colors cursor-pointer"
            title="View compilable LaTeX source"
          >
            &lt; / &gt; View LaTeX
          </button>

          {/* Copy ATS Text */}
          <button
            type="button"
            onClick={copyText}
            className="px-2.5 py-1.5 rounded-sm border border-rule bg-wash text-ink hover:border-rule-strong font-mono text-xs transition-colors cursor-pointer"
          >
            {copied ? "✓ Copied Plain Text" : "Copy ATS Text"}
          </button>

          {/* Download 1-Page PDF */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-sm bg-ink text-paper hover:bg-ink/90 font-medium font-mono text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span>Download 1-Page PDF</span>
            <span className="text-accent font-bold">↓</span>
          </a>
        </div>
      </div>

      {/* Interactive Modals */}
      <ATSAuditDrawer isOpen={atsOpen} onClose={() => setAtsOpen(false)} />
      <LatexModal isOpen={latexOpen} onClose={() => setLatexOpen(false)} />
    </>
  );
}

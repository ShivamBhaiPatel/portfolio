"use client";

import { useEffect, useState } from "react";
import { ResumeSheet } from "./resume-sheet";
import { RESUME_PLAIN_TEXT } from "../content/resume";
import { ATSAuditDrawer } from "./ats-audit-drawer";
import { LatexModal } from "./latex-modal";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const [atsOpen, setAtsOpen] = useState(false);
  const [latexOpen, setLatexOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !atsOpen && !latexOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, atsOpen, latexOpen]);

  function copyPlainText() {
    navigator.clipboard.writeText(RESUME_PLAIN_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handlePrint() {
    const printWin = window.open("/resume/?print=true", "_blank");
    if (!printWin) {
      window.location.href = "/resume/?print=true";
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Systems Engineer Resume Preview"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-y-auto"
      >
        {/* Click backdrop to close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Card */}
        <div className="relative z-10 w-full max-w-[56rem] bg-[#0e0d0c] border border-rule-strong rounded-sm shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col font-mono text-ink">
          {/* Actions Header Bar (Excluded from Print) */}
          <div className="print:hidden flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-rule bg-wash text-xs gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <button
                type="button"
                onClick={() => setAtsOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-wash border border-rule hover:border-rule-strong text-ink font-mono text-xs transition-colors cursor-pointer"
                title="View ATS Format Checklist"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                <span className="font-semibold">ATS Format Checklist</span>
              </button>

              <button
                type="button"
                onClick={() => setLatexOpen(true)}
                className="px-2 py-1 rounded-sm border border-rule bg-raised hover:bg-wash text-ink transition-colors cursor-pointer"
                title="View LaTeX Source"
              >
                &lt; / &gt; LaTeX
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyPlainText}
                className="px-2.5 py-1.5 rounded-sm border border-rule bg-raised hover:bg-wash text-muted hover:text-ink transition-colors cursor-pointer"
              >
                {copied ? "✓ Copied Plain Text" : "Copy ATS Text"}
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm bg-ink text-paper hover:bg-ink/90 font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <span>Download PDF</span>
                <span className="text-accent font-bold">↓</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="px-2 py-1.5 rounded-sm border border-rule text-muted hover:text-ink hover:bg-wash transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Scrollable Document Container */}
          <div className="p-2 sm:p-6 overflow-y-auto bg-wash/80 dark:bg-raised/80 print:p-0 print:overflow-visible">
            <ResumeSheet />
          </div>
        </div>
      </div>

      {/* Sub-modals */}
      <ATSAuditDrawer isOpen={atsOpen} onClose={() => setAtsOpen(false)} />
      <LatexModal isOpen={latexOpen} onClose={() => setLatexOpen(false)} />
    </>
  );
}

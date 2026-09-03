"use client";

import { useEffect, useState } from "react";
import { RESUME_LATEX_CODE } from "../content/resume-latex";

interface LatexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LatexModal({ isOpen, onClose }: LatexModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  function copyCode() {
    navigator.clipboard.writeText(RESUME_LATEX_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="LaTeX Source Code"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-y-auto font-mono text-xs print:hidden"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-[56rem] bg-[#0e0d0c] border border-rule-strong rounded-sm shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-ink">
        {/* IDE Header Chrome */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-rule bg-wash text-xs gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
            </div>
            <span className="text-ink font-semibold">
              resume.tex — Standard Single-Column LaTeX Article
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyCode}
              className="px-3 py-1.5 rounded-sm bg-ink text-paper hover:bg-ink/90 font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <span>{copied ? "✓ Copied to Clipboard" : "Copy LaTeX Source"}</span>
              <span className="text-accent font-bold">↗</span>
            </button>

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

        {/* Tip / Helper Bar */}
        <div className="px-4 sm:px-6 py-2 bg-[#14120e] border-b border-rule flex flex-wrap items-center justify-between text-[11px] text-muted">
          <span>
            Compiles with standard <code className="text-accent font-mono">pdflatex</code>. Includes <code className="text-ink font-mono">\pdfgentounicode=1</code> for strict ATS machine-readable text.
          </span>
          <span className="text-muted">Zero third-party vendor dependencies</span>
        </div>

        {/* Code View Canvas */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#080706]">
          <pre className="text-[11px] text-[#e5e0d4] leading-relaxed font-mono whitespace-pre overflow-x-auto">
            <code>{RESUME_LATEX_CODE}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-2.5 border-t border-rule bg-wash flex justify-between items-center text-[11px] text-muted">
          <span>Format: Standard UTF-8 Article Class</span>
          <button
            type="button"
            onClick={copyCode}
            className="text-accent hover:underline cursor-pointer font-medium"
          >
            Copy all 150 lines ↗
          </button>
        </div>
      </div>
    </div>
  );
}

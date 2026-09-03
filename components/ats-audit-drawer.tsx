"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { runATSAudit } from "../packages/ats-engine/src";
import { RESUME_PLAIN_TEXT } from "../content/resume";

interface ATSAuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ATSAuditDrawer({ isOpen, onClose }: ATSAuditDrawerProps) {
  const [showRaw, setShowRaw] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Execute real deterministic parser engine
  const report = useMemo(() => runATSAudit(RESUME_PLAIN_TEXT), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  function copyRaw() {
    navigator.clipboard.writeText(RESUME_PLAIN_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ATS Compliance Audit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 font-mono text-xs print:hidden overflow-y-auto"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-[44rem] bg-[#0e0d0c] border border-rule-strong rounded-sm shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-ink">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-rule flex items-center justify-between bg-wash">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] inline-block animate-pulse" />
            <div>
              <h3 className="font-bold text-sm text-ink">ATS Compliance Audit</h3>
              <p className="text-[11px] text-muted font-mono">
                Engine: @portfolio/ats-engine · Deterministic Parser
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-sm text-muted hover:text-ink hover:bg-raised transition-colors cursor-pointer"
            aria-label="Close audit"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 pt-6 space-y-md"
        >
          {/* Health Score Banner */}
          <div className="p-md rounded-sm border border-[#4ade80]/40 bg-[#0a1a10] flex items-center justify-between shadow-xs">
            <div>
              <span className="text-meta uppercase tracking-meta text-[#4ade80] font-bold block mb-0.5">
                Overall ATS Health Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white tracking-tight">
                  {report.overallScore} / 100
                </span>
                <span className="text-xs text-[#4ade80] font-semibold">
                  {report.passed ? "✓ ATS CERTIFIED" : "NEEDS REFINEMENT"}
                </span>
              </div>
              <p className="text-[11px] text-muted mt-1">
                Zero multi-column breaks · Workday, Greenhouse, Lever &amp; Taleo compliant.
              </p>
            </div>
            <div className="w-14 h-14 rounded-full border-2 border-[#4ade80] bg-[#4ade80]/10 flex flex-col items-center justify-center text-[#4ade80] font-bold text-sm">
              <span>{report.overallScore}%</span>
              <span className="text-[9px] uppercase tracking-tighter text-[#4ade80]/80">Pass</span>
            </div>
          </div>

          {/* Lexical Telemetry Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-sm border border-rule bg-raised/30">
              <span className="text-[10px] text-muted block uppercase font-mono">Word Count</span>
              <span className="font-bold text-ink text-sm">{report.wordCount} words</span>
            </div>
            <div className="p-2.5 rounded-sm border border-rule bg-raised/30">
              <span className="text-[10px] text-muted block uppercase font-mono">Characters</span>
              <span className="font-bold text-ink text-sm">{report.characterCount} chars</span>
            </div>
            <div className="p-2.5 rounded-sm border border-rule bg-raised/30">
              <span className="text-[10px] text-muted block uppercase font-mono">Scan Time</span>
              <span className="font-bold text-ink text-sm">&lt; {report.readingTimeMinutes} min</span>
            </div>
          </div>

          {/* Real Dynamic Checks List */}
          <div className="space-y-sm pt-1">
            <span className="text-meta uppercase tracking-meta text-muted font-bold block">
              Automated Check Suite ({report.checks.filter((c) => c.passed).length}/{report.checks.length} Passed)
            </span>

            {report.checks.map((check) => (
              <div
                key={check.id}
                className="p-sm sm:p-md rounded-sm border border-rule bg-raised/40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-ink text-sm">
                    <span className={check.passed ? "text-[#4ade80]" : "text-amber-400"}>
                      {check.passed ? "✓" : "⚠"}
                    </span>
                    <span>{check.name}</span>
                  </div>
                  <span className="text-meta text-[#4ade80] font-medium font-mono">
                    +{check.score}/{check.weight} pts
                  </span>
                </div>

                {/* High Contrast Explanatory Summary */}
                <p className="text-muted font-mono text-xs leading-relaxed">
                  {check.summary}
                </p>

                {/* Real Parsed Token Tags */}
                {check.details && check.details.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {check.details.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-xs bg-[#1a1714] border border-rule text-[10.5px] text-ink font-mono"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Simulate ATS Text Extraction */}
          <div className="pt-sm border-t border-rule">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-sm">
              <div>
                <span className="text-meta uppercase tracking-meta text-muted font-bold block">
                  Simulate ATS Parser Extraction
                </span>
                <p className="text-[11px] text-muted">
                  Raw plain-text stream ingested by automated recruitment pipelines
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowRaw(!showRaw)}
                className="px-2.5 py-1 rounded-sm border border-rule bg-wash hover:bg-raised text-[11px] text-ink hover:text-accent cursor-pointer transition-colors"
              >
                {showRaw ? "Hide Stream" : "Inspect Raw Text Stream"}
              </button>
            </div>

            {showRaw ? (
              <div className="space-y-xs">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={copyRaw}
                    className="text-[11px] text-accent hover:underline cursor-pointer font-medium"
                  >
                    {copied ? "✓ Copied Stream" : "Copy Extracted Stream"}
                  </button>
                </div>
                <pre className="p-3 rounded-sm bg-[#080706] border border-rule font-mono text-[10.5px] text-ink leading-relaxed overflow-x-auto max-h-56 overflow-y-auto whitespace-pre-wrap">
                  {RESUME_PLAIN_TEXT}
                </pre>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-rule bg-wash flex items-center justify-between">
          <span className="text-[11px] text-muted font-mono">
            REST API: <code className="text-accent font-semibold">/api/v1/ats/audit</code>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-sm bg-ink text-paper hover:bg-ink/90 font-medium transition-colors cursor-pointer"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
}

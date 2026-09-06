"use client";

import { useState } from "react";

export function FlowTraceInteractive() {
  const [mode, setMode] = useState<"broken" | "healing">("healing");

  return (
    <div className="w-full max-w-full overflow-hidden rounded-sm border border-rule bg-wash/50 p-sm sm:p-md my-md font-mono text-xs">
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-xs pb-2 border-b border-rule mb-sm">
        <div>
          <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
            Selector Drift Recovery Pipeline
          </span>
          <p className="text-[11px] text-muted font-sans font-normal mt-0.5">
            Handling vendor quarterly DOM ID mutations in enterprise ERPs
          </p>
        </div>

        <div className="flex items-center gap-xs">
          <button
            type="button"
            onClick={() => setMode("broken")}
            className={`px-2.5 py-1 rounded-sm border text-[11px] font-mono transition-colors cursor-pointer ${
              mode === "broken"
                ? "bg-raised text-ink border-rule-strong font-semibold shadow-xs"
                : "border-rule text-muted hover:text-ink"
            }`}
          >
            Standard Test Runner (Fails)
          </button>
          <button
            type="button"
            onClick={() => setMode("healing")}
            className={`px-2.5 py-1 rounded-sm border text-[11px] font-mono transition-colors cursor-pointer ${
              mode === "healing"
                ? "bg-ink text-paper border-ink font-semibold shadow-xs"
                : "border-rule text-muted hover:text-ink"
            }`}
          >
            FlowTrace Fallback Engine
          </button>
        </div>
      </div>

      <div className="my-sm grid grid-cols-1 md:grid-cols-2 gap-sm">
        {/* Left: Mutated ERP DOM */}
        <div className="bg-raised p-sm rounded-sm border border-rule space-y-1.5">
          <p className="text-muted text-[10px] uppercase tracking-meta font-semibold">
            Runtime Oracle Fusion DOM (Vendor Patch):
          </p>
          <div className="p-xs bg-wash/80 rounded border border-rule text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap break-all sm:break-normal min-w-0">
            <code>
              <span className="text-accent">&lt;button</span>{" "}
              <span className="text-ink font-medium">id</span>=<span className="text-accent">&quot;btn-submit-3180&quot;</span>
              <br />
              &nbsp;&nbsp;<span className="text-ink font-medium">data-ora-ctx</span>=&quot;po_approval_flow&quot;
              <br />
              &nbsp;&nbsp;<span className="text-ink font-medium">aria-label</span>=&quot;Approve Purchase Order&quot;<span className="text-accent">&gt;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-ink font-medium">Approve Order (₹ 4,80,000)</span>
              <br />
              <span className="text-accent">&lt;/button&gt;</span>
            </code>
          </div>
          <p className="text-[10px] text-muted pt-0.5">
            * Quarterly patch mutated ID from <code className="text-muted">#btn-submit-8942</code> → <code className="text-accent font-semibold">#btn-submit-3180</code>.
          </p>
        </div>

        {/* Right: Engine Execution Result */}
        <div className="bg-raised p-sm rounded-sm border border-rule space-y-1.5">
          <p className="text-muted text-[10px] uppercase tracking-meta font-semibold">
            {mode === "broken" ? "Traditional Locator Execution:" : "Tiered Resolution Sequence:"}
          </p>
          {mode === "broken" ? (
            <div className="p-xs bg-wash/80 rounded border border-rule text-ink leading-relaxed space-y-1.5 text-[11px]">
              <p className="text-accent font-semibold flex items-center gap-1">
                <span>✕</span> TimeoutError: Element Not Found
              </p>
              <p className="text-[11px] text-muted">
                Locator <code className="text-ink">#btn-submit-8942</code> exceeded 30000ms timeout.
              </p>
              <p className="text-[10px] text-muted font-sans border-t border-rule pt-1">
                Result: CI test suite halted. Engineer must spend ~20 minutes manually re-inspecting DOM in devtools.
              </p>
            </div>
          ) : (
            <div className="p-xs bg-wash/80 rounded border border-rule text-ink leading-relaxed space-y-1.5 text-[11px]">
              <p className="text-ink font-semibold flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Tiered Fallback Matches Element:
              </p>
              <ol className="text-[11px] text-muted space-y-1 pl-4 list-decimal">
                <li>Check ARIA accessibility tree: <code className="text-ink font-medium">aria-label=&quot;Approve Purchase Order&quot;</code></li>
                <li>Match parent context: <code className="text-ink font-medium">data-ora-ctx=&quot;po_approval_flow&quot;</code></li>
                <li>Normalize action text: <code className="text-ink font-medium">&quot;Approve Order&quot;</code></li>
                <li className="text-ink font-medium">Verify state change (modal dismiss + toast) → writes patch to JSON contract.</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

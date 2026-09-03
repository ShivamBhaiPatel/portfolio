"use client";

import { useState } from "react";

export function FlowTraceInteractive() {
  const [mode, setMode] = useState<"broken" | "healing">("healing");

  return (
    <div className="w-full max-w-full overflow-hidden rounded-sm border border-rule bg-[#0f0e0c] p-sm sm:p-md my-md font-mono text-xs shadow-lg">
      {/* Terminal Window Header */}
      <div className="flex flex-wrap items-center justify-between gap-xs pb-2 border-b border-[#26241e] mb-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
          <span className="text-[11px] text-[#8c877a] ml-2 font-mono">
            bash — flowtrace-runtime (v1.2)
          </span>
        </div>

        <div className="flex items-center gap-xs">
          <button
            type="button"
            onClick={() => setMode("broken")}
            className={`px-2 py-0.5 rounded-sm border text-[11px] transition-colors cursor-pointer ${
              mode === "broken"
                ? "bg-[#26241e] text-[#f87171] border-[#f87171] font-semibold"
                : "border-[#333027] text-[#8c877a] hover:text-[#ded9cc]"
            }`}
          >
            Brittle Automation
          </button>
          <button
            type="button"
            onClick={() => setMode("healing")}
            className={`px-2 py-0.5 rounded-sm border text-[11px] transition-colors cursor-pointer ${
              mode === "healing"
                ? "bg-[#26241e] text-accent border-accent font-semibold"
                : "border-[#333027] text-[#8c877a] hover:text-[#ded9cc]"
            }`}
          >
            FlowTrace Self-Healing
          </button>
        </div>
      </div>

      <div className="my-sm grid grid-cols-1 md:grid-cols-2 gap-sm">
        {/* Left: Syntax-Colored Mutated ERP DOM */}
        <div className="bg-[#080706] p-sm rounded-sm border border-[#26241e] space-y-1.5">
          <p className="text-[#8c877a] text-[10px] uppercase tracking-meta font-semibold">
            Runtime Oracle Fusion DOM (Quarterly Patch):
          </p>
          <div className="p-xs bg-[#12110e] rounded border border-[#26241e] text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap break-all sm:break-normal min-w-0">
            <code>
              <span className="text-[#e06c75]">&lt;button</span>{" "}
              <span className="text-[#61afef]">id</span>=<span className="text-[#98c379]">&quot;btn-submit-3180&quot;</span>
              <br />
              &nbsp;&nbsp;<span className="text-[#61afef]">data-ora-ctx</span>=<span className="text-[#98c379]">&quot;po_approval_flow&quot;</span>
              <br />
              &nbsp;&nbsp;<span className="text-[#61afef]">aria-label</span>=<span className="text-[#98c379]">&quot;Approve Purchase Order&quot;</span><span className="text-[#e06c75]">&gt;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#abb2bf]">Approve Order (₹ 4,80,000)</span>
              <br />
              <span className="text-[#e06c75]">&lt;/button&gt;</span>
            </code>
          </div>
          <p className="text-[10px] text-[#8c877a] pt-1">
            * Vendor patch mutated ID from <code className="text-[#e5c07b]">#btn-submit-8942</code> → <code className="text-[#98c379]">#btn-submit-3180</code>.
          </p>
        </div>

        {/* Right: Engine Execution Result */}
        <div className="bg-[#080706] p-sm rounded-sm border border-[#26241e] space-y-1.5">
          <p className="text-[#8c877a] text-[10px] uppercase tracking-meta font-semibold">
            {mode === "broken" ? "Standard Test Runner (Playwright/Selenium):" : "FlowTrace Heuristic Engine:"}
          </p>
          {mode === "broken" ? (
            <div className="p-xs bg-[#12110e] rounded border border-[#f87171]/40 text-[#ded9cc] leading-relaxed space-y-1 text-[11px]">
              <p className="text-[#f87171] font-semibold flex items-center gap-1">
                <span>❌</span> Execution Failure (False Red)
              </p>
              <p className="text-[11px] text-[#8c877a]">
                TimeoutError: page.click(&apos;#btn-submit-8942&apos;) exceeded 30000ms.
              </p>
              <p className="text-[10px] text-[#f87171]/90">
                Cost: Pipeline blocked. Manual triage required (~20 mins per flow).
              </p>
            </div>
          ) : (
            <div className="p-xs bg-[#12110e] rounded border border-accent/40 text-[#ded9cc] leading-relaxed space-y-1 text-[11px]">
              <p className="text-[#4ade80] font-semibold flex items-center gap-1">
                <span>✓</span> Invariant Heuristic Re-attachment
              </p>
              <p className="text-[11px] text-[#8c877a]">
                1. Detected selector drift. Matched semantic text &amp; <code className="text-[#61afef]">data-ora-ctx</code>.
              </p>
              <p className="text-[11px] text-[#8c877a]">
                2. Dispatched click on repaired node <code className="text-[#98c379]">#btn-submit-3180</code>.
              </p>
              <p className="text-[11px] text-[#f59e0b] font-medium">
                3. Verified modal state → Wrote patch back to JSON contract.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

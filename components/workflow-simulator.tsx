"use client";

import { useState } from "react";

interface LogLine {
  source: "dag-engine" | "worker-agent" | "reviewer-gate" | "sync-service";
  text: string;
  time: string;
  type?: "info" | "pass" | "warn" | "accent";
}

const INITIAL_LOGS: LogLine[] = [
  {
    source: "dag-engine",
    text: "Workflow Studio Core daemon initialized. Listening on local IPC bridge.",
    time: "00.00s",
    type: "info",
  },
  {
    source: "dag-engine",
    text: "Active boundary: @workflow-studio/core (strict Node types, zero UI symbol leakage).",
    time: "00.02s",
    type: "accent",
  },
];

export function WorkflowSimulator() {
  const [logs, setLogs] = useState<LogLine[]>(INITIAL_LOGS);
  const [runningStep, setRunningStep] = useState<number | null>(null);

  function addLog(source: LogLine["source"], text: string, type: LogLine["type"] = "info") {
    const time = (Math.random() * 0.4 + 0.1).toFixed(2) + "s";
    setLogs((prev) => [...prev.slice(-14), { source, text, time, type }]);
  }

  async function runStep1() {
    setRunningStep(1);
    addLog("dag-engine", "Ingesting PRD-14: 'Multi-tenant auth & schema segregation'...", "info");
    await new Promise((r) => setTimeout(r, 350));
    addLog("dag-engine", "Parsed 4 phased DAG nodes: [AUTH-01 → SCH-02 → TEST-03 → MIGR-04]", "accent");
    setRunningStep(null);
  }

  async function runStep2() {
    setRunningStep(2);
    addLog("worker-agent", "Claimed task AUTH-01 (Claude 3.7 Sonnet session spawned)...", "info");
    await new Promise((r) => setTimeout(r, 400));
    addLog("worker-agent", "Provisioned isolated branch `feature/auth-segregation`...", "info");
    await new Promise((r) => setTimeout(r, 350));
    addLog("worker-agent", "Implemented @workflow-studio/core middleware. 14 files modified.", "pass");
    setRunningStep(null);
  }

  async function runStep3() {
    setRunningStep(3);
    addLog("reviewer-gate", "Automated Reviewer Gate triggered: Intercepting regressions before merge...", "warn");
    await new Promise((r) => setTimeout(r, 450));
    addLog("reviewer-gate", "AST Check: Intercepted 1 cyclic dependency → auto-repaired via topological re-sort.", "warn");
    await new Promise((r) => setTimeout(r, 400));
    addLog("reviewer-gate", "Compiler Check: packages/core/tsconfig.json ['types': ['node']] passed with 0 leaks.", "pass");
    await new Promise((r) => setTimeout(r, 350));
    addLog("reviewer-gate", "Independent Verification: 64/64 unit & integration assertions PASS.", "pass");
    setRunningStep(null);
  }

  async function runStep4() {
    setRunningStep(4);
    addLog("sync-service", "Re-verifying execution state before task resolution...", "info");
    await new Promise((r) => setTimeout(r, 350));
    addLog("sync-service", "Opened GitHub PR #89 → linked commit hash to Jira WFST-140 → Task Closed.", "accent");
    setRunningStep(null);
  }

  async function runFull() {
    setLogs([]);
    await runStep1();
    await runStep2();
    await runStep3();
    await runStep4();
  }

  return (
    <div className="w-full max-w-full overflow-hidden rounded-sm border border-rule bg-[#0f0e0c] p-sm sm:p-md my-md font-mono text-xs shadow-lg">
      {/* Terminal Window Chrome */}
      <div className="flex items-center justify-between pb-2 border-b border-[#26241e] mb-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
          <span className="text-[11px] text-[#8c877a] ml-2 font-mono">
            bash — workflow-studio-daemon (v2.4)
          </span>
        </div>
        <span className="text-[11px] text-accent flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          DAG Bridge Active
        </span>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-xs my-sm">
        <button
          type="button"
          onClick={runStep1}
          disabled={runningStep !== null}
          className={`px-2 py-1.5 rounded-sm border font-mono text-xs text-left transition-colors cursor-pointer ${
            runningStep === 1
              ? "bg-[#26241e] text-accent border-accent font-semibold"
              : "bg-[#171612] hover:bg-[#201e19] text-[#ded9cc] border-[#333027]"
          }`}
        >
          1. Ingest PRD
        </button>
        <button
          type="button"
          onClick={runStep2}
          disabled={runningStep !== null}
          className={`px-2 py-1.5 rounded-sm border font-mono text-xs text-left transition-colors cursor-pointer ${
            runningStep === 2
              ? "bg-[#26241e] text-accent border-accent font-semibold"
              : "bg-[#171612] hover:bg-[#201e19] text-[#ded9cc] border-[#333027]"
          }`}
        >
          2. Dispatch Worker
        </button>
        <button
          type="button"
          onClick={runStep3}
          disabled={runningStep !== null}
          className={`px-2 py-1.5 rounded-sm border font-mono text-xs text-left transition-colors cursor-pointer ${
            runningStep === 3
              ? "bg-[#26241e] text-accent border-accent font-semibold"
              : "bg-[#171612] hover:bg-[#201e19] text-[#ded9cc] border-[#333027]"
          }`}
        >
          3. Reviewer Gate
        </button>
        <button
          type="button"
          onClick={runStep4}
          disabled={runningStep !== null}
          className={`px-2 py-1.5 rounded-sm border font-mono text-xs text-left transition-colors cursor-pointer ${
            runningStep === 4
              ? "bg-[#26241e] text-accent border-accent font-semibold"
              : "bg-[#171612] hover:bg-[#201e19] text-[#ded9cc] border-[#333027]"
          }`}
        >
          4. Sync &amp; Close
        </button>
      </div>

      {/* Terminal Display */}
      <div className="bg-[#080706] rounded-sm p-sm border border-[#26241e] font-mono text-xs space-y-1.5 max-h-52 overflow-y-auto max-w-full overflow-x-hidden">
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-2 leading-relaxed min-w-0">
            <span className="text-[#9e998c] shrink-0 text-[11px]">[{log.source}]</span>
            <span
              className={`break-words min-w-0 ${
                log.type === "pass"
                  ? "text-[#4ade80] font-medium"
                  : log.type === "accent"
                  ? "text-[#f59e0b] font-medium"
                  : log.type === "warn"
                  ? "text-[#fbbf24] italic"
                  : "text-[#d1ccc0]"
              }`}
            >
              {log.text}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-[11px] text-[#8c877a]">
        <span>Click stages above to test-drive multi-agent handoff</span>
        <button
          type="button"
          onClick={runFull}
          disabled={runningStep !== null}
          className="text-accent underline underline-offset-2 hover:opacity-80 cursor-pointer font-medium"
        >
          Run Complete Loop ↗
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export function WorkflowStudioDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="my-md w-full rounded-sm border border-rule bg-wash/40 p-sm sm:p-md font-mono text-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-rule mb-sm font-mono text-meta">
        <span className="text-accent font-semibold tracking-meta uppercase shrink-0">
          Architecture &amp; Multi-Agent DAG Topology
        </span>
        <span className="text-muted text-[11px] tracking-meta uppercase font-mono shrink-0">
          DAG Kernel
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 760 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto w-full max-w-[740px] font-mono select-none h-auto"
        >
          <defs>
            <marker
              id="arrow-wf"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Animated Connecting lines with pulsing flow */}
          <line
            x1="210"
            y1="75"
            x2="290"
            y2="120"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-flow-dash"
          />
          <line
            x1="210"
            y1="185"
            x2="290"
            y2="140"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-flow-dash"
          />
          <line
            x1="510"
            y1="120"
            x2="590"
            y2="75"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-flow-dash"
          />
          <line
            x1="510"
            y1="140"
            x2="590"
            y2="185"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-flow-dash"
          />

          {/* Center Engine Box */}
          <g
            onMouseEnter={() => setActiveNode("@workflow-studio/core — DAG Engine with pure Node types, SQLite Engine, and local HTTP bridge")}
            onMouseLeave={() => setActiveNode(null)}
            className="cursor-pointer group"
          >
            <rect
              x="290"
              y="85"
              width="220"
              height="95"
              rx="4"
              fill="var(--raised)"
              stroke="var(--accent)"
              strokeWidth="2"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="400" y="118" textAnchor="middle" fill="var(--ink)" fontWeight="bold" fontSize="14" fontFamily="var(--font-mono)">
              @workflow-studio/core
            </text>
            <text x="400" y="140" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono)">
              DAG Engine · SQLite Engine · Local API
            </text>
            <text x="400" y="162" textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)">
              types: [&quot;node&quot;] (strict isolation)
            </text>
          </g>

          {/* Surface 1: VS Code Extension */}
          <g
            onMouseEnter={() => setActiveNode("VS Code Extension — UI TreeViews and Webview rendering over local bridge")}
            onMouseLeave={() => setActiveNode(null)}
            className="cursor-pointer group"
          >
            <rect
              x="30"
              y="45"
              width="180"
              height="60"
              rx="3"
              fill="var(--raised)"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="120" y="72" textAnchor="middle" fill="var(--ink)" fontWeight="600" fontSize="13" fontFamily="var(--font-mono)">
              VS Code Extension
            </text>
            <text x="120" y="90" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="var(--font-mono)">
              TreeViews &amp; Commands
            </text>
          </g>

          {/* Surface 2: CLI */}
          <g
            onMouseEnter={() => setActiveNode("CLI Tool — Standalone node script for headless CI & autonomous runner scripts")}
            onMouseLeave={() => setActiveNode(null)}
            className="cursor-pointer group"
          >
            <rect
              x="30"
              y="155"
              width="180"
              height="60"
              rx="3"
              fill="var(--raised)"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="120" y="182" textAnchor="middle" fill="var(--ink)" fontWeight="600" fontSize="13" fontFamily="var(--font-mono)">
              CLI Tool
            </text>
            <text x="120" y="200" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="var(--font-mono)">
              bin/workflow-studio.mjs
            </text>
          </g>

          {/* Surface 3: Web SPA */}
          <g
            onMouseEnter={() => setActiveNode("Dashboard SPA — Vite client consuming core engine via HTTP API")}
            onMouseLeave={() => setActiveNode(null)}
            className="cursor-pointer group"
          >
            <rect
              x="550"
              y="45"
              width="180"
              height="60"
              rx="3"
              fill="var(--raised)"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="640" y="72" textAnchor="middle" fill="var(--ink)" fontWeight="600" fontSize="13" fontFamily="var(--font-mono)">
              Dashboard SPA
            </text>
            <text x="640" y="90" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="var(--font-mono)">
              workflow.shivambhaipatel
            </text>
          </g>

          {/* Surface 4: TradeSense */}
          <g
            onMouseEnter={() => setActiveNode("TradeSense Desk — Modular multi-agent market terminal importing packages/core")}
            onMouseLeave={() => setActiveNode(null)}
            className="cursor-pointer group"
          >
            <rect
              x="550"
              y="155"
              width="180"
              height="60"
              rx="3"
              fill="var(--raised)"
              stroke="var(--accent)"
              strokeWidth="1.5"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="640" y="182" textAnchor="middle" fill="var(--ink)" fontWeight="600" fontSize="13" fontFamily="var(--font-mono)">
              TradeSense Desk
            </text>
            <text x="640" y="200" textAnchor="middle" fill="var(--accent)" fontSize="8" fontFamily="var(--font-mono)">
              link:../workflow-studio/packages/core
            </text>
          </g>

          {/* Lower Section: Multi-Agent Pipeline */}
          <line x1="30" y1="245" x2="730" y2="245" stroke="var(--rule)" strokeWidth="1" />
          <text x="380" y="270" textAnchor="middle" fill="var(--muted)" fontSize="10" fontWeight="bold" letterSpacing="0.08em" fontFamily="var(--font-mono)">
            AUTONOMOUS MULTI-AGENT EXECUTION CYCLE
          </text>

          {/* Stage 1 */}
          <g
            onMouseEnter={() => setActiveNode("Stage 1: Ingests PRDs and constructs schema-validated, dependency-ordered Task DAGs")}
            onMouseLeave={() => setActiveNode(null)}
            className="cursor-pointer group"
          >
            <rect
              x="30"
              y="290"
              width="150"
              height="65"
              rx="3"
              fill="var(--raised)"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="105" y="318" textAnchor="middle" fill="var(--ink)" fontWeight="bold" fontSize="12" fontFamily="var(--font-mono)">
              1. Task DAG
            </text>
            <text x="105" y="338" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="var(--font-mono)">
              Dependency Tree
            </text>
          </g>

          <line x1="180" y1="322" x2="215" y2="322" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-wf)" />

          {/* Stage 2 */}
          <g
            onMouseEnter={() => setActiveNode("Stage 2: Spawns Claude/Gemini worker sessions with isolated branch state")}
            onMouseLeave={() => setActiveNode(null)}
            className="cursor-pointer group"
          >
            <rect
              x="215"
              y="290"
              width="160"
              height="65"
              rx="3"
              fill="var(--raised)"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="295" y="318" textAnchor="middle" fill="var(--ink)" fontWeight="bold" fontSize="12" fontFamily="var(--font-mono)">
              2. Worker Agent
            </text>
            <text x="295" y="338" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="var(--font-mono)">
              Claude / Gemini
            </text>
          </g>

          <line x1="375" y1="322" x2="410" y2="322" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-wf)" />

          {/* Stage 3 */}
          <g
            onMouseEnter={() => setActiveNode("Stage 3: Reviewer Gate verifies AST integrity and downstream contract assertions")}
            onMouseLeave={() => setActiveNode(null)}
            className="cursor-pointer group"
          >
            <rect
              x="410"
              y="290"
              width="160"
              height="65"
              rx="3"
              fill="var(--raised)"
              stroke="var(--accent)"
              strokeWidth="1.5"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="490" y="318" textAnchor="middle" fill="var(--ink)" fontWeight="bold" fontSize="12" fontFamily="var(--font-mono)">
              3. Reviewer Gate
            </text>
            <text x="490" y="338" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="var(--font-mono)">
              Reviewer Verification
            </text>
          </g>

          <line x1="570" y1="322" x2="605" y2="322" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-wf)" />

          {/* Stage 4 */}
          <g
            onMouseEnter={() => setActiveNode("Stage 4: State re-verification, Git PR creation, and Jira task resolution")}
            onMouseLeave={() => setActiveNode(null)}
            className="cursor-pointer group"
          >
            <rect
              x="605"
              y="290"
              width="125"
              height="65"
              rx="3"
              fill="var(--raised)"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="667" y="318" textAnchor="middle" fill="var(--ink)" fontWeight="bold" fontSize="12" fontFamily="var(--font-mono)">
              4. Sync &amp; PR
            </text>
            <text x="667" y="338" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="var(--font-mono)">
              Git / Jira Close
            </text>
          </g>
        </svg>
      </div>
      {/* Fixed-height telemetry inspector — eliminates layout shift */}
      <div className="mt-xs pt-2 border-t border-rule font-mono text-xs h-9 flex items-center px-1 overflow-hidden">
        {activeNode ? (
          <div className="flex items-center gap-2 text-ink min-w-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span className="text-accent font-semibold shrink-0">Contract:</span>
            <span className="text-ink font-medium truncate">{activeNode}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted min-w-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse shrink-0" />
            <span className="text-muted text-[11px]">Hover nodes to inspect contract isolation</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function FlowTraceDiagram() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="my-md w-full rounded-sm border border-rule bg-wash/40 p-sm sm:p-md font-mono text-xs">
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-rule mb-sm font-mono text-meta">
        <span className="text-accent font-semibold tracking-meta uppercase shrink-0">
          FlowTrace Architecture Pipeline
        </span>
        <span className="text-muted text-[11px] tracking-meta uppercase font-mono shrink-0">
          Two-Tier Engine
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 760 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto w-full max-w-[740px] font-mono select-none h-auto"
        >
          <defs>
            <marker
              id="arrow-ft"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Animated Arrows */}
          <line
            x1="225"
            y1="75"
            x2="275"
            y2="75"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-flow-dash"
            markerEnd="url(#arrow-ft)"
          />
          <line
            x1="495"
            y1="75"
            x2="545"
            y2="75"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-flow-dash"
            markerEnd="url(#arrow-ft)"
          />

          {/* Step 1: Recorder */}
          <g
            onMouseEnter={() => setActiveStep("MV3 Extension — Injected selector generator, zero chrome.debugger")}
            onMouseLeave={() => setActiveStep(null)}
            className="cursor-pointer group"
          >
            <rect
              x="25"
              y="25"
              width="200"
              height="100"
              rx="3"
              fill="var(--raised)"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="125" y="60" textAnchor="middle" fill="var(--ink)" fontWeight="bold" fontSize="14" fontFamily="var(--font-mono)">
              MV3 Extension
            </text>
            <text x="125" y="85" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono)">
              Vendored Selector Engine
            </text>
            <text x="125" y="105" textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)">
              Zero chrome.debugger
            </text>
          </g>

          {/* Step 2: Contract */}
          <g
            onMouseEnter={() => setActiveStep("Recording Contract — Strict JSON action schema; recorder and replayer share 0 code")}
            onMouseLeave={() => setActiveStep(null)}
            className="cursor-pointer group"
          >
            <rect
              x="275"
              y="35"
              width="220"
              height="80"
              rx="3"
              fill="var(--wash-strong)"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              strokeDasharray="3 3"
              className="group-hover:stroke-accent transition-colors"
            />
            <text x="385" y="68" textAnchor="middle" fill="var(--ink)" fontWeight="bold" fontSize="13" fontFamily="var(--font-mono)">
              Recording Contract
            </text>
            <text x="385" y="92" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono)">
              Strict JSON (shared = 0)
            </text>
          </g>

          {/* Step 3: Replayer */}
          <g
            onMouseEnter={() => setActiveStep("Self-Healing Replayer — DOM state verification and self-repairing selector heuristics")}
            onMouseLeave={() => setActiveStep(null)}
            className="cursor-pointer group"
          >
            <rect
              x="545"
              y="25"
              width="195"
              height="100"
              rx="3"
              fill="var(--raised)"
              stroke="var(--accent)"
              strokeWidth="1.5"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="642" y="60" textAnchor="middle" fill="var(--ink)" fontWeight="bold" fontSize="14" fontFamily="var(--font-mono)">
              Self-Healing Replayer
            </text>
            <text x="642" y="85" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono)">
              Independent Assertions
            </text>
            <text x="642" y="105" textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)">
              Writes fix back to file
            </text>
          </g>
        </svg>
      </div>
      {/* Fixed-height telemetry inspector — eliminates layout shift */}
      <div className="mt-xs pt-2 border-t border-rule font-mono text-xs h-9 flex items-center px-1 overflow-hidden">
        {activeStep ? (
          <div className="flex items-center gap-2 text-ink min-w-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span className="text-accent font-semibold shrink-0">Boundary:</span>
            <span className="text-ink font-medium truncate">{activeStep}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted min-w-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse shrink-0" />
            <span className="text-muted text-[11px]">Hover steps to inspect boundary contracts</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function PracharFlowDiagram() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="my-md w-full rounded-sm border border-rule bg-wash/40 p-sm sm:p-md font-mono text-xs">
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-rule mb-sm font-mono text-meta">
        <span className="text-accent font-semibold tracking-meta uppercase shrink-0">
          PracharFlow Rendering Pipeline
        </span>
        <span className="text-muted text-[11px] tracking-meta uppercase font-mono shrink-0">
          Vector Core
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 760 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto w-full max-w-[740px] font-mono select-none h-auto"
        >
          <defs>
            <marker
              id="arrow-pf"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Arrows */}
          <line
            x1="225"
            y1="75"
            x2="275"
            y2="75"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-flow-dash"
            markerEnd="url(#arrow-pf)"
          />
          <line
            x1="495"
            y1="75"
            x2="545"
            y2="75"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-flow-dash"
            markerEnd="url(#arrow-pf)"
          />

          {/* Step 1: Input JSON */}
          <g
            onMouseEnter={() => setActiveStep("Parametric JSON — Typed text & logo slot layout with strict bounding constraints")}
            onMouseLeave={() => setActiveStep(null)}
            className="cursor-pointer group"
          >
            <rect
              x="25"
              y="25"
              width="200"
              height="100"
              rx="3"
              fill="var(--raised)"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="125" y="60" textAnchor="middle" fill="var(--ink)" fontWeight="bold" fontSize="13" fontFamily="var(--font-mono)">
              Parametric Layout JSON
            </text>
            <text x="125" y="85" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono)">
              Typed text &amp; logo slots
            </text>
            <text x="125" y="105" textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)">
              Strict constraint rules
            </text>
          </g>

          {/* Step 2: Skia Compositor */}
          <g
            onMouseEnter={() => setActiveStep("Skia / Skija Engine — Java 21 Spring Boot rendering Devanagari text in <150ms")}
            onMouseLeave={() => setActiveStep(null)}
            className="cursor-pointer group"
          >
            <rect
              x="275"
              y="20"
              width="220"
              height="110"
              rx="3"
              fill="var(--raised)"
              stroke="var(--accent)"
              strokeWidth="1.5"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="385" y="55" textAnchor="middle" fill="var(--ink)" fontWeight="bold" fontSize="14" fontFamily="var(--font-mono)">
              Skia / Skija Engine
            </text>
            <text x="385" y="78" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono)">
              Java 21 · Spring Boot 3
            </text>
            <text x="385" y="96" textAnchor="middle" fill="var(--ink)" fontSize="10" fontFamily="var(--font-mono)">
              Devanagari Font Rendering
            </text>
            <text x="385" y="116" textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)">
              Render time: &lt;150ms
            </text>
          </g>

          {/* Step 3: Distribution */}
          <g
            onMouseEnter={() => setActiveStep("Messaging Webhooks — Automated delivery to WhatsApp and Telegram bots")}
            onMouseLeave={() => setActiveStep(null)}
            className="cursor-pointer group"
          >
            <rect
              x="545"
              y="25"
              width="195"
              height="100"
              rx="3"
              fill="var(--raised)"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              className="group-hover:stroke-accent group-hover:fill-wash transition-colors"
            />
            <text x="642" y="60" textAnchor="middle" fill="var(--ink)" fontWeight="bold" fontSize="14" fontFamily="var(--font-mono)">
              Telegram / WhatsApp
            </text>
            <text x="642" y="85" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono)">
              Automated daily delivery
            </text>
            <text x="642" y="105" textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)">
              100% Deterministic Output
            </text>
          </g>
        </svg>
      </div>
      {/* Fixed-height telemetry inspector — eliminates layout shift */}
      <div className="mt-xs pt-2 border-t border-rule font-mono text-xs h-9 flex items-center px-1 overflow-hidden">
        {activeStep ? (
          <div className="flex items-center gap-2 text-ink min-w-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span className="text-accent font-semibold shrink-0">Stage:</span>
            <span className="text-ink font-medium truncate">{activeStep}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted min-w-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse shrink-0" />
            <span className="text-muted text-[11px]">Hover stages to trace pipeline execution</span>
          </div>
        )}
      </div>
    </div>
  );
}

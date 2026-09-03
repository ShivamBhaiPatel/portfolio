"use client";

import { useState } from "react";

interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  contract: string;
  isCore?: boolean;
}

const SATELLITE_NODES: ArchitectureNode[] = [
  {
    id: "vscode",
    name: "VS Code Extension",
    role: "Editor Surface",
    contract: "TreeViews & IPC dispatch via VS Code API",
  },
  {
    id: "cli",
    name: "CLI Tool",
    role: "Terminal Engine",
    contract: "bin/workflow-studio.mjs · Headless runner",
  },
  {
    id: "dashboard",
    name: "Dashboard SPA",
    role: "Telemetry UI",
    contract: "Vite / React state client over local HTTP",
  },
  {
    id: "tradesense",
    name: "TradeSense Desk",
    role: "Downstream App",
    contract: "link:../workflow-studio/packages/core strict import",
  },
];

const MULTI_AGENT_STAGES = [
  {
    step: "1. Task DAG",
    role: "Ingestion",
    detail: "PRD → Phase Tree",
    contract: "Schema-Validated Task Decomposition",
  },
  {
    step: "2. Worker Agent",
    role: "Execution",
    detail: "Claude / Gemini Session",
    contract: "Isolated Git Workspace",
  },
  {
    step: "3. Reviewer Gate",
    role: "Reviewer Gate",
    detail: "Regressions Intercepted",
    contract: "AST & Downstream Contract Assertions",
    highlight: true,
  },
  {
    step: "4. Sync & PR",
    role: "Delivery",
    detail: "Commit & Jira Close",
    contract: "State Re-verification & Sync",
  },
];

export function WorkflowTopologyDiagram() {
  const coreNode: ArchitectureNode = {
    id: "core",
    name: "@workflow-studio/core",
    role: "Isolated Orchestration Kernel",
    contract:
      'Strict Node.js types: ["node"] · Zero UI dependencies · SQLite persistence',
    isCore: true,
  };

  const [activeNode, setActiveNode] = useState<ArchitectureNode>(coreNode);

  return (
    <div className="w-full max-w-full overflow-hidden rounded-sm border border-rule bg-wash/40 p-sm sm:p-md font-mono my-md">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-2 mb-md">
        <div>
          <span className="text-meta font-semibold tracking-meta text-accent uppercase">
            Architecture Boundary &amp; Topology
          </span>
          <p className="text-xs text-muted">
            Hover or tap any module to inspect contract isolation
          </p>
        </div>
        <span className="rounded-sm bg-raised px-2 py-0.5 text-meta text-ink border border-rule font-medium">
          Strict tsconfig Boundary
        </span>
      </div>

      {/* Main Graph Grid: 3-column on desktop, stacked on mobile */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-md items-center">
        {/* Left Column: Upstream Clients */}
        <div className="w-full flex flex-col gap-sm">
          {SATELLITE_NODES.slice(0, 2).map((node) => (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node)}
              className={`p-sm rounded-sm border text-xs cursor-pointer transition-all ${
                activeNode.id === node.id
                  ? "border-accent bg-wash text-ink shadow-sm ring-1 ring-accent"
                  : "border-rule bg-raised text-muted hover:border-rule-strong hover:text-ink"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-ink">{node.name}</span>
                <span className="text-meta text-muted">{node.role}</span>
              </div>
              <div className="text-meta text-muted truncate">{node.contract}</div>
            </div>
          ))}
        </div>

        {/* Mobile Flow Indicator */}
        <div className="lg:hidden text-accent font-mono text-xs font-bold my-0.5">↓ IPC Bridge</div>

        {/* Center: The Core Kernel (Flagship Node) */}
        <div
          onMouseEnter={() => setActiveNode(coreNode)}
          className={`w-full p-md rounded-sm border-2 text-center transition-all cursor-pointer ${
            activeNode.id === "core"
              ? "border-accent bg-wash/90 shadow-md ring-2 ring-accent/20"
              : "border-rule-strong bg-raised hover:border-accent"
          }`}
        >
          <div className="inline-block px-2 py-0.5 mb-2 rounded-sm bg-wash text-accent text-meta font-bold tracking-meta uppercase border border-rule">
            Isolated Kernel
          </div>
          <div className="text-base font-bold text-ink tracking-tight mb-1">
            {coreNode.name}
          </div>
          <div className="text-xs text-muted mb-2">
            Task DAG · SQLite Engine · IPC Dispatcher
          </div>
          <div className="text-meta text-accent bg-raised py-1 px-2 rounded-sm border border-rule inline-block max-w-full truncate font-medium">
            types: [&quot;node&quot;] (zero UI symbol leakage)
          </div>
        </div>

        {/* Mobile Flow Indicator */}
        <div className="lg:hidden text-accent font-mono text-xs font-bold my-0.5">↓ Subscriptions</div>

        {/* Right Column: Downstream & Consumer Nodes */}
        <div className="w-full flex flex-col gap-sm">
          {SATELLITE_NODES.slice(2, 4).map((node) => (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node)}
              className={`p-sm rounded-sm border text-xs cursor-pointer transition-all ${
                activeNode.id === node.id
                  ? "border-accent bg-wash text-ink shadow-sm ring-1 ring-accent"
                  : "border-rule bg-raised text-muted hover:border-rule-strong hover:text-ink"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-ink">{node.name}</span>
                <span className="text-meta text-muted">{node.role}</span>
              </div>
              <div className="text-meta text-muted truncate">{node.contract}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Autonomous Multi-Agent Pipeline Rail */}
      <div className="mt-md pt-md border-t border-rule">
        <div className="text-center mb-sm">
          <span className="text-meta text-muted uppercase tracking-meta font-bold">
            Autonomous Multi-Agent SDLC Cycle
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-xs sm:gap-sm">
          {MULTI_AGENT_STAGES.map((st) => (
            <div
              key={st.step}
              className={`p-xs sm:p-sm rounded-sm border text-xs flex flex-col justify-between transition-colors ${
                st.highlight
                  ? "border-accent bg-wash/60 text-ink"
                  : "border-rule bg-raised text-muted"
              }`}
            >
              <div>
                <span className="font-bold text-ink block">{st.step}</span>
                <span className="text-meta text-muted block mb-1">{st.role}</span>
              </div>
              <span className="text-[11px] text-accent font-medium truncate">
                {st.contract}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Inspection Tray */}
      <div className="mt-md pt-2 border-t border-rule text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-muted">
        <div className="flex items-center gap-2">
          <span className="text-muted font-bold">// ACTIVE CONTRACT:</span>
          <span className="text-ink font-semibold">{activeNode.name}</span>
        </div>
        <div className="text-meta text-accent truncate max-w-lg font-medium">
          {activeNode.contract}
        </div>
      </div>
    </div>
  );
}

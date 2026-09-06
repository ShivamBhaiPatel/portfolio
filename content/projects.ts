export type ProjectTier = "flagship" | "featured" | "compact";

export interface ProjectEvidence {
  quote: string;
  source: string;
  lang?: string;
}

export interface ProjectLive {
  url: string;
  status: "up" | "slow" | "down";
  note?: string;
}

export interface Project {
  slug: string;
  name: string;
  summary: string;
  situation?: string;
  tension: string;
  decision: string;
  consequence: string;
  evidence: ProjectEvidence[];
  stack: string[];
  live?: ProjectLive;
  repo?: string;
  tier: ProjectTier;
  roadmap?: string[];
  whatItCost?: string;
}

export const projects: Project[] = [
  {
    slug: "pracharflow",
    name: "PracharFlow",
    summary:
      "Low-latency localized rendering engine serving automated bots. Replaced unpredictable image models with a deterministic parametric canvas engine built in Java 21 and Spring Boot 3 using Skia (Skija). Achieved <150 ms layout compilation for complex Devanagari and Gujarati scripts with zero GPU overhead.",
    situation:
      "Campaigns and businesses require hundreds of localized banner creatives daily with accurate regional typography, official emblems, and portraits delivered instantly via messaging bots.",
    tension:
      "Generative diffusion models hallucinate Devanagari and Gujarati ligatures, distort official brand and political party logos, and take 8+ seconds per generation. Campaigns required guaranteed typography accuracy and sub-second generation.",
    decision:
      "Rejected generative image pipelines in favor of a deterministic parametric canvas engine. Built in Java 21 / Spring Boot 3 using Google's Skia (via Skija), rendering structured layout trees with typed slot constraints directly to PNG buffers.",
    consequence:
      "Pixel-perfect regional typography and exact logo rendering in under 150ms with zero GPU infrastructure costs, serving automated Telegram bot workflows.",
    evidence: [
      {
        quote:
          "try (Surface surface = Surface.makeRaster(ImageInfo.makeN32Premul(width, height))) {\n    // NON-OWNING. Owned by `surface`. Never closed, never in try-with-resources.\n    Canvas canvas = surface.getCanvas();",
        source: "pracharflow/render/.../CompositorService.java:214-216",
        lang: "java",
      },
    ],
    stack: ["Java 21", "Spring Boot 3", "Skija / Skia", "PostgreSQL", "Redis"],
    live: {
      url: "https://prachar.shivambhaipatel.com",
      status: "up",
      note: "Live Microservice ↗",
    },
    tier: "featured",
    roadmap: [
      "WhatsApp Business Cloud API webhook automation",
      "Self-service web template designer with drag-and-drop constraints",
    ],
    whatItCost:
      "Authoring templates takes structured JSON design work upfront rather than freeform text prompts. Every layout variant must be coded with explicit font metric fallbacks.",
  },
  {
    slug: "workflow-studio",
    name: "Workflow Studio",
    summary:
      "Orchestration engine for autonomous developer tasks and code execution across shared codebases without state collision or branch drift. Built on an isolated task-dispatch engine backed by a local SQLite DAG.",
    situation:
      "Running multiple coding agents (Claude, Codex, Antigravity) across active worktrees creates constant branch drift, overlapping file edits, and untracked task states.",
    tension:
      "The engine originally lived coupled inside a VS Code extension, making it impossible to drive from CLI scripts, CI test suites, or headless worker sessions without booting a full editor instance.",
    decision:
      "Decoupled runtime logic into an isolated headless Node.js core engine (@workflow-studio/core) backed by an explicit SQLite task DAG using strict compile-time tsconfig boundaries. Implemented Kahn's algorithm for topological task ordering with strict cycle detection, and distributed task leases with monotonic fencing tokens to reject stale writes.",
    consequence:
      "Four separate surfaces consume the exact same core engine: the VS Code extension, the CLI, the dashboard SPA, and TradeSense. Headless CI runs the full task loop without mocking the VS Code host.",
    evidence: [
      {
        quote:
          "export function topologicalSort(def: WorkflowDefinition): string[] {\n  const adj = new Map<string, string[]>();\n  const inDeg = new Map<string, number>();",
        source: "workflow-studio/src/workflows/executor.ts:41-44",
        lang: "ts",
      },
      {
        quote:
          "if (order.length !== def.nodes.length) {\n    throw new Error('Workflow contains a cycle — not a valid DAG');\n  }",
        source: "workflow-studio/src/workflows/executor.ts:79-81",
        lang: "ts",
      },
      {
        quote:
          "export function isFenceCurrent(store: TaskLeaseStore, taskId: string, epoch: number): boolean {\n  const lease = store.leases[normalizeTaskId(taskId)];\n  if (!lease) return false;\n  return leaseEpochFor(lease) === epoch;\n}",
        source: "workflow-studio/src/taskLeases.ts:79-83",
        lang: "ts",
      },
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "React",
      "Next.js",
      "SQLite",
      "Task DAG",
    ],
    live: {
      url: "https://workflow.shivambhaipatel.com",
      status: "up",
      note: "Interactive Sandbox ↗",
    },
    tier: "flagship",
    roadmap: [
      "Native desktop tray distribution",
      "Automated tool and runtime prerequisite installer",
      "Open-source core package publishing on npm",
    ],
    whatItCost:
      "Extracting the core required duplicating some interface shims between VS Code tree views and CLI output formatters. Maintaining the strict Node-only tsconfig boundary requires careful re-export barrels in packages/core/src/index.ts.",
  },
  {
    slug: "flowtrace",
    name: "FlowTrace",
    summary:
      "Deterministic regression recording and replay engine for dynamic enterprise web apps like Oracle Fusion ERP. Solves brittle selector failures across quarterly vendor updates using a two-tier verification engine (Chrome MV3 + headless Node.js Playwright daemon) with 4-step self-healing fallbacks.",
    situation:
      "Large enterprise applications (Oracle Fusion ERP, SAP) regenerate DOM element IDs across sessions and break brittle E2E tests on quarterly vendor patches. Manual regression verification costs ~20 minutes per business flow.",
    tension:
      "Enterprise ERP systems regenerate DOM element IDs across sessions and quarterly patches (`#btn-submit-8942` → `#btn-submit-3180`). Standard test runners break immediately or report false greens without validating that the business operation succeeded.",
    decision:
      "Built a two-tier verification engine combining Chrome MV3 telemetry with a headless Node.js Playwright daemon. Designed a 4-step self-healing fallback (ARIA accessibility tree → contextual parent attributes → action text) with state mutation assertions (verifying modal dismissals and network responses before confirming step execution).",
    consequence:
      "45 defect-specific behavioral checks. Verified capture of confirmation dialogs before dismissal. The recorder and replayer share zero code at runtime, communicating solely via the recording JSON contract.",
    evidence: [
      {
        quote:
          "// The recorder and replayer share no code and never run together.\n// The recording file is the entire contract between them.",
        source: "flowtrace/README.md:84-85",
        lang: "ts",
      },
      {
        quote:
          "// vendor-injected.mjs — extract Playwright's injected script from the shipped\n// playwright-core bundle and vendor it as a pinned build artifact.",
        source: "flowtrace/recorder/scripts/vendor-injected.mjs:2-3",
        lang: "js",
      },
    ],
    stack: ["Playwright", "TypeScript", "Node.js", "Chrome MV3", "Enterprise ERP"],
    live: {
      url: "https://flowtrace.shivambhaipatel.com",
      status: "up",
      note: "Live Engine ↗",
    },
    tier: "featured",
    roadmap: [
      "Headless PDF regression visual diffing",
      "Multi-tenant cloud replayer workers",
    ],
    whatItCost:
      "Extracting Playwright's internal selector generator requires marker-based string extraction of bundled source during build, which requires pinned dependencies and strict CI validation against Playwright upgrades.",
  },
  {
    slug: "tradesense",
    name: "TradeSense",
    summary:
      "Multi-agent market research and regime analysis terminal built on top of Workflow Studio.",
    tension:
      "Market sentiment analysis and order-flow heuristics generate massive false-positive signals when execution logic is mingled with analysis.",
    decision:
      "Strict compliance boundary: analyses only, never places orders. Imports `@workflow-studio/core` as a package to coordinate autonomous research nodes across CCXT live feeds.",
    consequence:
      "Demonstrates modular re-use of Workflow Studio core in a live, real-time financial data application.",
    evidence: [
      {
        quote: '"@workflow-studio/core": "link:../workflow-studio/packages/core"',
        source: "tradesense/package.json:21",
        lang: "json",
      },
    ],
    stack: ["TypeScript", "Next.js", "@workflow-studio/core"],
    live: {
      url: "https://tradesense.shivambhaipatel.com",
      status: "up",
      note: "Live Terminal ↗",
    },
    tier: "compact",
  },
  {
    slug: "enterprise-platform",
    name: "Enterprise ERP Connector",
    summary:
      "Unified API gateway interface and reference architecture modeling unified query paths across heterogeneous enterprise systems (Oracle Fusion, SAP, Cognos, Power BI).",
    tension:
      "Connecting legacy enterprise systems creates massive latency and brittle point-to-point integrations.",
    decision:
      "High-concurrency Java 21 / Spring Boot 3 gateway normalizing downstream queries across heterogeneous ERP systems with unified REST interfaces and WorkOS SSO.",
    consequence:
      "Sub-300ms response times for ERP queries across 50+ business entities at a single client.",
    evidence: [
      {
        quote: "// enterprise-connector: multi-tenant adapter for Oracle & SAP data layers",
        source: "platform/src/main/java/.../EnterpriseConnector.java:18",
        lang: "java",
      },
    ],
    stack: ["Java 21", "Spring Boot 3", "REST APIs", "Microservices"],
    live: {
      url: "https://platform.shivambhaipatel.com",
      status: "up",
      note: "Live Prototype ↗",
    },
    tier: "compact",
  },
  {
    slug: "dealdekho",
    name: "DealDekho",
    summary:
      "Multi-marketplace price intelligence platform across Amazon, Flipkart, and Croma with Next.js full-stack architecture, resilient price normalization pipelines, and PostgreSQL persistence.",
    tension:
      "Direct scraping of dynamic marketplace frontends leads to immediate IP bans, aggressive captchas, and brittle scrapers.",
    decision:
      "Next.js full-stack architecture pairing structured aggregator APIs with client-side telemetry from the ShopLens browser extension, normalizing price variance across marketplaces.",
    consequence:
      "62 passing test cases across 12 suites validating price normalizers and catalog matching logic.",
    evidence: [
      {
        quote: "// aggregator.ts: upstream price normalizer across marketplaces",
        source: "DealDekho/src/services/aggregator.ts:14",
        lang: "ts",
      },
    ],
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Distributed Scraping"],
    repo: "https://github.com/ShivamBhaiPatel/DealDekho",
    live: {
      url: "https://dealdekho.shivambhaipatel.com",
      status: "up",
      note: "Live Platform ↗",
    },
    tier: "compact",
  },
];

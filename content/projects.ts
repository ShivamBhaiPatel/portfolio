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
    slug: "workflow-studio",
    name: "Workflow Studio",
    summary:
      "A control panel that lets several AI coding agents work on one codebase without duplicating each other's work — used daily on my own projects and imported by a second product.",
    situation:
      "Running Claude, Gemini, Codex and Copilot on one project meant paying a handoff tax by hand on every vendor switch — restating state, tracking who was mid-task, and later discovering two agents had built the same thing twice.",
    tension:
      "The engine originally lived coupled inside a VS Code extension, making it impossible to drive from CLI scripts, external orchestrators, or headless worker sessions without running a full editor instance.",
    decision:
      "Established an isolated package boundary at `@workflow-studio/core` across the existing codebase. The core tsconfig restricts types strictly to Node, ensuring that any accidental editor or UI dependency triggers a compile-time error rather than a runtime crash.",
    consequence:
      "Four separate surfaces now consume the exact same core engine: the VS Code extension, the CLI, the dashboard SPA, and TradeSense. Passing `compile:core` is compiler-level proof of zero leakage.",
    evidence: [
      {
        quote: '"@workflow-studio/core": "link:../workflow-studio/packages/core"',
        source: "tradesense/package.json:21",
        lang: "json",
      },
      {
        quote: '"types": ["node"]',
        source: "packages/core/tsconfig.json:19",
        lang: "json",
      },
      {
        quote:
          "// Everything re-exported here must run headless — no VS Code extension host.\n// The build is scoped in tsconfig.json to this exact dependency closure so that\n// pulling in an editor-only module is a compile error rather than a runtime\n// \"Cannot find module 'vscode'\" crash (WFST-70).",
        source: "packages/core/src/index.ts:7-10",
        lang: "ts",
      },
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "SQLite / PostgreSQL",
      "VS Code API",
      "Vite SPA",
    ],
    live: {
      url: "https://workflow.shivambhaipatel.com",
      status: "up",
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
      "Enterprise test scripts break every time the vendor ships a patch. FlowTrace fixes them automatically and proves the step actually worked instead of trusting the AI's word for it. Manual checking was ~20 minutes per business flow.",
    situation:
      "Large enterprise applications (Oracle Fusion ERP, SAP) regenerate DOM element IDs across sessions and break brittle E2E tests on quarterly vendor patches. Manual regression verification costs ~20 minutes per business flow.",
    tension:
      "Automated test generators either break constantly when DOM IDs mutate, or silently report false greens when an LLM claims a step succeeded without independent state verification.",
    decision:
      "Built a three-tier architecture: Chrome MV3 extension recorder, Windows desktop execution daemon, and headless replay engine. When selectors drift, the engine uses self-healing browser heuristics, verifies the destination state with strict assertion rules, and writes back the repaired selector to the recording.",
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
    stack: ["TypeScript", "Playwright", "Chrome MV3 Extension", "Node.js Desktop Daemon", "Fastify"],
    live: {
      url: "https://flowtrace.shivambhaipatel.com",
      status: "up",
      note: "Production Verified",
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
    slug: "pracharflow",
    name: "PracharFlow",
    summary:
      "Marketing graphics in Hindi and Gujarati, generated automatically. AI image generators mangle Indian scripts and party symbols, so I built a template engine that renders them reliably, every time.",
    situation:
      "Indian political campaigns and small business owners need hundreds of daily localized banner creatives with accurate party symbols, regional typography, and leader portraits delivered directly to messaging apps.",
    tension:
      "Generative diffusion models fail catastrophically on regional Indian scripts (Devanagari/Gujarati), corrupt official political party symbols, and hallucinate celebrity faces.",
    decision:
      "Rejected generative AI image pipelines entirely in favor of deterministic parametric template composition. Structured JSON layout trees with typed slot constraints rendered natively through Skia / Skija on a Spring Boot microservice backend.",
    consequence:
      "Deterministic sub-second layout rendering with strict font metric fallbacks, delivered reliably over Telegram bots.",
    evidence: [
      {
        quote:
          "try (Surface surface = Surface.makeRaster(ImageInfo.makeN32Premul(width, height))) {\n    // NON-OWNING. Owned by `surface`. Never closed, never in try-with-resources.\n    Canvas canvas = surface.getCanvas();",
        source: "pracharflow/render/.../CompositorService.java:214-216",
        lang: "java",
      },
    ],
    stack: ["Java 21", "Spring Boot 3", "Skija / Skia", "PostgreSQL", "Flyway", "Telegram Bot API"],
    live: {
      url: "https://prachar.shivambhaipatel.com",
      status: "up",
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
    },
    tier: "compact",
  },
  {
    slug: "enterprise-platform",
    name: "Enterprise ERP Connector",
    summary:
      "Reference architecture and API gateway prototype modeling unified query paths across Oracle Fusion, SAP Cognos, and Power BI.",
    tension:
      "Connecting legacy enterprise systems creates massive latency and brittle point-to-point integrations.",
    decision:
      "High-throughput Java 21 / Spring Boot 3 gateway with unified REST interfaces and WorkOS SSO authentication.",
    consequence:
      "Sub-300ms response times for ERP queries across 50+ business entities at a single client.",
    evidence: [
      {
        quote: "// enterprise-connector: multi-tenant adapter for Oracle & SAP data layers",
        source: "platform/src/main/java/.../EnterpriseConnector.java:18",
        lang: "java",
      },
    ],
    stack: ["Java 21", "Spring Boot 3", "Next.js 15"],
    live: {
      url: "https://enterprise-platform.netlify.app",
      status: "up",
      note: "Live Prototype ↗",
    },
    tier: "compact",
  },
  {
    slug: "dealdekho",
    name: "DealDekho",
    summary:
      "Aggregator-first Indian price comparison engine across Amazon, Flipkart, and Croma.",
    tension:
      "Direct scraping of multiple Indian marketplaces leads to immediate IP bans, captcha hurdles, and broken scrapers.",
    decision:
      "Aggregator-first ingestion architecture pairing price comparison APIs with user telemetry from the ShopLens extension.",
    consequence:
      "62 passing API tests across 12 suites with resilient price comparison capabilities.",
    evidence: [
      {
        quote: "// aggregator.ts: upstream price normalizer across marketplaces",
        source: "DealDekho/src/services/aggregator.ts:14",
        lang: "ts",
      },
    ],
    stack: ["Next.js 15", "TypeScript", "PostgreSQL"],
    live: {
      url: "https://deal-dekho.vercel.app",
      status: "down",
      note: "In redeployment",
    },
    tier: "compact",
  },
];

export const RESUME_DATA = {
  name: "Shivam Bhai Patel",
  title: "Full-Stack & Backend Systems Engineer",
  location: "Prayagraj / Remote (India)",
  contact: {
    email: "shivambhaipatel1997@gmail.com",
    github: "github.com/ShivamBhaiPatel",
    linkedin: "linkedin.com/in/shivambhaipatel",
    website: "shivambhaipatel.com",
  },
  summary:
    "Full-Stack & Backend Systems Engineer with 4+ years of experience architecting robust Spring Boot APIs, deterministic Playwright automation engines, and modern Next.js/React full-stack applications. Proven track record scaling enterprise retail workforce platforms at Zebra Technologies (servicing 150K+ daily active store associates under sub-100ms SLAs), optimizing high-concurrency database access, and engineering autonomous task orchestration platforms.",
  skills: {
    backend:
      "Java (8/11/17/21), Spring Boot 3, Spring Security, REST APIs, Microservices, PostgreSQL, MySQL, IBM DB2, Redis, Kafka, Node.js.",
    frontend:
      "Next.js 15 (App Router/SSR), React, TypeScript, JavaScript, Tailwind CSS, Playwright, Chrome Extensions (Manifest V3).",
    infra:
      "Docker, Jenkins CI/CD, AWS (S3, EC2), Flyway, SQLite (WAL mode), Linux/Bash, JVM Profiling (Eclipse MAT).",
    architecture:
      "Microservice Isolation, Task DAGs, Event-Driven Architecture, Self-Healing Locators, High-Concurrency Transaction Locking.",
  },
  experience: [
    {
      role: "Independent Software Consultant — Full-Stack & Systems Automation",
      period: "Apr 2024 – Present",
      org: "Client Advisory & Independent Engineering · Remote (Prayagraj, India)",
      clientEngagements: [
        {
          client: "FirstCron Services Pvt Ltd",
          product: "SyntraFlow",
          period: "Apr 2024 – Present (Ongoing)",
          points: [
            "Architected and deployed end-to-end regression automation infrastructure for Oracle Fusion ERP across 50+ business entities, building a three-tier execution engine (MV3 + Node runner + Playwright) cutting regression cycles by 40%.",
            "Built a high-throughput Playwright execution engine with deterministic DOM state assertion, self-healing selectors, and automated SOC2 compliance audit trails.",
            "Architected Spring Boot API gateway layers with fine-grained role-based access control (RBAC) and multi-tenant persistence.",
          ],
        },
        {
          client: "SamMegh Technologies",
          period: "Dec 2024 – Sep 2025 (Completed)",
          points: [
            "Diagnosed database execution bottlenecks and refactored Spring Boot query paths, reducing end-to-end API response latency from ~800ms to under 300ms.",
            "Implemented database query plan indexing, statement caching, and refactored entity fetching to eliminate N+1 queries across core microservices.",
          ],
        },
      ],
    },
    {
      role: "Software Engineer — Platform & Enterprise Retail",
      period: "Nov 2021 – Mar 2024",
      org: "Reflexis Systems (Zebra Technologies) · Pune, India",
      points: [
        "Engineered and scaled enterprise retail workforce management platforms serving 150K+ daily active store associates across 400+ locations under strict sub-100ms API SLAs.",
        "Refactored monolithic legacy services into domain-bounded Spring Boot microservices with isolated DB2 persistence schemas.",
        "Maintained high-availability retail store services; diagnosed memory bottlenecks, analyzed heap dumps, and tuned G1GC parameters to increase transaction throughput by 30% during retail peak surges.",
        "Overhauled automated Jenkins CI/CD deployment pipelines, cutting production release cycles from bi-weekly to under 2 days.",
      ],
    },
  ],
  projects: [
    {
      name: "PracharFlow",
      role: "Lead Enterprise Microservice (Deterministic Skia Canvas)",
      url: "https://prachar.shivambhaipatel.com",
      stack: "Java 21 · Spring Boot 3 · Skija (Skia) · PostgreSQL · Flyway · Telegram API",
      points: [
        "Designed a deterministic graphic rendering engine in Java 21 / Spring Boot 3 replacing generative diffusion models for vernacular regional typography (Devanagari/Gujarati).",
        "Achieved 100% deterministic pixel-perfect output rendering in under 150ms per creative asset on raster surfaces with zero GPU infrastructure overhead.",
      ],
    },
    {
      name: "Workflow Studio",
      role: "Full-Stack Multi-Agent Orchestrator (Next.js + Node Engine)",
      url: "https://workflow.shivambhaipatel.com",
      stack: "React, Next.js, TypeScript, Node.js, SQLite, Atlassian APIs",
      points: [
        "Engineered an autonomous task decomposition engine computing dependency-ordered DAGs using Kahn's topological sort and cycle detection.",
        "Implemented distributed task leases with monotonic fencing tokens to reject stale writes and prevent split-brain state across concurrent agents.",
        "Decoupled the dispatch engine into @workflow-studio/core with strict Node-only tsconfig boundaries, powering the Web UI, CLI runner, and TradeSense terminal.",
      ],
    },
    {
      name: "DealDekho",
      role: "E-Commerce Price Discovery Platform",
      url: "https://dealdekho.shivambhaipatel.com",
      stack: "Next.js 15, React, TypeScript, PostgreSQL, Redis, BullMQ",
      points: [
        "Architected multi-aggregator product search and price tracking paired with client-side telemetry from the ShopLens browser extension, normalizing price variance across marketplaces.",
      ],
    },
  ],
  education: [
    {
      degree: "Post Graduate Diploma in Advanced Computing (PG-DAC)",
      institution: "CDAC Pune",
      period: "2021",
    },
    {
      degree: "Bachelor of Technology (B.Tech) in Electrical Engineering",
      institution: "M.J.P. Rohilkhand University",
      period: "Aug 2016 – Nov 2020",
    },
  ],
};

export const RESUME_PLAIN_TEXT = `SHIVAM BHAI PATEL
Full-Stack & Backend Systems Engineer
Prayagraj, India · Remote | shivambhaipatel1997@gmail.com | github.com/ShivamBhaiPatel | linkedin.com/in/shivambhaipatel | shivambhaipatel.com

PROFESSIONAL SUMMARY
Full-Stack & Backend Systems Engineer with 4+ years of experience architecting robust Spring Boot APIs, deterministic Playwright automation engines, and modern Next.js/React full-stack applications. Proven track record scaling enterprise retail workforce platforms at Zebra Technologies (servicing 150K+ daily active store associates under sub-100ms SLAs), optimizing high-concurrency database access, and engineering autonomous task orchestration platforms.

TECHNICAL SKILLS
- Backend & Systems: Java (8/11/17/21), Spring Boot 3, Spring Security, REST APIs, Microservices, PostgreSQL, MySQL, IBM DB2, Redis, Kafka, Node.js.
- Frontend & Automation: Next.js 15/16 (App Router), React, TypeScript, JavaScript, Tailwind CSS, Playwright, Chrome Extensions (Manifest V3).
- Databases & Infrastructure: Docker, Jenkins CI/CD, AWS (S3, EC2), Flyway, SQLite (WAL mode), Linux/Bash, JVM Profiling (Eclipse MAT).
- Architectural Patterns: Microservice Isolation, Task DAGs, Event-Driven Architecture, Self-Healing Locators, High-Concurrency Transaction Locking.

WORK EXPERIENCE
Independent Software Consultant — Full-Stack & Systems Automation | Apr 2024 – Present
Client Advisory & Independent Engineering · Remote (Prayagraj, India)
- Architected SyntraFlow, an enterprise regression automation infrastructure for Oracle Fusion ERP deployed across 50+ business entities at FirstCron Services Pvt Ltd.
- Built a three-tier execution engine (MV3 Chrome extension + desktop daemon + Playwright replay engine) with self-healing DOM selector heuristics, cutting regression cycles by 40%.
- Diagnosed database execution bottlenecks and refactored Spring Boot query paths for SamMegh Technologies, reducing end-to-end API response latency from ~800ms to under 300ms.
- Implemented database query plan indexing, connection pool tuning, and strict DTO validation with idempotency keys.

Software Engineer | Nov 2021 – Mar 2024
Reflexis Systems (Zebra Technologies) · Pune, India
- Maintained and scaled high-throughput workforce management and store operations platforms serving 150K+ daily retail workers across 400+ enterprise store locations.
- Refactored legacy monolithic services into domain-aligned microservices with isolated persistence boundaries and clean REST contracts.
- Overhauled automated Jenkins CI/CD deployment pipelines, cutting production release cycles from bi-weekly to under 2 days.
- Conducted JVM profiling, heap dump analysis, and garbage collection tuning, boosting peak transaction throughput by 30%.

KEY PROJECTS & SYSTEMS
Workflow Studio | Autonomous Multi-Agent SDLC Orchestrator
TypeScript, Node.js, SQLite, Atlassian APIs
- Engineered an autonomous task decomposition engine that ingests unstructured PRDs and computes dependency-ordered task DAGs.
- Implemented an isolated Git branch provisioner, automated reviewer gate, and bidirectional Jira/Bitbucket webhook synchronizers.
- Enforced strict package isolation behind @workflow-studio/core, eliminating UI symbol leaks via Node-only tsconfig.

PracharFlow — Parametric Template Composition Engine
Java 21, Spring Boot 3, Skija (Skia), PostgreSQL, Telegram Bot API
- Designed a deterministic graphic rendering engine replacing generative diffusion for Indian regional languages (Devanagari/Gujarati).
- Achieved deterministic font layout rendering in under 150ms per creative asset on GPU/raster surfaces.

DealDekho — E-Commerce Price Tracking & Telemetry Engine
Next.js 15, TypeScript, PostgreSQL, Redis, BullMQ
- Architected multi-aggregator product search and price tracking paired with verified client telemetry from the ShopLens extension.

EDUCATION & CREDENTIALS
- Post Graduate Diploma in Advanced Computing (PG-DAC) | CDAC Pune (2021)
- Bachelor of Technology (B.Tech) in Electrical Engineering | M.J.P. Rohilkhand University (Aug 2016 – Nov 2020)
`;

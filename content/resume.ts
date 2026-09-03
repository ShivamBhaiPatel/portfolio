export const RESUME_DATA = {
  name: "Shivam Bhai Patel",
  title: "Systems & Backend Engineer",
  location: "Prayagraj, India",
  contact: {
    email: "shivambhaipatel1997@gmail.com",
    github: "github.com/ShivamBhaiPatel",
    linkedin: "linkedin.com/in/shivambhaipatel",
    website: "shivambhaipatel.com",
  },
  summary:
    "Systems and Backend Engineer with 4+ years of experience engineering autonomous developer tooling, distributed data ingestion pipelines, and enterprise JVM backends. Proven track record refactoring enterprise retail workforce systems at Zebra Technologies, building self-healing browser automation engines across 50+ business entities at a single client, and architecting multi-agent SDLC orchestration platforms.",
  skills: {
    backend:
      "Java (8/11/17/21), Spring Boot 3, Spring Security, Microservices, JVM Tuning & Profiling, REST APIs, WebSockets, Node.js.",
    frontend:
      "Next.js 15/16, React, TypeScript, JavaScript, Playwright, Chrome Extensions (Manifest V3), Electron, Tailwind CSS.",
    infra:
      "PostgreSQL, MySQL, SQLite (WAL mode), Redis, BullMQ, Docker, Jenkins CI/CD, AWS (S3, EC2), Flyway, Linux/Bash.",
    architecture:
      "Multi-Agent Orchestration, Event-Driven Architecture, Task DAGs, Self-Healing Automation, Monolithic vs Distributed Design.",
  },
  experience: [
    {
      role: "Independent Systems & Software Consultant",
      period: "Apr 2024 – Present",
      org: "Self-Employed · Remote (Prayagraj, India)",
      clientEngagements: [
        {
          client: "FirstCron Services Pvt Ltd",
          product: "SyntraFlow",
          period: "Apr 2024 – Present (Ongoing)",
          points: [
            "Architected SyntraFlow, an enterprise browser automation and regression execution engine deployed across 50+ business entities at a single client.",
            "Engineered a three-tier execution system (Chrome MV3 extension + desktop daemon + Playwright replay engine) with self-healing DOM selector heuristics, reducing test maintenance overhead by 40%.",
            "Integrated role-based access control (RBAC), deterministic DOM state capture, and automated PDF audit report generation for enterprise compliance.",
          ],
        },
        {
          client: "SamMegh Technologies",
          period: "Dec 2024 – Sep 2025 (Completed)",
          points: [
            "Diagnosed database execution bottlenecks and refactored Spring Boot query paths, cutting endpoint latency from ~800ms to <300ms.",
            "Engineered robust microservice integration pipelines and maintained 80%+ unit and integration test coverage.",
          ],
        },
      ],
    },
    {
      role: "Software Engineer",
      period: "Nov 2021 – Mar 2024",
      org: "Reflexis Systems (Zebra Technologies) · Pune, India",
      points: [
        "Maintained and scaled high-throughput workforce management and store operations platforms serving 150K+ daily retail workers across 400+ enterprise store locations.",
        "Refactored legacy monolithic services into domain-aligned microservices with isolated persistence boundaries and clean REST contracts.",
        "Overhauled automated Jenkins CI/CD deployment pipelines, cutting production release cycles from bi-weekly to under 2 days.",
        "Conducted JVM profiling, heap dump analysis, and garbage collection tuning, boosting peak transaction throughput by 30%.",
      ],
    },
  ],
  projects: [
    {
      name: "Workflow Studio",
      role: "Autonomous Multi-Agent SDLC Orchestrator",
      url: "https://workflow.shivambhaipatel.com",
      stack: "TypeScript, Node.js, SQLite, Atlassian APIs",
      points: [
        "Engineered an autonomous task decomposition engine that ingests unstructured PRDs and computes dependency-ordered task DAGs.",
        "Implemented an isolated Git branch provisioner, zero-trust automated reviewer agent, and bidirectional Jira/Bitbucket webhook synchronizers.",
        "Enforced strict package isolation behind @workflow-studio/core, eliminating UI symbol leaks via Node-only tsconfig.",
      ],
    },
    {
      name: "PracharFlow",
      role: "Parametric Template Composition Engine",
      url: "https://prachar.shivambhaipatel.com",
      stack: "Java 21 · Spring Boot 3 · Skija (Skia) · PostgreSQL · Telegram",
      points: [
        "Designed a deterministic graphic rendering engine replacing generative diffusion for Indian regional languages (Devanagari/Gujarati).",
        "Achieved 100% deterministic pixel-perfect output rendering in under 150ms per creative asset on GPU/raster surfaces.",
      ],
    },
    {
      name: "DealDekho",
      role: "E-Commerce Price Tracking & Telemetry Engine",
      url: "https://github.com/ShivamBhaiPatel/DealDekho",
      stack: "Next.js 15, TypeScript, PostgreSQL, Redis, BullMQ",
      points: [
        "Architected multi-aggregator product search and price tracking paired with verified client telemetry from the ShopLens extension.",
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
Senior Systems & Full-Stack Engineer
Prayagraj, India · Remote | shivambhaipatel1997@gmail.com | github.com/ShivamBhaiPatel | linkedin.com/in/shivambhaipatel | shivambhaipatel.com

PROFESSIONAL SUMMARY
Senior Systems and Full-Stack Engineer with 4+ years of experience engineering autonomous developer tooling, distributed data ingestion pipelines, and enterprise JVM backends. Proven track record refactoring enterprise retail workforce systems at Zebra Technologies, building self-healing browser automation engines across 50+ Oracle ERP entities, and architecting multi-agent SDLC orchestration platforms.

TECHNICAL SKILLS
- Backend & Systems: Java (8/11/17/21), Spring Boot 3, Spring Security, Microservices, JVM Tuning & Profiling, REST APIs, WebSockets, Node.js.
- Frontend & Automation: Next.js 15/16, React, TypeScript, JavaScript, Playwright, Chrome Extensions (Manifest V3), Electron, Tailwind CSS.
- Databases & Infrastructure: PostgreSQL, MySQL, SQLite (WAL mode), Redis, BullMQ, Docker, Jenkins CI/CD, AWS (S3, EC2), Flyway, Linux/Bash.
- Architectural Patterns: Multi-Agent Orchestration, Event-Driven Architecture, Task DAGs, Self-Healing Automation, Monolithic vs Distributed Design.

WORK EXPERIENCE
Independent Systems & Software Consultant | Apr 2024 – Present
Self-Employed · Remote (Prayagraj, India)
- Architected SyntraFlow, an enterprise browser automation and regression execution engine deployed across 50+ business entities at a single client (FirstCron Services Pvt Ltd).
- Engineered a three-tier execution system (Chrome MV3 extension + desktop daemon + Playwright replay engine) with self-healing DOM selector heuristics, reducing test maintenance overhead by 40%.
- Diagnosed database bottlenecks and refactored Spring Boot query paths for SamMegh Technologies, cutting endpoint latency from ~800ms to <300ms.
- Integrated role-based access control (RBAC), deterministic DOM state capture, and automated PDF audit report generation for compliance reporting.

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

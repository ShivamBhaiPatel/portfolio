export interface ClientEngagement {
  name: string;
  shortName?: string;
  product?: string;
  location: string;
  period: string;
  status: "ongoing" | "contract";
  statusLabel: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights?: string[];
  clients?: ClientEngagement[];
  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Independent Software Consultant",
    company: "Consulting Practice",
    location: "Remote, India (Prayagraj)",
    period: "Apr 2024 – Present",
    summary:
      "Enterprise systems automation, ERP regression infrastructure, and backend query optimization across multiple client engagements.",
    clients: [
      {
        name: "FirstCron Services Pvt Ltd",
        shortName: "FirstCron",
        product: "SyntraFlow",
        location: "Delhi, India",
        period: "Apr 2024 – Present",
        status: "ongoing",
        statusLabel: "Current client · Ongoing",
        summary:
          "Engineered SyntraFlow, an Oracle Fusion ERP automation and regression verification platform operating across 50+ business entities at a single client.",
        highlights: [
          "Built a Playwright batch-replay execution engine with deterministic DOM state verification, self-healing selectors, and automated compliance audit reports.",
          "Architected a three-tier execution model (Chrome MV3 extension + local runner + Playwright engine) cutting regression execution time by 40%.",
          "Designed operational monitoring dashboards with granular role-based access control (RBAC).",
        ],
        stack: ["Java", "Spring Boot", "TypeScript", "Playwright", "React", "MySQL", "AWS"],
      },
      {
        name: "SamMegh Technologies",
        shortName: "SamMegh",
        location: "India",
        period: "Dec 2024 – Sep 2025",
        status: "contract",
        statusLabel: "Contract engagement · Completed",
        summary:
          "Enterprise systems consulting, database query optimization, and backend performance tuning.",
        highlights: [
          "Diagnosed database execution bottlenecks and refactored Spring Boot query paths, reducing end-to-end API response latency from ~800 ms to under 300 ms.",
          "Implemented query plan indexing and connection pool tuning for high-throughput enterprise services.",
        ],
        stack: ["Java", "Spring Boot", "Microservices", "REST APIs", "SQL Optimization"],
      },
    ],
    stack: ["Java", "Spring Boot", "TypeScript", "Playwright", "React", "MySQL", "AWS"],
  },
  {
    role: "Software Engineer",
    company: "Reflexis Systems (Zebra Technologies)",
    location: "Pune, India",
    period: "Nov 2021 – Mar 2024",
    summary:
      "Core engineering on enterprise retail workforce management platforms serving 150K+ daily active store workers across 400+ enterprise retail store locations.",
    highlights: [
      "Maintained and scaled high-throughput workforce management and store operations platforms deployed across Fortune 500 enterprise retail chains.",
      "Refactored legacy monolithic services into domain-aligned microservices with isolated persistence boundaries and clean REST contracts.",
      "Overhauled automated Jenkins CI/CD deployment pipelines, cutting production release cycles from bi-weekly to under 2 days.",
      "Conducted JVM profiling, heap dump analysis, and garbage collection tuning, boosting peak transaction throughput by 30% under heavy retail surges.",
    ],
    stack: ["Java", "Spring Boot", "DB2", "Microservices", "Jenkins", "Docker", "JVM Tuning"],
  },
];

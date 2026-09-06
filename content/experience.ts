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
    role: "Independent Software Consultant — Full-Stack & Systems Automation",
    company: "Client Advisory & Independent Engineering",
    location: "Remote, India (Prayagraj)",
    period: "Apr 2024 – Present",
    summary:
      "Enterprise backend systems, high-concurrency Spring Boot microservices, ERP integration pipelines, and deterministic automation engines across commercial client engagements.",
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
          "Engineered SyntraFlow, an enterprise Oracle Fusion ERP automation and regression verification platform operating across 50+ business entities at a single enterprise client.",
        highlights: [
          "Architected and deployed end-to-end regression automation infrastructure for Oracle Fusion ERP across 50+ business entities, building a three-tier execution engine (MV3 + Node runner + Playwright) cutting regression cycles by 40%.",
          "Built a high-throughput Playwright execution engine with deterministic DOM state assertion, self-healing selectors, and automated SOC2 compliance audit trails.",
          "Architected Spring Boot API gateway layers with fine-grained role-based access control (RBAC) and multi-tenant persistence.",
        ],
        stack: ["Java 21", "Spring Boot 3", "TypeScript", "Playwright", "React", "MySQL", "AWS"],
      },
      {
        name: "SamMegh Technologies",
        shortName: "SamMegh",
        location: "India",
        period: "Dec 2024 – Sep 2025",
        status: "contract",
        statusLabel: "Contract engagement · Completed",
        summary:
          "Enterprise systems consulting, database query optimization, and Spring Boot backend performance tuning.",
        highlights: [
          "Diagnosed database execution bottlenecks and refactored Spring Boot query paths, reducing end-to-end API response latency from ~800 ms to under 300 ms. Implemented query plan indexing and connection pool tuning for high-throughput services.",
          "Implemented database query plan indexing, statement caching, and refactored entity fetching to eliminate N+1 queries across core microservices.",
          "Hardened REST contracts and persistence boundaries with strict DTO validation and idempotency keys.",
        ],
        stack: ["Java", "Spring Boot 3", "Microservices", "PostgreSQL", "HikariCP", "REST APIs"],
      },
    ],
    stack: ["Java 21", "Spring Boot 3", "React", "Next.js", "TypeScript", "Playwright", "PostgreSQL", "AWS"],
  },
  {
    role: "Software Engineer — Platform & Enterprise Retail",
    company: "Reflexis Systems (Zebra Technologies)",
    location: "Pune, India",
    period: "Nov 2021 – Mar 2024",
    summary:
      "Core engineering on enterprise retail workforce management platforms servicing 150K+ daily active store associates across 400+ enterprise retail store locations under strict sub-100ms API SLAs.",
    highlights: [
      "Engineered and scaled enterprise retail workforce management platforms serving 150K+ daily active store associates across 400+ locations under strict sub-100ms API SLAs.",
      "Refactored monolithic legacy services into domain-bounded Spring Boot microservices with isolated DB2 persistence schemas.",
      "Maintained high-availability retail store services; diagnosed memory bottlenecks, analyzed heap dumps, and tuned G1GC parameters to increase transaction throughput by 30% during retail peak surges.",
      "Overhauled automated Jenkins CI/CD deployment pipelines, cutting production release cycles from bi-weekly to under 2 days.",
      "Expanded integration and unit test coverage across core scheduling services, reducing post-release defect tickets by ~25%.",
    ],
    stack: ["Java", "Spring Boot", "IBM DB2", "Microservices", "JVM Tuning", "Eclipse MAT", "Jenkins", "Docker"],
  },
];

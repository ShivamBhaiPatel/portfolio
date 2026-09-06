import { RESUME_DATA } from "../content/resume";

export function ResumeSheet() {
  return (
    <article
      id="resume-document"
      className="max-w-[800px] mx-auto bg-white text-black font-sans text-[9pt] leading-snug p-4 sm:p-8 print:p-0 print:m-0 print:max-w-none print:w-full print:text-black shadow-sm"
    >
      {/* 1. HEADER (Standard Linear ATS Format) */}
      <header className="border-b-2 border-black pb-2 mb-3 text-center">
        <h1 className="text-xl font-bold uppercase tracking-wide text-black mb-0.5">
          {RESUME_DATA.name}
        </h1>
        <div className="text-[9.5pt] font-semibold text-neutral-800 italic mb-1">
          {RESUME_DATA.title}
        </div>
        {/* Unified single-line contact row for both screen and print */}
        <p className="text-[8.5pt] text-neutral-800 text-center m-0 p-0 leading-normal font-sans">
          {RESUME_DATA.location} &nbsp;•&nbsp;{" "}
          <a
            href={`mailto:${RESUME_DATA.contact.email}`}
            className="underline text-black"
          >
            {RESUME_DATA.contact.email}
          </a>{" "}
          &nbsp;•&nbsp;{" "}
          <a
            href={`https://${RESUME_DATA.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black"
          >
            {RESUME_DATA.contact.linkedin}
          </a>{" "}
          &nbsp;•&nbsp;{" "}
          <a
            href={`https://${RESUME_DATA.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black"
          >
            {RESUME_DATA.contact.github}
          </a>
        </p>
      </header>

      {/* 2. PROFESSIONAL SUMMARY */}
      <section className="mb-2">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1 text-black">
          Professional Summary
        </h2>
        <p className="text-neutral-900 leading-snug text-justify text-[8.5pt]">
          {RESUME_DATA.summary}
        </p>
      </section>

      {/* 3. TECHNICAL SKILLS */}
      <section className="mb-2">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1 text-black">
          Technical Skills
        </h2>
        <div className="space-y-0.5 text-neutral-900 text-[8.5pt] leading-snug">
          <div>
            <strong className="font-semibold text-black">Backend &amp; Systems:</strong> {RESUME_DATA.skills.backend}
          </div>
          <div>
            <strong className="font-semibold text-black">Frontend &amp; Automation:</strong> {RESUME_DATA.skills.frontend}
          </div>
          <div>
            <strong className="font-semibold text-black">Databases &amp; Infrastructure:</strong> {RESUME_DATA.skills.infra}
          </div>
          <div>
            <strong className="font-semibold text-black">Architectural Patterns:</strong> {RESUME_DATA.skills.architecture}
          </div>
        </div>
      </section>

      {/* 4. WORK EXPERIENCE */}
      <section className="mb-2">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1 text-black">
          Work Experience
        </h2>

        {/* Independent Consultant */}
        <div className="mb-1.5">
          <div className="flex justify-between items-baseline font-bold text-black text-[9pt] print:table print:w-full">
            <span className="print:table-cell print:w-[65%] print:text-left">
              Independent Software Consultant — Full-Stack &amp; Systems Automation
            </span>
            <span className="text-neutral-600 text-[8.5pt] font-normal print:table-cell print:w-[35%] print:text-right print:whitespace-nowrap">
              Apr 2024 – Present
            </span>
          </div>
          <div className="italic text-neutral-800 text-[8.5pt] mb-0.5">
            Client Advisory &amp; Independent Engineering · Remote (Prayagraj, India)
          </div>
          <ul className="list-disc list-outside pl-4 space-y-0.5 text-neutral-900 text-[8.5pt] leading-snug">
            <li>
              Architected{" "}
              <a
                href="https://shivambhaipatel.com/work/flowtrace"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-black font-semibold hover:text-accent"
                title="View FlowTrace case study"
              >
                SyntraFlow (powered by FlowTrace) ↗
              </a>
              , deploying end-to-end regression automation infrastructure across 50+ business entities at a single enterprise client for FirstCron Services Pvt Ltd.
            </li>
            <li>
              Engineered a three-tier execution engine (Chrome MV3 extension + desktop runner daemon + headless Playwright service) with self-healing DOM locators, cutting regression cycles by 40%.
            </li>
            <li>
              Diagnosed database execution bottlenecks and refactored Spring Boot query paths for SamMegh Technologies, reducing end-to-end API response latency from ~800ms to &lt;300ms.
            </li>
            <li>
              Architected Spring Boot API gateways with role-based access control (RBAC), multi-tenant persistence, and SOC2 compliance audit report generation.
            </li>
          </ul>
        </div>

        {/* Reflexis Systems */}
        <div className="mb-1.5">
          <div className="flex justify-between items-baseline font-bold text-black text-[9pt] print:table print:w-full">
            <span className="print:table-cell print:w-[65%] print:text-left">
              Software Engineer — Platform &amp; Enterprise Retail
            </span>
            <span className="text-neutral-600 text-[8.5pt] font-normal print:table-cell print:w-[35%] print:text-right print:whitespace-nowrap">
              Nov 2021 – Mar 2024
            </span>
          </div>
          <div className="italic text-neutral-800 text-[8.5pt] mb-0.5">
            Reflexis Systems (Zebra Technologies) · Pune, India
          </div>
          <ul className="list-disc list-outside pl-4 space-y-0.5 text-neutral-900 text-[8.5pt] leading-snug">
            <li>
              Engineered and scaled enterprise retail workforce management platforms serving 150K+ daily active store associates across 400+ locations under strict sub-100ms API SLAs.
            </li>
            <li>
              Refactored monolithic legacy services into domain-bounded Spring Boot microservices with isolated DB2 persistence schemas and clean REST contracts.
            </li>
            <li>
              Maintained high-availability retail store services; diagnosed memory bottlenecks, analyzed heap dumps, and tuned G1GC parameters to increase transaction throughput by 30% during retail peak surges.
            </li>
            <li>
              Overhauled automated Jenkins CI/CD deployment pipelines, cutting production release cycles from bi-weekly to under 2 days.
            </li>
          </ul>
        </div>
      </section>

      {/* 5. KEY PROJECTS & SYSTEMS */}
      <section className="mb-2">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1 text-black">
          Key Projects &amp; Systems
        </h2>

        {RESUME_DATA.projects.map((proj) => (
          <div key={proj.name} className="mb-1">
            <div className="flex justify-between items-baseline font-bold text-black text-[9pt] print:table print:w-full">
              <span className="print:table-cell print:w-[60%] print:text-left print:text-[8.5pt]">
                {proj.url ? (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-black hover:text-accent font-bold"
                    title={`Visit ${proj.name} live URL`}
                  >
                    {proj.name} ↗
                  </a>
                ) : (
                  <span>{proj.name}</span>
                )}{" "}
                — {proj.role}
              </span>
              <span className="text-neutral-700 font-normal text-[8pt] font-mono print:table-cell print:w-[40%] print:text-right print:whitespace-nowrap">
                {proj.stack}
              </span>
            </div>
            <ul className="list-disc list-outside pl-4 space-y-0.5 text-neutral-900 mt-0.5 text-[8.5pt] leading-snug">
              {proj.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 6. EDUCATION & CREDENTIALS */}
      <section className="mb-1">
        <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1 text-black">
          Education &amp; Credentials
        </h2>
        {RESUME_DATA.education.map((edu) => (
          <div key={edu.degree} className="flex justify-between items-baseline text-black text-[8.5pt] print:table print:w-full">
            <span className="font-bold print:table-cell print:w-[60%] print:text-left">{edu.degree}</span>
            <span className="text-neutral-600 font-normal print:table-cell print:w-[40%] print:text-right print:whitespace-nowrap">
              {edu.institution} ({edu.period})
            </span>
          </div>
        ))}
      </section>
    </article>
  );
}

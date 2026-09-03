import { experience } from "../content/experience";

export function ExperienceSection() {
  return (
    <div className="space-y-2xl my-md">
      {experience.map((exp, idx) => (
        <article
          key={exp.role}
          className={`${idx > 0 ? "pt-8 mt-10 border-t border-dashed border-rule" : ""}`}
        >
          {/* Top-Level Role Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-md items-baseline mb-md">
            <div className="lg:col-span-5 space-y-1">
              <h3 className="text-xl font-display font-semibold text-ink tracking-tight">
                {exp.role}
              </h3>
              <p className="text-base font-sans text-muted">
                {exp.company}
              </p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-meta text-muted pt-0.5">
                <span className="text-accent font-medium">{exp.period}</span>
                <span>·</span>
                <span>{exp.location}</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-body text-ink font-medium leading-relaxed">
                {exp.summary}
              </p>
            </div>
          </div>

          {/* Nested Clients for Consulting */}
          {exp.clients && exp.clients.length > 0 ? (
            <div className="mt-md pl-4 sm:pl-6 ml-1 border-l-2 border-accent/60 space-y-lg">
              <div className="text-meta font-mono text-accent uppercase tracking-meta font-semibold">
                ↳ Retained &amp; Contract Engagements:
              </div>
              {exp.clients.map((client) => (
                <div key={client.name} className="space-y-xs">
                  <div className="flex flex-wrap items-baseline justify-between gap-xs">
                    <div>
                      <h4 className="font-display font-semibold text-base text-ink">
                        {client.name}
                        {client.product ? (
                          <span className="font-sans font-normal text-muted ml-2">
                            (Product: <span className="text-ink font-medium">{client.product}</span>)
                          </span>
                        ) : null}
                      </h4>
                      <p className="font-mono text-meta text-muted">
                        Location: {client.location} · {client.period}
                      </p>
                    </div>

                    <span className="font-mono text-meta px-2 py-0.5 rounded-sm bg-wash border border-rule-strong text-ink font-medium">
                      {client.statusLabel}
                    </span>
                  </div>

                  <p className="text-sm text-ink leading-relaxed">
                    {client.summary}
                  </p>

                  <ul className="space-y-1 text-xs sm:text-sm text-muted leading-relaxed list-disc list-outside ml-4">
                    {client.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-xs font-mono text-meta pt-1">
                    {client.stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-wash/90 text-ink px-2 py-0.5 rounded-sm border border-rule-strong font-mono text-meta transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* Non-consulting Highlights (e.g. Reflexis) */}
          {exp.highlights && exp.highlights.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-md mt-sm">
              <div className="lg:col-start-6 lg:col-span-7 space-y-sm">
                <ul className="space-y-xs text-sm text-muted leading-relaxed list-disc list-outside ml-4">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-xs font-mono text-meta pt-xs">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-wash/90 text-ink px-2 py-0.5 rounded-sm border border-rule-strong font-mono text-meta transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </article>
      ))}

      {/* Academic Background & Credentials Subsection */}
      <div className="pt-8 mt-10 border-t border-dashed border-rule space-y-lg">
        <div className="text-meta font-mono text-accent uppercase tracking-meta font-semibold">
          ↳ Academic Background &amp; Credentials
        </div>

        <div className="space-y-md">
          {/* PG-DAC Entry */}
          <article className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pt-md first:pt-0 border-t first:border-t-0 border-rule/50">
            <div className="space-y-0.5">
              <h4 className="text-lg font-display font-semibold text-ink tracking-tight">
                Post Graduate Diploma in Advanced Computing (PG-DAC)
              </h4>
              <p className="text-sm font-sans text-muted">
                Centre for Development of Advanced Computing (C-DAC), ACTS Pune
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-meta text-muted sm:text-right shrink-0">
              <span className="text-accent font-medium">Mar 2021 – Sep 2021</span>
              <span>·</span>
              <span>Pune, India</span>
            </div>
          </article>

          {/* B.Tech Entry */}
          <article className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pt-md border-t border-rule/50">
            <div className="space-y-0.5">
              <h4 className="text-lg font-display font-semibold text-ink tracking-tight">
                Bachelor of Technology (B.Tech) in Electrical Engineering
              </h4>
              <p className="text-sm font-sans text-muted">
                Institute of Engineering &amp; Technology, M.J.P. Rohilkhand University
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-meta text-muted sm:text-right shrink-0">
              <span className="text-accent font-medium">Aug 2016 – Nov 2020</span>
              <span>·</span>
              <span>Bareilly, India</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

"use client";

import { site } from "../content/site";
import { Container } from "./container";

export function Hero() {
  return (
    <section className="relative pt-2xl pb-2xl overflow-hidden">
      {/* Blueprint Grid Background with radial mask */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at 50% 35%, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 35%, black 25%, transparent 75%)",
        }}
      />

      <Container width="shell">
        <div className="max-w-[56rem] space-y-lg">
          {/* Availability Beacon */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-wash border border-rule font-mono text-meta tracking-meta text-muted uppercase">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span>Available within 1 week · Full-time &amp; contract roles</span>
          </div>

          {/* Primary Display Claim */}
          <div className="space-y-3">
            <h1 className="text-display font-display text-ink leading-none tracking-tight">
              {site.role}.
            </h1>
            <p className="text-xl sm:text-2xl font-display text-ink font-medium leading-snug">
              {site.tagline}
            </p>
          </div>

          {/* Bio Support */}
          <p className="text-base sm:text-lg leading-relaxed text-muted max-w-[48rem]">
            {site.bio}
          </p>

          {/* Engineering Metadata Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-2 border-y border-rule font-mono text-xs text-muted">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted block mb-0.5">Location &amp; Mobility</span>
              <span className="text-ink font-medium">{site.location}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted block mb-0.5">Core Competencies</span>
              <span className="text-ink font-medium">Java 21 · Spring Boot · Playwright · TS</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted block mb-0.5">Direct Inquiry</span>
              <a href={`mailto:${site.email}`} className="text-accent font-semibold hover:underline">
                {site.email}
              </a>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-paper hover:bg-ink/90 font-mono font-semibold text-xs px-5 py-3 rounded-sm shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
            >
              <span>Download Resume (PDF)</span>
              <span className="text-accent font-bold">↓</span>
            </a>
            <a
              href="/resume/"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-sm bg-wash hover:bg-raised text-ink border border-rule font-mono font-medium text-xs transition-colors cursor-pointer"
            >
              <span>ATS Plaintext View</span>
              <span className="text-muted">↗</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

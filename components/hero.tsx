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
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
          {/* Left Column (lg:col-span-7): Headline, Bio, & Quick Nav */}
          <div className="lg:col-span-7 space-y-md">
            {/* Metadata line with animated beacon */}
            <div className="flex items-center gap-2 font-mono text-meta tracking-meta text-muted uppercase">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for full-time &amp; contract roles</span>
            </div>

            {/* Display Claim */}
            <h1 className="text-display font-display text-ink leading-tight tracking-tight">
              {site.role}.
            </h1>

            {/* Standfirst */}
            <p className="text-xl sm:text-2xl font-display text-ink font-medium leading-snug">
              {site.tagline}
            </p>

            {/* Bio Support */}
            <p className="text-base sm:text-body leading-relaxed text-muted max-w-[44rem]">
              {site.bio}
            </p>

            {/* Primary Action Buttons for Mobile/Tablet */}
            <div className="flex flex-wrap items-center gap-3 pt-xs">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-paper hover:bg-ink/90 font-mono font-semibold text-xs px-4 py-2.5 rounded-sm shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <span>Download Resume (PDF)</span>
                <span className="text-accent font-bold">↓</span>
              </a>
              <a
                href="/resume/"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-sm bg-wash hover:bg-raised text-ink border border-rule font-mono font-medium text-xs transition-colors cursor-pointer"
              >
                <span>ATS Resume Preview</span>
                <span className="text-muted">↗</span>
              </a>
            </div>

            {/* Quick jump navigation */}
            <div className="pt-2 flex flex-wrap items-center gap-md font-mono text-xs text-muted">
              <a
                href="#work"
                className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity font-semibold"
              >
                ↓ Selected work
              </a>
              <span className="text-rule-strong">/</span>
              <a
                href="#secondary"
                className="hover:text-ink transition-colors"
              >
                Inventory
              </a>
              <span className="text-rule-strong">/</span>
              <a
                href="#experience"
                className="hover:text-ink transition-colors"
              >
                Experience
              </a>
              <span className="text-rule-strong">/</span>
              <a
                href="#principles"
                className="hover:text-ink transition-colors"
              >
                How I Work
              </a>
              <span className="text-rule-strong">/</span>
              <a
                href="#contact"
                className="hover:text-ink transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Right Column (lg:col-span-5): Recruiter Fast-Track Card */}
          <div className="lg:col-span-5 flex flex-col justify-center w-full">
            <div className="w-full rounded-sm border border-rule-strong bg-wash/50 dark:bg-raised/40 shadow-sm backdrop-blur-sm overflow-hidden">
              {/* Header / Recruiter Flag */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-rule bg-wash/80 dark:bg-raised/70 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-bold text-ink uppercase tracking-wider">
                    Recruiter Fast-Track
                  </span>
                </div>
                <span className="text-[10px] text-muted font-medium uppercase tracking-wider">
                  Updated Sep 2026
                </span>
              </div>

              {/* Structured Spec Sections */}
              <div className="p-4 space-y-3.5 text-xs">
                {/* 1. Availability & Role Type */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-rule/60">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted mb-0.5">
                      Availability
                    </div>
                    <div className="text-sm font-sans font-semibold text-ink">
                      Available within 1 week
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted mb-0.5">
                      Role Type
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-[11px] font-mono font-medium bg-wash border border-rule-strong text-ink">
                      Full-time / Contract
                    </span>
                  </div>
                </div>

                {/* 2. Experience & Stack Badges */}
                <div className="pb-3 border-b border-rule/60">
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                      Experience &amp; Core Stack
                    </span>
                    <span className="text-xs font-mono font-bold text-ink">
                      4+ Years
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded-xs bg-wash border border-rule text-ink font-medium">
                      Java 21 / JVM
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-wash border border-rule text-ink font-medium">
                      Spring Boot
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-wash border border-rule text-ink font-medium">
                      TypeScript
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-wash border border-rule text-ink font-medium">
                      Multi-Agent SDLC
                    </span>
                  </div>
                </div>

                {/* 3. Engineering Focus */}
                <div className="pb-3 border-b border-rule/60">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted mb-1">
                    Engineering Focus
                  </div>
                  <p className="text-xs font-sans text-ink leading-relaxed font-medium">
                    Distributed backend infrastructure, browser automation engines, and developer productivity tooling.
                  </p>
                </div>

                {/* 4. Location & Mobility */}
                <div className="pb-3 border-b border-rule/60 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted mb-0.5">
                      Location &amp; Mobility
                    </div>
                    <div className="text-xs font-sans font-medium text-ink">
                      Open to relocation anywhere in India · or remote
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-muted shrink-0">
                    IST (UTC+5:30)
                  </span>
                </div>

                {/* 5. Direct Reach */}
                <div className="flex items-center justify-between gap-3 font-mono text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-muted font-medium">
                    Direct Reach
                  </span>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-accent hover:underline font-semibold text-xs tracking-tight"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { site } from "../content/site";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="my-md space-y-md">
      {/* Availability Status Banner */}
      <div className="p-sm sm:p-md rounded-sm border border-rule bg-raised/30 flex flex-col sm:flex-row sm:items-center justify-between gap-sm font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block animate-pulse shrink-0" />
          <span className="font-semibold text-ink uppercase tracking-wider text-[11px] sm:text-xs">
            Available for Full-Time Roles &amp; Technical Consulting
          </span>
        </div>
        <span className="text-muted text-[11px]">
          Timezone: IST (UTC+5:30) · Flexible US/EU Overlap
        </span>
      </div>

      <p className="text-body text-ink max-w-[var(--measure-prose)] leading-relaxed">
        Looking for systems, backend engineering, or developer platform roles, as well as technical consulting on enterprise automation engines, multi-agent SDLC systems, and high-throughput JVM backends.
      </p>

      {/* Primary Interaction Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-xs">
        {/* Card 1: Calendar Booking */}
        <div className="p-md rounded-sm border border-rule-strong bg-wash/60 hover:border-accent/80 transition-colors flex flex-col justify-between space-y-md">
          <div className="space-y-xs">
            <div className="font-mono text-meta text-accent font-bold uppercase tracking-wider">
              Direct Technical Conversation
            </div>
            <h3 className="font-display font-bold text-lg text-ink">
              Book a 20-min Architecture / Intro Call
            </h3>
            <p className="text-sm text-muted leading-relaxed font-sans">
              Discuss system requirements, task decomposition, JVM bottlenecks, or browser-automation regression suites directly.
            </p>
          </div>
          <div>
            <a
              href={`mailto:${site.email}?subject=Architecture%20Discussion%20%2F%20Intro%20Call`}
              className="inline-flex items-center gap-2 bg-ink text-paper hover:bg-ink/90 font-mono font-semibold text-xs px-4 py-2.5 rounded-sm shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
            >
              <span>Initiate Technical Discussion</span>
              <span className="text-accent font-bold">↗</span>
            </a>
          </div>
        </div>

        {/* Card 2: Direct Email & Telemetry */}
        <div className="p-md rounded-sm border border-rule bg-raised/40 hover:border-rule-strong transition-colors flex flex-col justify-between space-y-md">
          <div className="space-y-xs">
            <div className="font-mono text-meta text-muted font-bold uppercase tracking-wider">
              Asynchronous Communication
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink font-mono break-all">
              {site.email}
            </h3>
            <p className="text-sm text-muted leading-relaxed font-sans">
              Detailed technical queries, PRD review requests, or formal RFPs. Direct response typically within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <a
              href={`mailto:${site.email}`}
              className="px-3 py-2 rounded-sm bg-wash hover:bg-raised text-ink border border-rule font-medium transition-colors cursor-pointer"
            >
              Send Direct Email ↗
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="px-3 py-2 rounded-sm bg-wash hover:bg-raised text-muted hover:text-ink border border-rule transition-colors cursor-pointer"
            >
              {copied ? "✓ Copied to Clipboard" : "Copy Email"}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Channels & Resume */}
      <div className="pt-sm border-t border-rule flex flex-wrap items-center justify-between gap-sm font-mono text-xs text-muted">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-meta font-mono">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink text-ink/80 transition-colors flex items-center gap-1"
          >
            <span>LinkedIn</span>
            <span className="text-accent">↗</span>
          </a>
          <span className="text-rule-strong">/</span>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink text-ink/80 transition-colors flex items-center gap-1"
          >
            <span>GitHub</span>
            <span className="text-accent">↗</span>
          </a>
          <span className="text-rule-strong">/</span>
          <a
            href="/resume/"
            className="hover:text-ink text-ink/80 transition-colors flex items-center gap-1"
          >
            <span>Resume</span>
            <span className="text-accent">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

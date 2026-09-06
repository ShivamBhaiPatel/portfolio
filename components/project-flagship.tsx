"use client";

import Link from "next/link";
import { type Project } from "../content/projects";
import { WorkflowTopologyDiagram } from "./workflow-topology";
import { TiltCard } from "./tilt-card";

export function ProjectFlagship({ project }: { project: Project }) {
  return (
    <TiltCard maxTilt={2} className="relative my-xl rounded-sm border border-rule border-t-2 border-t-ink bg-raised p-md md:p-xl hover:border-rule-strong transition-colors">
      {/* Header Bar */}
      <div className="flex flex-wrap items-baseline justify-between gap-xs mb-xs">
        <span className="font-mono text-meta tracking-meta text-accent uppercase font-semibold">
          Flagship Architecture
        </span>
        {project.live && project.live.status === "up" ? (
          <span className="font-mono text-meta text-muted flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            <a href={project.live.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Live Dashboard ↗
            </a>
          </span>
        ) : null}
      </div>

      <div className="mb-md">
        <h3 className="text-display font-display text-ink text-2xl md:text-3xl mb-xs">
          {project.name}
        </h3>
        <p className="text-body text-muted leading-relaxed max-w-[var(--measure-prose)]">
          {project.summary}
        </p>
      </div>

      {/* Full-width Responsive Topology & DAG Diagram */}
      <WorkflowTopologyDiagram />

      {/* Split Grid: The Constraint (Left) + The Decision & Proof (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md my-md border-t border-rule pt-md">
        <div className="bg-wash/50 p-md rounded-sm border border-rule">
          <h4 className="font-mono text-meta tracking-meta uppercase text-muted mb-2xs font-semibold">
            The Architectural Challenge
          </h4>
          <p className="text-sm text-ink leading-relaxed">
            {project.tension}
          </p>
        </div>
        <div className="bg-wash/50 p-md rounded-sm border border-rule">
          <h4 className="font-mono text-meta tracking-meta uppercase text-muted mb-2xs font-semibold">
            The Engineering Solution
          </h4>
          <p className="text-sm text-ink leading-relaxed">
            {project.decision}
          </p>
        </div>
      </div>

      {/* Action / Case Study link */}
      <div className="mt-md pt-sm border-t border-rule flex flex-wrap items-center justify-between gap-sm">
        <div className="flex flex-wrap gap-xs font-mono text-meta text-muted">
          {project.stack.map((item) => (
            <span key={item} className="bg-wash px-2xs py-1 rounded-sm border border-rule">
              {item}
            </span>
          ))}
        </div>
        <Link
          href={`/work/${project.slug}`}
          className="font-mono text-sm text-accent font-semibold underline underline-offset-4 hover:opacity-80 whitespace-nowrap mt-xs sm:mt-0"
        >
          Read full case study →
        </Link>
      </div>
    </TiltCard>
  );
}

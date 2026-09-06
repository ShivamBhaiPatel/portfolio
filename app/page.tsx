import Link from "next/link";
import { projects } from "../content/projects";
import { PageShell } from "../components/page-shell";
import { Section } from "../components/section";
import { Hero } from "../components/hero";
import { ProjectFlagship } from "../components/project-flagship";
import { ProjectTable } from "../components/project-table";
import { ExperienceSection } from "../components/experience-section";
import { PrinciplesSection } from "../components/principles-section";
import { ContactSection } from "../components/contact-section";
import { FlowTraceDiagram, PracharFlowDiagram } from "../components/diagrams";
import { FlowTraceInteractive } from "../components/flowtrace-interactive";
import { PracharFlowComparison } from "../components/pracharflow-comparison";
import { TiltCard } from "../components/tilt-card";

export default function Home() {
  const flagship = projects.find((p) => p.slug === "workflow-studio");
  const flowtrace = projects.find((p) => p.slug === "flowtrace");
  const pracharflow = projects.find((p) => p.slug === "pracharflow");
  const compact = projects.filter((p) => p.tier === "compact");

  return (
    <PageShell>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Selected Work */}
      <Section
        id="work"
        kicker="01 / Production Systems"
        subkicker="High-Throughput JVM Backends, Playwright Automation & Developer Tooling"
        title="Selected Work"
        rule={true}
        width="wide"
      >
        <p className="text-body text-muted leading-relaxed max-w-[var(--measure-prose)] mb-md">
          Production software built under real performance, concurrency, and reliability constraints.
        </p>

        {/* Treatment 1: Flagship (Workflow Studio) */}
        {flagship ? <ProjectFlagship project={flagship} /> : null}

        {/* Treatment 2: FlowTrace — Two-Column Card with Simulator */}
        {flowtrace ? (
          <TiltCard className="my-2xl rounded-sm border border-rule bg-raised p-md md:p-lg relative">
            <div className="flex flex-wrap items-baseline justify-between gap-xs mb-xs">
              <span className="font-mono text-meta tracking-meta text-accent uppercase font-semibold">
                Featured System · Two-Tier Isolation
              </span>
              {flowtrace.live && flowtrace.live.status === "up" ? (
                <span className="font-mono text-meta text-muted flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                  <a href={flowtrace.live.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Live Platform ↗
                  </a>
                </span>
              ) : null}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
              {/* Left Column: Problem & Decision Narrative */}
              <div className="lg:col-span-6 space-y-md">
                <h3 className="text-display font-display text-ink text-2xl md:text-3xl">
                  {flowtrace.name}
                </h3>
                <p className="text-body text-ink font-medium leading-snug">
                  {flowtrace.summary}
                </p>

                <div className="space-y-sm text-sm text-muted leading-relaxed">
                  <div>
                    <h4 className="font-mono text-meta uppercase tracking-meta text-muted mb-1 font-semibold">
                      The Constraint &amp; Trade-off
                    </h4>
                    <p>{flowtrace.tension}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-meta uppercase tracking-meta text-muted mb-1 font-semibold">
                      Architecture Decision
                    </h4>
                    <p>{flowtrace.decision}</p>
                  </div>
                </div>

                <div className="pt-sm flex flex-wrap items-center justify-between gap-sm border-t border-rule">
                  <div className="flex flex-wrap gap-xs font-mono text-meta text-muted">
                    {flowtrace.stack.map((item) => (
                      <span key={item} className="bg-wash px-2xs py-1 rounded-sm border border-rule">
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/work/${flowtrace.slug}`}
                    className="font-mono text-sm text-accent underline underline-offset-4 hover:opacity-80 whitespace-nowrap"
                  >
                    Case study →
                  </Link>
                </div>
              </div>

              {/* Right Column: Inline SVG Diagram + Selector Fallback Tree */}
              <div className="lg:col-span-6 space-y-md">
                <FlowTraceDiagram />
                <FlowTraceInteractive />
              </div>
            </div>
          </TiltCard>
        ) : null}

        {/* Treatment 3: PracharFlow — Prose-Led (No Card) */}
        {pracharflow ? (
          <article className="my-2xl pt-xl border-t border-rule">
            <div className="flex flex-wrap items-baseline justify-between gap-xs mb-xs">
              <span className="font-mono text-meta tracking-meta text-accent uppercase font-semibold">
                Featured System · Deterministic Composition
              </span>
              {pracharflow.live && pracharflow.live.status === "up" ? (
                <span className="font-mono text-meta text-muted flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                  <a href={pracharflow.live.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Live Platform ↗
                  </a>
                </span>
              ) : null}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
              {/* Left 7 Columns: The Story & Parametric Composition Argument */}
              <div className="lg:col-span-7 space-y-md">
                <h3 className="text-display font-display text-ink text-2xl md:text-3xl">
                  {pracharflow.name}
                </h3>
                <p className="text-xl font-sans text-ink font-medium leading-relaxed">
                  {pracharflow.summary}
                </p>

                <p className="text-body text-ink leading-relaxed">
                  {pracharflow.tension}
                </p>

                <p className="text-body text-muted leading-relaxed">
                  {pracharflow.decision}
                </p>

                <div className="bg-wash p-md rounded-sm border border-rule">
                  <h4 className="font-mono text-meta uppercase tracking-meta text-muted mb-xs">
                    Consequence &amp; Verified Outcome
                  </h4>
                  <p className="text-sm text-ink leading-relaxed">
                    {pracharflow.consequence}
                  </p>
                </div>

                <div className="pt-sm flex flex-wrap items-center justify-between gap-sm">
                  <div className="flex flex-wrap gap-xs font-mono text-meta text-muted">
                    {pracharflow.stack.map((item) => (
                      <span key={item} className="bg-wash px-2xs py-1 rounded-sm border border-rule">
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/work/${pracharflow.slug}`}
                    className="font-mono text-sm text-accent underline underline-offset-4 hover:opacity-80 whitespace-nowrap"
                  >
                    Case study →
                  </Link>
                </div>
              </div>

              {/* Right 5 Columns: Diagram + Trade-off Analysis */}
              <div className="lg:col-span-5 space-y-md">
                <PracharFlowDiagram />
                <PracharFlowComparison />
              </div>
            </div>
          </article>
        ) : null}
      </Section>

      {/* 3. Also Running */}
      <Section
        id="secondary"
        kicker="02 / Secondary Inventory"
        subkicker="Compact Services & Utility Workers"
        title="Also Running"
        rule={false}
        width="wide"
        className="bg-wash/60 border-y border-rule py-16 sm:py-20"
      >
        <p className="text-body text-muted leading-relaxed max-w-[var(--measure-prose)] mb-md">
          Compact services, domain platforms, and price aggregators.
        </p>
        <ProjectTable projects={compact} />
      </Section>

      {/* 4. Experience */}
      <Section
        id="experience"
        kicker="03 / Engineering Career"
        subkicker="Enterprise Backends & Systems Architecture"
        title="Experience"
        rule={true}
        width="wide"
      >
        <ExperienceSection />
      </Section>

      {/* 5. Engineering Trade-Offs */}
      <Section
        id="trade-offs"
        kicker="04 / Architectural Decisions"
        subkicker="Trade-Offs & Rules of Thumb"
        title="Engineering Trade-Offs"
        rule={true}
        width="wide"
      >
        <span id="principles" className="sr-only" />
        <p className="text-body text-muted leading-relaxed max-w-[var(--measure-prose)] mb-md">
          Practical architectural heuristics and trade-offs drawn from building high-throughput JVM backends, browser automation suites, and developer platform tooling.
        </p>
        <PrinciplesSection />
      </Section>

      {/* 6. Contact */}
      <Section
        id="contact"
        kicker="05 / Direct Communication"
        subkicker="Availability & Fast Handoff"
        title="Contact"
        rule={true}
        width="wide"
        className="bg-wash/40 border-b border-rule pb-24"
      >
        <ContactSection />
      </Section>
    </PageShell>
  );
}

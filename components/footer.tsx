import Link from "next/link";
import { Container } from "./container";
import { site } from "../content/site";
import { projects } from "../content/projects";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Systems directory driven from content/projects.ts
  const footerProjects = projects.map((p) => ({
    name: p.name,
    href: p.tier === "flagship" || p.tier === "featured" ? `/work/${p.slug}` : undefined,
    status: p.live?.status,
    statusLabel: p.live?.status === "up" ? "Live" : p.live?.note || "Archived",
  }));

  return (
    <footer className="border-t border-rule bg-raised/40 text-muted mt-3xl py-16 transition-colors print:hidden">
      <Container width="shell">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-xl mb-xl">
          {/* Col 1: Identity & Role */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-sm">
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-ink">
                {site.name}
              </span>
              <span className="font-mono text-meta text-muted mt-0.5">
                {site.role}
              </span>
            </div>
            <p className="text-sm text-muted max-w-[var(--measure-prose)] leading-relaxed">
              Autonomous developer tooling, high-throughput JVM backends, and self-healing browser automation engines.
            </p>
          </div>

          {/* Col 2: Systems Directory */}
          <div className="lg:col-span-3 space-y-xs font-mono text-sm">
            <p className="font-mono text-meta text-ink uppercase tracking-meta mb-2 font-semibold">
              Systems
            </p>
            <ul className="space-y-2 text-xs">
              {footerProjects.map((p) => (
                <li key={p.name} className="flex items-baseline justify-between gap-2">
                  {p.href ? (
                    <Link
                      href={p.href}
                      className="text-muted hover:text-ink transition-colors hover:underline underline-offset-4 font-medium"
                    >
                      {p.name}
                    </Link>
                  ) : (
                    <span className="text-muted/80">{p.name}</span>
                  )}
                  <span
                    className={`text-[10px] tracking-tight uppercase ${
                      p.status === "up"
                        ? "text-accent font-semibold"
                        : "text-muted/60"
                    }`}
                  >
                    {p.statusLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation Anchors */}
          <div className="lg:col-span-2 space-y-xs font-mono text-sm">
            <p className="font-mono text-meta text-ink uppercase tracking-meta mb-2 font-semibold">
              Navigation
            </p>
            <ul className="space-y-1.5 text-xs text-muted">
              <li>
                <Link href="/#work" className="hover:text-ink transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/#secondary" className="hover:text-ink transition-colors">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-ink transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/#principles" className="hover:text-ink transition-colors">
                  How I Work
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-ink transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-ink transition-colors">
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div className="lg:col-span-3 space-y-xs font-mono text-sm">
            <p className="font-mono text-meta text-ink uppercase tracking-meta mb-2 font-semibold">
              Connect
            </p>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent underline underline-offset-4 hover:opacity-80 break-all font-medium"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Hairline Metadata */}
        <div className="pt-lg border-t border-rule flex flex-col sm:flex-row items-baseline justify-between gap-sm font-mono text-meta text-muted">
          <p>
            © {currentYear} {site.name}. Systems engineer.
          </p>
          <p>
            Built with Next.js 16.
          </p>
        </div>
      </Container>
    </footer>
  );
}

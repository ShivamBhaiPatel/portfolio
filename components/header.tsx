"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Container } from "./container";
import { site } from "../content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-rule transition-colors print:hidden">
      <Container width="shell">
        <div className="flex items-center justify-between gap-2 py-sm">
          {/* Brand Wordmark */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="group flex items-baseline gap-2 text-ink hover:text-accent transition-colors"
            >
              <span className="font-display font-bold text-base sm:text-lg tracking-tight whitespace-nowrap">
                <span className="sm:hidden">Shivam Patel</span>
                <span className="hidden sm:inline">{site.name}</span>
              </span>
              <span className="font-mono text-meta text-muted group-hover:text-accent/80 transition-colors hidden lg:inline">
                / {site.role}
              </span>
            </Link>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-3 sm:gap-md font-mono text-xs sm:text-sm">
            <nav className="flex items-center gap-3 sm:gap-md text-muted">
              <Link
                href="/#work"
                className="hover:text-ink transition-colors hover:underline underline-offset-4"
              >
                Work
              </Link>
              <Link
                href="/#secondary"
                className="hidden lg:inline-block hover:text-ink transition-colors hover:underline underline-offset-4"
              >
                Inventory
              </Link>
              <Link
                href="/#experience"
                className="hidden sm:inline-block hover:text-ink transition-colors hover:underline underline-offset-4"
              >
                Experience
              </Link>
              <Link
                href="/#trade-offs"
                className="hidden xl:inline-block hover:text-ink transition-colors hover:underline underline-offset-4"
              >
                Trade-Offs
              </Link>
              <Link
                href="/#contact"
                className="hover:text-ink transition-colors hover:underline underline-offset-4"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-2 sm:gap-sm shrink-0">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-block font-mono text-meta text-muted hover:text-ink transition-colors"
              >
                GitHub ↗
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

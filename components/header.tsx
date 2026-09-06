"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Container } from "./container";
import { site } from "../content/site";

const NAV_ITEMS = [
  { href: "/#work", label: "Selected Work", kicker: "01" },
  { href: "/#secondary", label: "Applications & Gateways", kicker: "02" },
  { href: "/#experience", label: "Experience", kicker: "03" },
  { href: "/#trade-offs", label: "Trade-Offs", kicker: "04" },
  { href: "/#contact", label: "Contact", kicker: "05" },
];

export function Header() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-hide on scroll down, auto-reveal on scroll up
  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (mobileOpen) {
            setVisible(true);
            ticking = false;
            return;
          }

          // At top of page, always reveal
          if (currentY < 40) {
            setVisible(true);
          } else if (currentY > lastY && currentY - lastY > 10) {
            // Scrolling down -> hide
            setVisible(false);
          } else if (currentY < lastY && lastY - currentY > 8) {
            // Scrolling up -> reveal
            setVisible(true);
          }
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  // Close on escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper border-b border-rule transition-transform duration-300 ${
        visible || mobileOpen ? "translate-y-0" : "-translate-y-full"
      } print:hidden`}
    >
      <Container width="shell">
        <div className="flex items-center justify-between gap-2 py-sm">
          {/* Brand Wordmark */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 sm:gap-md font-mono text-xs sm:text-sm">
            <nav className="flex items-center gap-3 sm:gap-md text-muted">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:text-ink transition-colors hover:underline underline-offset-4 ${
                    item.href === "/#secondary"
                      ? "hidden lg:inline-block"
                      : item.href === "/#trade-offs"
                      ? "hidden xl:inline-block"
                      : ""
                  }`}
                >
                  {item.label.split(" ")[0]}
                </Link>
              ))}
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

          {/* Mobile Actions: Theme Toggle + Hamburger Icon */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-sm bg-wash border border-rule text-ink hover:bg-raised active:scale-95 transition-all cursor-pointer"
            >
              {mobileOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-rule bg-paper/98 shadow-md">
          <Container width="shell">
            <div className="py-md space-y-md font-mono">
              <div className="text-[11px] uppercase tracking-wider text-muted font-semibold pb-1 border-b border-rule">
                Navigation Directory
              </div>

              <nav className="flex flex-col space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-2 rounded-sm text-sm text-ink hover:bg-wash hover:text-accent transition-colors"
                  >
                    <span className="font-sans font-medium">{item.label}</span>
                    <span className="text-meta text-muted font-mono">{item.kicker} ↗</span>
                  </Link>
                ))}
              </nav>

              <div className="pt-2 border-t border-rule space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-muted font-semibold">
                  Quick Actions
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-sm bg-wash border border-rule text-ink hover:bg-raised text-center font-medium"
                  >
                    Resume (PDF) ↓
                  </a>
                  <Link
                    href="/resume/"
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-sm bg-wash border border-rule text-ink hover:bg-raised text-center font-medium"
                  >
                    ATS View ↗
                  </Link>
                  <a
                    href={site.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-sm bg-wash border border-rule text-ink hover:bg-raised text-center font-medium"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href={site.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-sm bg-wash border border-rule text-ink hover:bg-raised text-center font-medium"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

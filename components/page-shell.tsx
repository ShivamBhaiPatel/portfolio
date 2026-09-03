import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink transition-colors duration-fast">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50
                   focus:top-sm focus:left-sm
                   focus:bg-raised focus:text-ink
                   focus:border focus:border-rule-strong focus:rounded-sm
                   focus:px-sm focus:py-2xs
                   focus:font-mono focus:text-meta"
      >
        Skip to content
      </a>

      {/* Persistent Navigation Masthead */}
      <Header />

      {/* Main Content Area */}
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>

      {/* Structural Footer */}
      <Footer />
    </div>
  );
}

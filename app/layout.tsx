import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import { fontVariables } from "./fonts";
import { themeScript } from "./theme-script";
import { site } from "../content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://shivambhaipatel.com"),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.bio,
  authors: [{ name: site.name, url: "https://shivambhaipatel.com" }],
  creator: site.name,
  keywords: [
    "Backend Engineer",
    "Platform Automation Engineer",
    "Java 21",
    "Spring Boot 3",
    "Playwright Automation",
    "TypeScript",
    "Multi-Agent SDLC",
    "Distributed Systems",
    "Workflow Studio",
    "FlowTrace",
  ],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.bio,
    url: "https://shivambhaipatel.com",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.bio,
  },
  alternates: {
    canonical: "https://shivambhaipatel.com",
  },
};

export const viewport: Viewport = {
  // Both values so the browser chrome matches the painted ground in either
  // theme. Same hexes as --paper in styles/globals.css (§5 tokens).
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#14130f" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.bio,
  url: "https://shivambhaipatel.com",
  sameAs: [site.links.github],
  knowsAbout: [
    "Backend Engineering",
    "Enterprise JVM Backends",
    "Browser Automation",
    "Playwright",
    "Spring Boot",
    "Java 21",
    "TypeScript",
    "Multi-Agent Systems",
    "Developer Tooling",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: themeScript writes data-theme onto <html>
    // before React hydrates, so server and client markup differ here by design.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-x-clip min-h-screen bg-paper text-ink">{children}</body>
    </html>
  );
}

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
    "PracharFlow",
    "DealDekho",
    "Browser Automation",
    "Enterprise Systems Architecture",
  ],
  category: "technology",
  classification: "Software Engineering Portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    canonical: "https://shivambhaipatel.com/",
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
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://shivambhaipatel.com/#person",
      name: site.name,
      jobTitle: site.role,
      description: site.bio,
      url: "https://shivambhaipatel.com",
      email: site.email,
      sameAs: [site.links.github, site.links.linkedin],
      knowsAbout: [
        "Backend Engineering",
        "Enterprise JVM Backends",
        "Browser Automation",
        "Playwright",
        "Spring Boot 3",
        "Java 21",
        "TypeScript",
        "Distributed Systems",
        "Multi-Agent SDLC Orchestration",
        "Developer Platform Tooling",
        "Reverse Engineering & Web Telemetry",
        "Deterministic Canvas Composition",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Centre for Development of Advanced Computing (C-DAC), ACTS Pune",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://shivambhaipatel.com/#website",
      url: "https://shivambhaipatel.com",
      name: `${site.name} — ${site.role}`,
      description: site.tagline,
      publisher: { "@id": "https://shivambhaipatel.com/#person" },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://shivambhaipatel.com/#profilepage",
      url: "https://shivambhaipatel.com",
      name: `${site.name} — Engineering Systems & Architecture Portfolio`,
      mainEntity: { "@id": "https://shivambhaipatel.com/#person" },
      inLanguage: "en-US",
    },
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

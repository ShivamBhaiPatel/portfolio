import localFont from "next/font/local";

/**
 * Spec §5 Type + §6 Fonts. Self-hosted through next/font/local: the files live
 * in /fonts (NOT /public), so Next fingerprints them, emits the @font-face
 * rules itself, and preloads them. No request leaves the origin at runtime,
 * which is the whole reason the spec rules out the Google Fonts link tag.
 *
 * Licences: all three are SIL OFL 1.1, which permits commercial use and
 * bundling with a website. Per-file copyright notices and the obligations we
 * meet are recorded in fonts/LICENSES.txt.
 *
 * `display: "swap"` plus `adjustFontFallback` would normally be the CLS story,
 * but next/font's automatic fallback metrics only apply to next/font/google.
 * The fallback stacks in globals.css are chosen as metric neighbours instead.
 */

export const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin.woff2", weight: "400 700", style: "normal" },
    { path: "../fonts/fraunces-latin-ext.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  // Fraunces carries an optical-size axis upstream. Google's subsetter may or
  // may not include it in this cut; the declaration is inert if it is absent,
  // so asking costs nothing and buys the tighter display cut where present.
  declarations: [{ prop: "font-optical-sizing", value: "auto" }],
  fallback: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
});

export const instrumentSans = localFont({
  src: [
    { path: "../fonts/instrument-sans-latin.woff2", weight: "400 700", style: "normal" },
    { path: "../fonts/instrument-sans-latin-ext.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-instrument-sans",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const jetbrainsMono = localFont({
  src: [
    { path: "../fonts/jetbrains-mono-latin.woff2", weight: "400 500", style: "normal" },
    { path: "../fonts/jetbrains-mono-latin-ext.woff2", weight: "400 500", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["ui-monospace", "SF Mono", "Consolas", "monospace"],
});

/** Applied once, on <html>, in app/layout.tsx. */
export const fontVariables = [
  fraunces.variable,
  instrumentSans.variable,
  jetbrainsMono.variable,
].join(" ");

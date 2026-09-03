import type { NextConfig } from "next";

// Spec §6: static export. Set here from the start so a route that cannot be
// statically rendered fails the build now, rather than at deploy time in P5.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  allowedDevOrigins: ["192.168.100.12"],

  experimental: {
    // icon barrels are huge — rewrite them to direct per-icon imports
    optimizePackageImports: ["react-icons", "lucide-react"],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
    ignoreDuringBuilds: true, // 👉 Disables ESLint errors from failing the build
  },
};

export default nextConfig;

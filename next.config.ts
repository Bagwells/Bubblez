import type { NextConfig } from "next";

const apiBackend =
  process.env.API_BACKEND_URL ?? "https://bubblezcleaningservices.co.za";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${apiBackend}/api/:path*` },
    ];
  },
};

export default nextConfig;

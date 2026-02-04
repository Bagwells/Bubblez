import type { NextConfig } from "next";

// Must be a URL that does NOT redirect to www (e.g. Express on Render/Railway, or your host with no redirect for /api).
// If you use bubblezcleaningservices.co.za and it redirects to www, you get ERR_TOO_MANY_REDIRECTS — set API_BACKEND_URL in Vercel to your API’s direct URL.
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

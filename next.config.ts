import type { NextConfig } from "next";

// /api/contact, /api/book, /api/quote are handled by Next.js API routes (src/app/api/*) on Vercel — no rewrite, no redirect loop.
const nextConfig: NextConfig = {};

export default nextConfig;

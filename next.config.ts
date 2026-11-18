import type { NextConfig } from "next";
import path from "node:path";

// NEXT_BUILD_WORKERS lets low-memory machines (or CI) cap build workers.
// Unset on Vercel: Next.js picks the default automatically.
const buildWorkers = Number(process.env.NEXT_BUILD_WORKERS);

const nextConfig: NextConfig = {
  experimental: buildWorkers > 0 ? { cpus: buildWorkers } : {},
  turbopack: {
    root: path.resolve(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

import type { NextConfig } from "next";

// Fully static content app: every page is prerendered at build time, so Cache
// Components / Partial Prefetching are not needed. Unknown mission ids 404 via
// `dynamicParams = false` in app/missions/[id]/page.tsx.
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

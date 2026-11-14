import type { NextConfig } from "next";

// On GitHub Pages the site lives under /tales-by-phani. The deploy workflow sets BASE_PATH;
// locally and on a custom domain it is empty.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;

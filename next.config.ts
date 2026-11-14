import type { NextConfig } from "next";

// Served from the root of www.talesbyphani.in, so BASE_PATH is normally empty. Set it only to serve
// from a sub-path such as https://<user>.github.io/tales-by-phani/.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;

import type { NextConfig } from "next";

/**
 * Для project Pages без своего домена нужен basePath:
 *   https://osagovrn.github.io/motorent36/
 * Задаётся в Actions: NEXT_PUBLIC_BASE_PATH=/motorent36
 * Со своим доменом на корне — оставьте пустым.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath
    ? { basePath, assetPrefix: basePath }
    : {}),
};

export default nextConfig;

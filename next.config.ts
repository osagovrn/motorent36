import type { NextConfig } from "next";

/**
 * Для project Pages нужен basePath:
 *   https://yvwvy.ru/motorent36/
 * Задаётся в Actions: NEXT_PUBLIC_BASE_PATH=/motorent36
 * Со своим доменом на корне — оставьте пустым.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Пробрасываем в клиентский бандл явно (для <img src>)
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(basePath
    ? { basePath, assetPrefix: basePath }
    : {}),
};

export default nextConfig;

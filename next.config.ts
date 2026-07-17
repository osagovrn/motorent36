import type { NextConfig } from "next";

/**
 * Прод: https://beri36.ru (BASE_PATH пустой).
 * Старый project Pages: NEXT_PUBLIC_BASE_PATH=/motorent36
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

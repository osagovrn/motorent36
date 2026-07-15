import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Локальные /products/*; Unsplash оставлен на случай старых URL в БД
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

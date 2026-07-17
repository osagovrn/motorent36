"use client";

import { preload } from "react-dom";
import { assetUrl } from "@/lib/assets";

/** Preload LCP hero (WebP) без <link> в body. */
export function HeroPreload({ src }: { src: string }) {
  const webp = src.replace(/\.jpe?g$/i, ".webp");
  preload(assetUrl(webp), { as: "image", type: "image/webp" });
  return null;
}

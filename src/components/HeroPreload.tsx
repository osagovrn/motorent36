"use client";

import { preload } from "react-dom";
import { assetUrl } from "@/lib/assets";

/** Preload LCP hero: JPEG всегда есть, WebP — если задеплоен. */
export function HeroPreload({ src }: { src: string }) {
  preload(assetUrl(src), { as: "image" });
  if (/\.jpe?g$/i.test(src)) {
    const webp = src.replace(/\.jpe?g$/i, ".webp");
    preload(assetUrl(webp), { as: "image", type: "image/webp" });
  }
  return null;
}

"use client";

import { useCallback, useRef, useState } from "react";
import { ProductImage } from "@/components/ProductImage";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const main = images[active] ?? images[0];

  const go = useCallback(
    (dir: -1 | 1) => {
      if (images.length < 2) return;
      setActive((i) => (i + dir + images.length) % images.length);
    },
    [images.length],
  );

  if (!main) return null;

  return (
    <div>
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-zinc-100"
        onTouchStart={(e) => {
          touchX.current = e.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX;
          touchX.current = null;
          if (start == null || end == null) return;
          const delta = end - start;
          if (Math.abs(delta) < 40) return;
          go(delta < 0 ? 1 : -1);
        }}
      >
        <ProductImage
          key={main}
          src={main}
          alt={alt}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="gallery-fade"
        />
      </div>
      {images.length > 1 && (
        <div
          className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3"
          role="group"
          aria-label="Другие ракурсы"
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ракурс ${i + 1}`}
              aria-pressed={i === active}
              className={cn(
                "focus-ring relative aspect-[4/3] overflow-hidden rounded-xl border bg-zinc-100 transition",
                i === active
                  ? "border-amber-500 ring-1 ring-amber-500/40"
                  : "border-white/10 hover:border-amber-500/40",
              )}
            >
              <ProductImage
                src={src}
                alt={`${alt} — ракурс ${i + 1}`}
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

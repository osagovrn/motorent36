import { assetUrl } from "@/lib/assets";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

function isRaster(src: string): boolean {
  return /\.(jpe?g|png|webp|gif|avif)(\?|$)/i.test(src);
}

function isRemote(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

function jpegBase(src: string): string | null {
  const m = src.match(/^(.*)\.(jpe?g)(\?.*)?$/i);
  return m ? m[1] : null;
}

/** Заглушка шлема — inline SVG (файл .svg как <img> глючил). */
function HelmetPlaceholder({ alt, className }: { alt: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950",
        className,
      )}
    >
      <svg
        viewBox="0 0 400 300"
        className="h-[85%] w-[85%]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <radialGradient id="g" cx="50%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="url(#g)" />
        <ellipse
          cx="200"
          cy="130"
          rx="95"
          ry="78"
          fill="#27272a"
          stroke="#f59e0b"
          strokeWidth="3"
        />
        <path
          d="M105 130 Q200 45 295 130"
          fill="none"
          stroke="#3f3f46"
          strokeWidth="8"
        />
        <rect
          x="135"
          y="118"
          width="130"
          height="34"
          rx="8"
          fill="#111113"
          stroke="#52525b"
          strokeWidth="2"
        />
        <path
          d="M120 165 Q200 200 280 165"
          fill="none"
          stroke="#52525b"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <text
          x="200"
          y="250"
          textAnchor="middle"
          fill="#a1a1aa"
          fontFamily="system-ui,sans-serif"
          fontSize="14"
          fontWeight="600"
        >
          Фото скоро
        </text>
      </svg>
    </div>
  );
}

/**
 * Фото товара без next/image (static export).
 * JPEG + WebP srcset через <picture>. Картинка всегда absolute inset-0
 * внутри родителя с relative + aspect/высотой.
 */
export function ProductImage({ src, alt, className, priority, sizes }: Props) {
  const resolvedSrc = assetUrl(src);
  const usePlaceholder =
    !isRaster(src) &&
    !isRemote(src) &&
    (src.toLowerCase().endsWith(".svg") || !src);

  if (usePlaceholder) {
    return <HelmetPlaceholder alt={alt} className={className} />;
  }

  const base = !isRemote(src) ? jpegBase(src) : null;
  const imgClass = cn(
    "absolute inset-0 h-full w-full bg-zinc-100 object-contain object-center",
    className,
  );

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolvedSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      decoding="async"
      sizes={sizes}
      className={imgClass}
    />
  );

  if (!base) return img;

  const srcSet = [
    `${assetUrl(`${base}-800.webp`)} 800w`,
    `${assetUrl(`${base}-1200.webp`)} 1200w`,
    `${assetUrl(`${base}.webp`)} 1600w`,
  ].join(", ");

  // Не display:contents — иначе absolute у img ломается в части браузеров.
  return (
    <picture className="absolute inset-0 block h-full w-full">
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      {img}
    </picture>
  );
}

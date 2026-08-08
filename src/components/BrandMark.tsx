import { cn } from "@/lib/utils";

/** Значок бренда — нейтральный, не привязан к одной категории товаров. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex h-8 w-8 shrink-0 sm:h-9 sm:w-9", className)}>
      <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#18181b" />
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          opacity="0.35"
        />
        <text
          x="20"
          y="26"
          textAnchor="middle"
          fill="#f59e0b"
          fontFamily="system-ui, sans-serif"
          fontSize="18"
          fontWeight="800"
        >
          B
        </text>
      </svg>
    </span>
  );
}

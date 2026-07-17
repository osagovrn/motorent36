import { cn } from "@/lib/utils";

/** Значок бренда в шапке — вариант D (печать). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex h-8 w-8 shrink-0 sm:h-9 sm:w-9", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-full w-full"
        aria-hidden
      >
        <rect width="40" height="40" rx="10" fill="#18181b" />
        <circle
          cx="20"
          cy="20"
          r="12"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <circle
          cx="20"
          cy="20"
          r="9.5"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1"
          opacity="0.45"
        />
        <path
          d="M13 23c1.5-6 3.8-8.5 7-8.5s5.5 2.5 7 8.5"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="15.5"
          y="18.5"
          width="9"
          height="2.4"
          rx="1"
          fill="#f59e0b"
        />
      </svg>
    </span>
  );
}

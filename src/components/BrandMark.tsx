import { cn } from "@/lib/utils";
import { LogoMarkD } from "@/components/LogoMarks";

/** Значок бренда в шапке — вариант D (печать). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex h-8 w-8 shrink-0 sm:h-9 sm:w-9", className)}>
      <LogoMarkD />
    </span>
  );
}

import { cn } from "@/lib/utils";

type MarkProps = { className?: string; title?: string };

const frame = (
  <>
    <rect width="40" height="40" rx="10" fill="#18181b" />
  </>
);

/** A — дуга шлема (текущий стиль) */
export function LogoMarkA({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-full w-full", className)} aria-hidden>
      {frame}
      <path
        d="M8 26c3.5-10 7-13.5 12-13.5S28.5 16 32 26"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="16.5" r="2.4" fill="#f59e0b" />
    </svg>
  );
}

/** B — монограмма M */
export function LogoMarkB({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-full w-full", className)} aria-hidden>
      {frame}
      <path
        d="M9 28 V14 L20 24 L31 14 V28"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14c2.5-3 5.5-4.5 8-4.5S25.5 11 28 14"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

/** C — шлем сбоку, 3 формы */
export function LogoMarkC({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-full w-full", className)} aria-hidden>
      {frame}
      <path
        d="M10 24c0-7 4.5-12 12-12 5.5 0 9 3.5 9 8.5 0 2-.5 3.5-1.5 4.5H14c-2.2 0-4-1.5-4-3.5z"
        fill="#f59e0b"
      />
      <rect x="14" y="18" width="14" height="3.2" rx="1.2" fill="#18181b" />
      <path
        d="M12 25.5h14c1.2 0 2 .7 2 1.7v1.3c0 1.2-1.4 2-3 2H14c-2 0-4-.9-4-2.5 0-1.3 1-2.5 2-2.5z"
        fill="#f59e0b"
        opacity="0.75"
      />
    </svg>
  );
}

/** D — шлем в круглой печати */
export function LogoMarkD({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-full w-full", className)} aria-hidden>
      {frame}
      <circle cx="20" cy="20" r="12" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="20" cy="20" r="9.5" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.45" />
      <path
        d="M13 23c1.5-6 3.8-8.5 7-8.5s5.5 2.5 7 8.5"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="15.5" y="18.5" width="9" height="2.4" rx="1" fill="#f59e0b" />
    </svg>
  );
}

/** E — профиль + скорость */
export function LogoMarkE({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-full w-full", className)} aria-hidden>
      {frame}
      <path
        d="M18 12c5 0 9 3.2 9 8.2 0 1.8-.6 3.2-1.6 4.2H17.5c-2.8 0-4.5-2-4.5-4.5 0-4.2 2.2-7.9 5-7.9z"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M16 19.5h9.5"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 16h5M6 20h6M8 24h4"
        stroke="#f59e0b"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export const LOGO_OPTIONS = [
  {
    id: "A",
    name: "Дуга шлема",
    note: "Близко к текущему — минимализм",
    Mark: LogoMarkA,
  },
  {
    id: "B",
    name: "Монограмма M",
    note: "Буква бренда + намёк на шлем",
    Mark: LogoMarkB,
  },
  {
    id: "C",
    name: "Шлем сбоку",
    note: "Предметный, сразу ясно «прокат»",
    Mark: LogoMarkC,
  },
  {
    id: "D",
    name: "Печать",
    note: "Плотный бейдж в круге",
    Mark: LogoMarkD,
  },
  {
    id: "E",
    name: "Скорость",
    note: "Профиль + линии движения",
    Mark: LogoMarkE,
  },
] as const;

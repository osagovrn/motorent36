import { SEO_CONFIG } from "@/config/seo";

type Project = {
  href: string;
  title: string;
  description: string;
  domain: string;
};

const PROJECTS: Project[] = [
  {
    href: "https://yvwvy.ru/",
    title: "ОСАГО и КАСКО онлайн",
    description:
      "Оформление и продление полиса по России · ≈ 60 минут · официальные страховые",
    domain: "yvwvy.ru",
  },
  {
    href: "https://skladvrn.ru/",
    title: "Склад Евгения",
    description:
      "Кабель и пожарное оборудование · склад в Воронеже · напрямую без посредников",
    domain: "skladvrn.ru",
  },
  {
    href: "https://elenaperm.ru/",
    title: "Перманентный макияж — Елена",
    description:
      "Брови и губы · естественный результат · Воронеж, ул. Ани Максимовой",
    domain: "elenaperm.ru",
  },
];

/** Блок «Ещё в Воронеже» — другие проекты */
export function MoreInVoronezh() {
  return (
    <aside
      className="relative overflow-hidden border-y border-amber-500/20"
      aria-label="Ещё в Воронеже"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_120%_at_50%_0%,rgba(245,158,11,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
            Ещё в Воронеже
          </p>
          <h2 className="font-display mt-1 text-xl text-amber-50 sm:text-2xl">
            Другие наши проекты
          </h2>
          <p className="mt-1 text-sm leading-snug text-zinc-400">
            Локальные сервисы рядом по городу — тот же контакт, другие задачи.
          </p>
        </div>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <li key={p.href}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group focus-ring relative flex h-full flex-col overflow-hidden rounded-xl border border-amber-500/25 bg-gradient-to-br from-amber-500/[0.08] via-zinc-950 to-zinc-950 p-4 transition hover:border-amber-400/45"
              >
                <span
                  className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 opacity-80"
                  aria-hidden
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-400/90">
                  Наш проект
                </p>
                <p className="font-display mt-1 text-base font-bold leading-snug text-amber-50 group-hover:text-amber-100">
                  {p.title}
                </p>
                <p className="mt-1 flex-1 text-sm leading-snug text-zinc-400">
                  {p.description}
                </p>
                <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-amber-300">
                  {p.domain}
                  <span
                    aria-hidden
                    className="transition group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

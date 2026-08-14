import { SEO_CONFIG } from "@/config/seo";
import { PLACE_NAMES, type Locale } from "@/i18n/locales";
import type { Dict } from "@/i18n/types";

function yandexMapsUrl() {
  const { mapLat, mapLon, street, city } = SEO_CONFIG;
  const q = `${city}, ${street}`;
  return `https://yandex.ru/maps/?ll=${mapLon}%2C${mapLat}&z=15&pt=${mapLon},${mapLat},pm2rdm&l=map&text=${encodeURIComponent(q)}`;
}

/** Маршрут до точки в приложении Яндекс.Навигатор (с текущей геопозиции). */
function yandexNaviUrl() {
  const { mapLat, mapLon } = SEO_CONFIG;
  return `yandexnavi://build_route_on_map?lat_to=${mapLat}&lon_to=${mapLon}`;
}

/** Район Никольское / Машмет, метка на ул. Ани Максимовой. */
function osmEmbedUrl() {
  const { mapLat, mapLon } = SEO_CONFIG;
  // bbox вокруг мкр. Никольское и Машмета
  const west = 39.28;
  const south = 51.555;
  const east = 39.36;
  const north = 51.61;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${west}%2C${south}%2C${east}%2C${north}&layer=mapnik&marker=${mapLat}%2C${mapLon}`;
}

/** Кусок карты: Никольское у Машмета, ул. Ани Максимовой */
export function LocationMap({ dict, locale }: { dict: Dict; locale: Locale }) {
  const places = PLACE_NAMES[locale];
  const mapsHref = yandexMapsUrl();
  const naviHref = yandexNaviUrl();
  const embedSrc = osmEmbedUrl();

  return (
    <section
      id="gde-my"
      className="border-y border-white/5"
      aria-labelledby="gde-my-title"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-500/90">
              {dict.location.label}
            </p>
            <h2
              id="gde-my-title"
              className="font-display mt-1 text-2xl text-amber-50 sm:text-3xl"
            >
              {dict.location.title}
            </h2>
            <p className="mt-2 text-zinc-400">
              <strong className="font-semibold text-amber-100">
                {places.locality}
              </strong>{" "}
              {dict.location.description(places.city, places.street)}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 self-start sm:w-auto sm:flex-row sm:flex-wrap">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-xl border border-amber-500/45 bg-amber-500/10 px-4 text-center text-sm font-semibold text-amber-100 hover:border-amber-400 hover:bg-amber-500/20"
            >
              {dict.location.openMaps}
            </a>
            <a
              href={naviHref}
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 text-center text-sm font-semibold text-zinc-100 hover:border-amber-500/45 hover:bg-amber-500/10 hover:text-amber-100"
            >
              {dict.location.openNavi}
            </a>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-amber-500/30 bg-zinc-950 shadow-[0_0_0_1px_rgba(245,158,11,0.08),0_24px_60px_-36px_rgba(245,158,11,0.35)]">
          <span
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
            aria-hidden
          />

          <div className="pointer-events-none absolute left-3 top-3 z-20 sm:left-4 sm:top-4">
            <span className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-zinc-950/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-100 backdrop-blur-md">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                aria-hidden
              />
              {places.street}
            </span>
          </div>

          <div className="pointer-events-none absolute bottom-3 left-3 z-20 max-w-[16rem] rounded-lg border border-white/10 bg-zinc-950/85 px-3 py-2 text-[11px] leading-snug text-zinc-300 backdrop-blur-md sm:bottom-4 sm:left-4 sm:max-w-sm sm:text-xs">
            {places.locality} · {places.landmark} · {places.street}
          </div>

          <div className="map-embed relative h-48 w-full overflow-hidden sm:h-56 lg:h-64">
            <iframe
              title={`Карта: ${SEO_CONFIG.address}`}
              src={embedSrc}
              className="absolute inset-0 h-[calc(100%+6rem)] w-[calc(100%+2rem)] -translate-x-4 -translate-y-12 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

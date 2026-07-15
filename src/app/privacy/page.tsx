import type { Metadata } from "next";
import Link from "next/link";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description: `Политика обработки персональных данных ${SEO_CONFIG.brandName}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/" className="text-sm text-amber-400 hover:underline">
        ← На главную
      </Link>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-amber-50 sm:text-4xl">
        Политика обработки персональных данных
      </h1>
      <p className="mt-2 text-sm text-zinc-500">{SEO_CONFIG.brandName}</p>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-zinc-300">
        <p>
          Оператор обрабатывает персональные данные пользователей сайта{" "}
          {SEO_CONFIG.brandName} в объёме, необходимом для связи по заявке на
          прокат и исполнения договора.
        </p>
        <h2 className="text-lg font-semibold text-amber-50">Какие данные</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>имя;</li>
          <li>номер телефона;</li>
          <li>предпочитаемый способ связи;</li>
          <li>сведения о выбранном товаре, размере и датах аренды.</li>
        </ul>
        <h2 className="text-lg font-semibold text-amber-50">Цели</h2>
        <p>
          Связь с заявителем, подтверждение брони, согласование встречи{" "}
          {SEO_CONFIG.cityInFormat}, исполнение договора проката, выдача чека
          НПД при расчёте.
        </p>
        <h2 className="text-lg font-semibold text-amber-50">Передача третьим лицам</h2>
        <p>
          Данные не продаются. Могут передаваться сервисам связи (Telegram /
          телефон) и инфраструктуре хостинга в объёме, нужном для работы сайта и
          уведомлений о заявках.
        </p>
        <h2 className="text-lg font-semibold text-amber-50">
          Cookies и веб-аналитика
        </h2>
        <p>
          При подключении Яндекс.Метрики на сайте могут использоваться файлы
          cookie и похожие технологии для статистики посещений (просмотры
          страниц, источники трафика, конверсии по заявкам). Данные обрабатываются
          в обезличенном или агрегированном виде в рамках работы сервиса
          аналитики. Отключить cookie можно в настройках браузера; при этом часть
          функций сайта может работать ограниченно.
        </p>
        <h2 className="text-lg font-semibold text-amber-50">Срок и права</h2>
        <p>
          Данные хранятся до достижения целей обработки или отзыва согласия, если
          иное не требуется законом. По вопросам обработки: {SEO_CONFIG.email},{" "}
          {SEO_CONFIG.phoneDisplay}.
        </p>
        <p>
          Полные условия проката:{" "}
          <Link href="/offer" className="text-amber-400 hover:underline">
            договор-оферта
          </Link>
          .
        </p>
      </div>
    </article>
  );
}

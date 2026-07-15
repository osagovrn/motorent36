import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_CONFIG, SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = {
  title: "Договор-оферта проката",
  description: `Публичная оферта проката ${SEO_CONFIG.brandName} ${SEO_CONFIG.cityInFormat}.`,
  alternates: { canonical: "/offer" },
  robots: { index: true, follow: true },
};

export default function OfferPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/" className="text-sm text-amber-400 hover:underline">
        ← На главную
      </Link>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-amber-50 sm:text-4xl">
        Договор-оферта проката
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Публичная оферта · редакция от {LEGAL_CONFIG.offerRevision} ·{" "}
        {SEO_CONFIG.city}
      </p>

      <div className="mt-8 space-y-5 text-sm leading-relaxed text-zinc-300">
        <section>
          <h2 className="text-lg font-semibold text-amber-50">1. Арендодатель</h2>
          <p className="mt-2">
            Арендодатель — физическое лицо, {LEGAL_CONFIG.statusLabel},
            осуществляющее деятельность под коммерческим обозначением{" "}
            {SEO_CONFIG.brandName}. Арендодатель не является плательщиком НДС.
            Онлайн-ККТ на сайте не применяется; при расчёте чек может быть выдан
            через приложение «Мой налог».
          </p>
          <p className="mt-2">
            ФИО и ИНН Арендодателя сообщаются при заключении договора и
            указываются в акте приёма-передачи имущества при встрече. На данном
            сайте они намеренно не публикуются.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">2. Предмет оферты</h2>
          <p className="mt-2">
            Настоящий документ — публичная оферта заключить договор проката
            движимого имущества (мотошлем и иное оборудование из каталога сайта).
            Акцепт оферты: отправка заявки на сайте с согласием с условиями и
            последующее получение имущества на согласованной встрече{" "}
            {SEO_CONFIG.cityInFormat}.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">
            3. Стоимость, обеспечительный платёж и сроки
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Минимальный срок проката — 1 сутки.</li>
            <li>
              Стоимость суток указана в карточке товара. Любое превышение срока
              округляется вверх до полных суток.
            </li>
            <li>
              При получении Арендатор передаёт сумму, равную полной рыночной
              стоимости предмета (обеспечительный платёж).
            </li>
            <li>
              При своевременном возврате исправной вещи Арендодатель возвращает
              разницу между рыночной стоимостью и начисленной платой за прокат
              (возвратный залог).
            </li>
            <li>
              Онлайн-оплата на сайте отсутствует. Расчёты — при встрече или иным
              согласованным способом.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">
            4. Заключение договора и акт передачи
          </h2>
          <p className="mt-2">
            При встрече стороны оформляют акт приёма-передачи имущества, в котором
            указываются: ФИО Арендодателя, данные Арендатора (паспорт или
            водительское удостоверение), предмет проката, срок, стоимость суток,
            сумма обеспечительного платежа и состояние вещи. Допускается
            фотофиксация документов Арендатора исключительно для целей договора и
            возврата имущества.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">5. Ответственность</h2>
          <p className="mt-2">
            При утрате, повреждении или порче имущества Арендатор возмещает ущерб
            в пределах рыночной стоимости предмета и иных убытков по закону.
            Обеспечительный платёж может быть удержан полностью или частично в
            счёт возмещения.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">
            6. Персональные данные
          </h2>
          <p className="mt-2">
            Отправляя заявку, вы соглашаетесь на обработку персональных данных
            (имя, телефон, сведения о бронировании) для связи, исполнения
            договора и выдачи чека НПД. Подробнее:{" "}
            <Link href="/privacy" className="text-amber-400 hover:underline">
              Политика обработки персональных данных
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">7. Контакты</h2>
          <p className="mt-2">
            Контактное лицо: {SEO_CONFIG.contactName}
            <br />
            Тел.: {SEO_CONFIG.phoneDisplay}
            <br />
            Email: {SEO_CONFIG.email}
            <br />
            Telegram: {SEO_CONFIG.telegram}
            <br />
            MAX: {SEO_CONFIG.maxDisplay} ({SEO_CONFIG.maxUrl})
            <br />
            Адрес встреч: {SEO_CONFIG.address}
          </p>
        </section>

        <p className="text-zinc-500">
          Документ является шаблоном для режима НПД и не заменяет индивидуальную
          юридическую консультацию. При необходимости уточните формулировки у
          юриста.
        </p>
      </div>
    </article>
  );
}

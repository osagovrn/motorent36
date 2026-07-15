import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_CONFIG, SEO_CONFIG, legalIdentityLine } from "@/config/seo";

export const metadata: Metadata = {
  title: "Договор-оферта проката",
  description: `Публичная оферта проката ${SEO_CONFIG.brandName} ${SEO_CONFIG.cityInFormat}.`,
  robots: { index: true, follow: true },
};

export default function OfferPage() {
  const missingRequisites =
    !LEGAL_CONFIG.fullName.trim() || !LEGAL_CONFIG.inn.trim();

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

      {missingRequisites && (
        <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Перед публикацией заполните ФИО и ИНН в файле{" "}
          <code className="text-amber-50">src/config/seo.ts</code> → блок{" "}
          <code className="text-amber-50">LEGAL_CONFIG</code>.
        </p>
      )}

      <div className="mt-8 space-y-5 text-sm leading-relaxed text-zinc-300">
        <section>
          <h2 className="text-lg font-semibold text-amber-50">1. Арендодатель</h2>
          <p className="mt-2">
            Арендодатель: {legalIdentityLine()}. Коммерческое обозначение:{" "}
            {SEO_CONFIG.brandName}. Арендодатель не является плательщиком НДС и не
            применяет контрольно-кассовую технику онлайн на сайте; по доходам
            выдаёт чек через приложение «Мой налог» (при необходимости — при
            расчёте на встрече).
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
              стоимости предмета (обеспечительный платёж / обеспечение
              исполнения обязательств).
            </li>
            <li>
              При своевременном возврате исправной вещи Арендодатель возвращает
              разницу между рыночной стоимостью и начисленной платой за прокат
              (возвратный залог).
            </li>
            <li>
              Онлайн-оплата на сайте отсутствует. Расчёты — наличными или иным
              согласованным способом при встрече / в мессенджере.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">
            4. Идентификация Арендатора
          </h2>
          <p className="mt-2">
            Для заключения договора Арендатор предъявляет паспорт гражданина РФ
            или водительское удостоверение. Допускается фотофиксация документов
            на месте встречи исключительно для целей договора и возврата
            имущества.
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
            Тел.: {SEO_CONFIG.phoneDisplay}
            <br />
            Email: {SEO_CONFIG.email}
            <br />
            Telegram: {SEO_CONFIG.telegram}
            <br />
            Адрес встреч: {SEO_CONFIG.address}
          </p>
        </section>

        <p className="text-zinc-500">
          Документ является шаблоном для режима НПД и не заменяет индивидуальную
          юридическую консультацию. Перед стартом деятельности заполните
          реквизиты и при необходимости уточните формулировки у юриста.
        </p>
      </div>
    </article>
  );
}

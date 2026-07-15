import type { Metadata } from "next";
import Link from "next/link";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = {
  title: "Договор-оферта проката",
  description: `Публичная оферта проката ${SEO_CONFIG.brandName} ${SEO_CONFIG.cityInFormat}.`,
  robots: { index: true, follow: true },
};

export default function OfferPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/" className="text-sm text-amber-400 hover:underline">
        ← На главную
      </Link>
      <h1 className="font-display mt-4 text-4xl text-amber-50">
        Договор-оферта проката
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Редакция для самозанятого · г. {SEO_CONFIG.city}
      </p>

      <div className="prose prose-invert mt-8 max-w-none space-y-4 text-sm leading-relaxed text-zinc-300">
        <p>
          Настоящий документ является публичной офертой (предложением) самозанятого
          лица, ведущего деятельность под брендом {SEO_CONFIG.brandName}, заключить
          договор проката движимого имущества на условиях, изложенных ниже.
        </p>
        <h2 className="text-lg font-semibold text-amber-50">1. Предмет</h2>
        <p>
          Арендодатель передаёт Арендатору имущество (мотошлем / иное оборудование из
          каталога) во временное владение и пользование за плату (прокат), а
          Арендатор обязуется вернуть имущество в согласованный срок в надлежащем
          состоянии.
        </p>
        <h2 className="text-lg font-semibold text-amber-50">2. Стоимость и обеспечение</h2>
        <p>
          Минимальный срок проката — 1 сутки. Стоимость суток указывается в карточке
          товара. При получении Арендатор вносит сумму, равную полной рыночной
          стоимости предмета (обеспечительный платёж). При возврате исправной вещи
          Арендодатель возвращает разницу между рыночной стоимостью и начисленной
          платой за прокат (возвратный залог). При просрочке возврата начисляется
          стоимость следующих суток.
        </p>
        <h2 className="text-lg font-semibold text-amber-50">3. Идентификация</h2>
        <p>
          Для оформления договора Арендатор предъявляет паспорт или водительское
          удостоверение. Допускается фотофиксация документов на месте встречи.
        </p>
        <h2 className="text-lg font-semibold text-amber-50">4. Ответственность</h2>
        <p>
          В случае утраты, повреждения или порчи имущества Арендатор возмещает ущерб
          в пределах рыночной стоимости предмета и иных убытков, предусмотренных
          законом. Онлайн-оплата на сайте не производится — все расчёты происходят
          при личной встрече или по согласованию в мессенджере.
        </p>
        <h2 className="text-lg font-semibold text-amber-50">5. Персональные данные</h2>
        <p>
          Отправляя заявку, вы соглашаетесь на обработку персональных данных
          (имя, телефон, сведения о бронировании) для связи и исполнения договора.
        </p>
        <h2 className="text-lg font-semibold text-amber-50">6. Контакты</h2>
        <p>
          Телефон: {SEO_CONFIG.phoneDisplay}. Город: {SEO_CONFIG.city}. Email:{" "}
          {SEO_CONFIG.email}.
        </p>
        <p className="text-zinc-500">
          Текст оферты носит шаблонный характер и может быть уточнён перед стартом
          публичной деятельности. При необходимости обратитесь к юристу.
        </p>
      </div>
    </article>
  );
}

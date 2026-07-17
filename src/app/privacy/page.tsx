import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_CONFIG, SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description: `Политика обработки персональных данных ${SEO_CONFIG.brandName}.`,
  alternates: { canonical: "/privacy/" },
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
      <p className="mt-2 text-sm text-zinc-500">
        {SEO_CONFIG.brandName} · редакция от {LEGAL_CONFIG.privacyRevision}
      </p>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-zinc-300">
        <section>
          <h2 className="text-lg font-semibold text-amber-50">1. Оператор</h2>
          <p className="mt-2">
            Оператор персональных данных — физическое лицо,{" "}
            {LEGAL_CONFIG.statusLabel}, осуществляющее деятельность под
            обозначением {SEO_CONFIG.brandName}. ФИО и реквизиты Оператора
            сообщаются при заключении договора проката и указываются в акте
            приёма-передачи; на сайте не публикуются.
          </p>
          <p className="mt-2">
            Контакты по вопросам ПДн: {SEO_CONFIG.email},{" "}
            {SEO_CONFIG.phoneDisplay}, Telegram {SEO_CONFIG.telegram}.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">
            2. Какие данные обрабатываются
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>имя / обращение;</li>
            <li>номер телефона;</li>
            <li>предпочитаемый способ связи (телефон, Telegram, MAX);</li>
            <li>
              сведения о выбранном товаре, размере, датах и сумме проката;
            </li>
            <li>
              при заключении договора — данные паспорта или водительского
              удостоверения и их фотокопии (если вы их предоставили на встрече);
            </li>
            <li>
              технические данные при посещении сайта (IP, cookie — при
              подключении аналитики).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">
            3. Цели и правовые основания
          </h2>
          <p className="mt-2">
            Цели: связь по брони, согласование встречи {SEO_CONFIG.cityInFormat},
            заключение и исполнение договора проката, возврат имущества, выдача
            чека НПД, защита прав Оператора и Арендатора.
          </p>
          <p className="mt-2">
            Основания (ст. 6 Федерального закона № 152-ФЗ «О персональных
            данных»): согласие субъекта; обработка, необходимая для исполнения
            договора, стороной которого является субъект; обработка, необходимая
            для осуществления прав и законных интересов Оператора при условии,
            что не нарушаются права субъекта.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">
            4. Передача третьим лицам и трансграничная передача
          </h2>
          <p className="mt-2">
            Данные не продаются. Могут обрабатываться с использованием сервисов
            связи и инфраструктуры, необходимых для работы сайта и связи по
            брони (в том числе Telegram, MAX, операторы связи, хостинг GitHub
            Pages). При использовании зарубежных сервисов возможна
            трансграничная передача; обращаясь через такие каналы, вы
            подтверждаете осведомлённость об этом.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">
            5. Cookies и веб-аналитика
          </h2>
          <p className="mt-2">
            При подключении Яндекс.Метрики на сайте могут использоваться файлы
            cookie и похожие технологии для статистики посещений. Отключить
            cookie можно в настройках браузера. Пока счётчик Метрики не
            подключён, дополнительные cookie аналитики сайтом не устанавливаются.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">
            6. Срок хранения
          </h2>
          <p className="mt-2">
            Данные для связи по брони хранятся до достижения целей обработки или
            отзыва согласия, если иное не требуется законом. Данные и
            фотокопии документов, полученные при заключении договора, хранятся в
            срок, необходимый для исполнения договора, возврата имущества и
            защиты прав сторон (как правило, не дольше, чем требуется по закону
            и обычаям делового оборота).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">
            7. Права субъекта персональных данных
          </h2>
          <p className="mt-2">
            Вы вправе запросить сведения об обработке, потребовать уточнения,
            блокирования или удаления данных, отозвать согласие (если обработка
            основана на согласии), а также обратиться с жалобой в Роскомнадзор.
            Запросы направляйте на {SEO_CONFIG.email} или по телефону{" "}
            {SEO_CONFIG.phoneDisplay}.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-50">8. Безопасность</h2>
          <p className="mt-2">
            Оператор принимает организационные и технические меры, разумные для
            масштаба деятельности НПД, чтобы предотвратить несанкционированный
            доступ к персональным данным.
          </p>
        </section>

        <p>
          Полные условия проката:{" "}
          <Link href="/offer/" className="text-amber-400 hover:underline">
            договор-оферта
          </Link>
          .
        </p>
        <p className="text-zinc-500">
          Документ является шаблоном и не заменяет консультацию юриста по
          152-ФЗ.
        </p>
      </div>
    </article>
  );
}

import type { CatalogProduct } from "@/data/catalog";
import { DEFAULT_LOCALE, type Locale, type OtherLocale } from "@/i18n/locales";

type ProductLocalized = {
  title: string;
  description: string;
  categoryName: string;
  color: string;
};

/**
 * Каталог сейчас маленький (1 позиция), поэтому переводы карточек
 * держим отдельно от самих данных — так проще расширять на будущее.
 * Ключ верхнего уровня — slug товара, дальше — по локали.
 */
export const CATALOG_I18N: Record<string, Record<OtherLocale, ProductLocalized>> = {
  "jiekai-jk902-black-matt": {
    en: {
      title: "Full-face helmet JIEKAI JK902 (matte black)",
      description:
        "The modular JIEKAI JK902 — good for a driving test, riding with a passenger, or a short trip. ABS shell, flip-up visor and built-in sun visor. Sizes M and L — try it on at the meeting before paying.",
      categoryName: "Motorcycle helmets",
      color: "Matte black",
    },
    fr: {
      title: "Casque intégral JIEKAI JK902 (noir mat)",
      description:
        "Le JIEKAI JK902 modulable — pratique pour l'examen de conduite, une balade avec un passager ou une courte sortie. Coque ABS, visière relevable et pare-soleil intégré. Tailles M et L — essayez-le au rendez-vous avant de payer.",
      categoryName: "Casques de moto",
      color: "Noir mat",
    },
    uz: {
      title: "Yopiq shlem JIEKAI JK902 (mat qora)",
      description:
        "Modulli JIEKAI JK902 — GIBDD imtihoni, yo‘lovchi bilan safar yoki qisqa chiqish uchun qulay. ABS korpus, ko‘tariladigan vizor va quyoshdan himoya ko‘zoynagi. M va L o‘lchamlar — uchrashuvda to‘lovdan oldin kiyib ko‘ring.",
      categoryName: "Mototashlar",
      color: "Mat qora",
    },
    hy: {
      title: "Փակ սաղավարտ JIEKAI JK902 (մատ սև)",
      description:
        "Մոդուլային JIEKAI JK902-ը հարմար է ՃՈԱՎ քննության, ուղևորի հետ ուղևորության կամ կարճ երթևեկի համար։ ABS կորպուս, բարձրացվող վիզոր և արևապաշտպան ակնոց։ M և L չափսեր՝ փորձեք հանդիպման ժամանակ մինչև վճարելը։",
      categoryName: "Մոտոսաղավարտներ",
      color: "Մատ սև",
    },
    az: {
      title: "Qapalı dəbilqə JIEKAI JK902 (mat qara)",
      description:
        "Modul JIEKAI JK902 — DYP imtahanı, sərnişinlə səyahət və ya qısa gediş üçün əlverişlidir. ABS gövdə, qaldırılan vizor və günəşdən qoruyucu eynək. M və L ölçüləri — görüşdə ödənişdən əvvəl taxıb yoxlayın.",
      categoryName: "Motosiklet dəbilqələri",
      color: "Mat qara",
    },
    tg: {
      title: "Кулоҳи пӯшида JIEKAI JK902 (сиёҳи мат)",
      description:
        "JIEKAI JK902-и модулӣ — барои имтиҳони ГИБДД, сафар бо роҳкаш ё сафари кӯтоҳ мувофиқ аст. Корпуси ABS, визори бардошташаванда ва айнаки офтобӣ. Андозаҳои M ва L — ҳангоми вохӯрӣ пеш аз пардохт пӯшед.",
      categoryName: "Кулоҳҳои мотор",
      color: "Сиёҳи мат",
    },
    ky: {
      title: "Жабык шлем JIEKAI JK902 (мат кара)",
      description:
        "Модулдук JIEKAI JK902 — ГАИ экзамени, жүргүнчү менен сапар же кыска сапар үчүн ыңгайлуу. ABS корпус, көтөрүлүүчү визор жана күндөн коргоочу көз айнек. M жана L өлчөмдөрү — жолугушууда төлөөдөн мурун кийип көрүңүз.",
      categoryName: "Мото шлемдер",
      color: "Мат кара",
    },
    zh: {
      title: "全盔 JIEKAI JK902（哑光黑）",
      description:
        "模块化头盔 JIEKAI JK902——适合驾照考试、载客出行或短途骑行。ABS 外壳，可掀式镜片，内置遮阳镜。提供 M 和 L 码——见面时付款前可先试戴。",
      categoryName: "摩托车头盔",
      color: "哑光黑",
    },
  },
};

/** Возвращает товар с переведёнными полями для не-ru локали (если перевод есть). */
export function localizeProduct(product: CatalogProduct, locale: Locale): CatalogProduct {
  if (locale === DEFAULT_LOCALE) return product;
  const override = CATALOG_I18N[product.slug]?.[locale as OtherLocale];
  if (!override) return product;
  return { ...product, ...override };
}

import type { Dict } from "@/i18n/types";

export const az: Dict = {
  meta: {
    defaultTitle: "{city} icarə — {price} ₽/gündən",
    defaultDescription:
      "{cityIn} icarə xidməti (Nikolskoye): motosiklet dəbilqələri, tezliklə digər əşyalar. Hazırda — JIEKAI JK902, {price} ₽/gündən. Telefon, Telegram və ya MAX ilə sifariş. Ödəniş və girov görüşdə.",
    ogAlt: "Beri36 — Voronejdə icarə",
    productTitle: (brand, model, sizePart, city, price) => `${brand} ${model}${sizePart} dəbilqəsinin icarəsi ${city} — ${price} ₽/gündən`,
    productDescription: (brand, model, city, price, sizesText) => `${brand} ${model} dəbilqəsini ${city} icarəyə götürün: ${price} ₽/gün, geri qaytarılan girov, telefon, Telegram və ya MAX ilə bron. ${sizesText}`.trim(),
    productNotFound: "Məhsul tapılmadı",
  },
  nav: {
    ariaMain: "Əsas naviqasiya",
    ariaMobile: "Mobil menyu",
    howItWorks: "Necə işləyir",
    catalog: "Kataloq",
    faq: "Tez-tez verilən suallar",
    openMenu: "Menyunu aç",
    closeMenu: "Menyunu bağla",
    call: "Zəng et",
    telegramWrite: "Telegramda yaz",
  },
  hero: {
    title: (city) => `${city} icarəyə götür`,
    subtitle: "Motosiklet dəbilqələri — artıq kataloqda. Alətlər və digərləri — tezliklə. Qiymət",
    fromPrice: (price) => `${price} ₽/gündən. Tarixləri saytda hesablayın, zəng və ya messencerlə sifariş edin.`,
    call: "Zəng et",
    telegram: "Telegram",
    max: "MAX",
  },
  howItWorks: {
    title: "Necə işləyir",
    subtitle: "Üç addım — onlayn ödəniş və girovla bağlı sürprizlər olmadan.",
    step1Title: "Zəng və ya mesaj",
    step1Text:
      "Kataloqdan məhsul seçin, saytda tarixləri hesablayın. Zəng edin və ya Telegram / MAX-da yazın — bron təsdiqlənəcək.",
    step2Title: "Görüş",
    step2Text: (locality, landmark, street) =>
      `${locality} mikrorayonunda (${landmark} yaxınlığında), ${street} ünvanında görüşürük: əşyaya baxırsınız, lazım gələrsə taxıb yoxlayırsınız. Müqavilə üçün pasport və ya sürücülük vəsiqəsi lazımdır.`,
    step3Title: "Ödəniş və girov",
    step3Text: (market, deposit) =>
      `Əşyanın tam bazar dəyərini təhvil verirsiniz (hazırkı dəbilqə üçün — ${market} ₽). Qaydasında qaytarıldıqda girov geri qaytarılır (məsələn, 1 günlük icarə üçün ${deposit} ₽).`,
  },
  location: {
    label: "Ünvan",
    title: "Biz haradayıq",
    description: (city, street) =>
      `Maşmetə yaxın. Ünvan: ${city}, ${street}. Dəqiq görüş nöqtəsi və vaxtı bron zamanı razılaşdırılır.`,
    openMaps: "Yandex Xəritələrdə aç →",
    openNavi: "Yandex Navigatorda aç →",
  },
  catalog: {
    title: "Kataloq",
    subtitle: "Hazırda motosiklet dəbilqəsi; kataloq genişlənəcək.",
    noPhoto: "Foto yoxdur",
    from: "başlayaraq",
    perDay: "₽/gün",
    more: "Ətraflı →",
  },
  whenNeeded: {
    title: "İcarə nə vaxt əlverişlidir",
    subtitle: "Bir gün və ya daha çox — birdəfəlik almadan.",
    items: [
      { title: "DYP imtahanı", text: "İmtahan günü üçün qapalı dəbilqə — almaqdan asandır." },
      { title: "Sərnişin üçün dəbilqə", text: "Səyahət üçün ikinci dəbilqə — bir günlüyə götürün, ikiniz də qorunmuş olun." },
      { title: "İlk kilometrlər", text: "Öz dəbilqənizi seçənədək — icarədə ölçünü anlamaq üçün əlverişlidir." },
      { title: "Öz dəbilqəniz əlçatan deyil", text: "Unudulub, təmirdə və ya təmizlənir — səyahəti ləğv etməyin." },
    ],
  },
  faq: {
    title: "Tez-tez verilən suallar",
    subtitle: "Ölçü, girov, görüş — zəngdən əvvəl qısaca.",
    moreLink: "Bütün suallar →",
    pageTitle: "Tez-tez verilən suallar",
    pageIntro: (city) => `${city} icarəsi üçün ölçü, girov, görüş və bron haqqında cavablar.`,
    backHome: "← Ana səhifəyə",
    items: [
      {
        question: "Dəbilqə ölçüsünü necə seçmək olar?",
        answer:
          "Baş ölçünüzü qaşlar və qulaqların üstündən sentimetrlə ölçün. Saytdakı ölçü cədvəli ilə tutuşdurun. İki ölçü arasında olduqda adətən kiçiyi götürülür — astar zamanla bir az genişlənir. Görüşdə ödənişdən əvvəl taxıb yoxlamaq mümkündür.",
      },
      {
        question: "Görüş harada keçirilir?",
        answer:
          "Biz Nikolskoye mikrorayonundayıq (Maşmetə yaxın), ünvan: Voronej, Ani Maksimovoy küçəsi. Dəqiq nöqtə və vaxt telefon, Telegram və ya MAX ilə razılaşdırılır. Ana səhifədə xəritə var.",
      },
      {
        question: "Təhvil alarkən nə qədər ödəmək lazımdır, girov necə işləyir?",
        answer:
          "Təhvil alarkən həmişə dəbilqənin tam bazar dəyərini təhvil verirsiniz. Bu məbləğdən seçilmiş günlər üçün icarə haqqı çıxılır, qalanı — geri qaytarılan girovdur. Dəbilqə qaydasında qaytarıldıqda girov dərhal geri qaytarılır.",
      },
      {
        question: "Sənədlər lazımdırmı?",
        answer:
          "Bəli. İcarə müqaviləsi üçün görüşdə pasport və ya sürücülük vəsiqəsi lazımdır (yerində foto/surət də olar). İcarəyə verənin adı və rekvizitləri təhvil aktında göstərilir, saytda dərc edilmir. İcarəçi — 18 yaşdan yuxarı.",
      },
      {
        question: "Saytda onlayn ödəniş və ya sifariş forması varmı?",
        answer:
          "Onlayn ödəniş və sifariş forması yoxdur. Bron yalnız +7 (950) 767-85-75 nömrəsinə zənglə, saytdakı Telegram düyməsi ilə və ya MAX 8 (919) 183-14-07 (Yevgeni) ilə. İcarə və girov ödənişi şəxsən görüşdə, nağd və ya razılaşdırılmış köçürmə ilə.",
      },
      {
        question: "Gecikdirsəm nə olacaq?",
        answer:
          "Gecikmiş qaytarma avtomatik olaraq seçilmiş dəbilqənin tarifi ilə növbəti günün icarəsini əlavə edir. Uzatmanı əvvəlcədən razılaşdırın — bu hər kəs üçün asandır.",
      },
    ],
    sizeChartTitle: "Ölçü cədvəli",
    sizeChartNote: "Baş ölçünüzü qaşlar və qulaqların üstündən sentimetrlə ölçün.",
  },
  finalCta: {
    title: "İcarəyə götürməyə hazırsınız?",
    subtitle: "Məhsul səhifəsində tarixləri hesablayın — Telegramda yazmaq və ya zəng etmək daha rahatdır.",
    call: "Zəng et",
    telegram: "Telegram",
    toBooking: "Bron etməyə keç",
  },
  moreProjects: {
    eyebrow: "Voronejdə də",
    title: "Digər layihələrimiz",
    subtitle: "Şəhərdəki yerli xidmətlər — eyni əlaqə, fərqli ehtiyaclar.",
    tag: "Layihəmiz",
  },
  footer: {
    offer: "Şərtlər",
    privacy: "Şəxsi məlumatlar",
    noVat: "ƏDV-siz",
  },
  mobileBar: {
    call: "Zəng et",
    telegram: "Telegram",
    dates: "Tarixlər",
  },
  product: {
    breadcrumbHome: "Ana səhifə",
    breadcrumbCatalog: "Kataloq",
    atPickup: (price) => `Görüşdə — ${price} ₽`,
    atPickupNote:
      "Bundan seçilmiş günlər üçün icarə, qalanı — girov. Dəbilqə qaydasında qaytarıldıqda girov geri qaytarılır.",
    rentLine: (price) => `İcarə: ${price} ₽ / gün`,
    marketLine: (price) => `Bazar dəyəri (təminat): ${price} ₽`,
    depositNote: (price) => `Görüşdə həmişə ${price} ₽ təhvil verirsiniz — fərq girov kimi geri qaytarılır`,
    bookingLine: "Bron telefon, Telegram və ya MAX ilə",
    faqLink: "Suallar: ölçü, girov, görüş →",
    bookTitle: "Bron et",
    noOnlineForm: "Saytda sifariş forması yoxdur. Bron — zənglə",
    sizeLabel: "Ölçü",
    inStock: (list) => `Mövcuddur: ${list}`,
    quickTerm: "Sürətli müddət",
    day1: "1 gün",
    weekend: "Həftə sonu",
    days3: "3 gün",
    startLabel: "İcarənin başlanğıcı",
    endLabel: "Qaytarma tarixi",
    rentalCost: "İcarə dəyəri",
    deposit: "Geri qaytarılan girov",
    totalAtPickup: "Təhvil alarkən cəmi",
    minTermNote: (name) => `Minimum müddət — 1 gün. Kalkulyator təxminidir; bronu ${name} telefon və ya messencerlə təsdiqləyir.`,
    callBtn: (phone) => `Zəng et ${phone}`,
    telegramBtn: "Telegramda yaz",
    maxBtn: (phone) => `MAX ${phone}`,
    terms: "Şərtlər:",
    offer: "ictimai oferta",
    privacy: "şəxsi məlumatlar",
  },
  legal: {
    noticeTitle: "Bu, rahatlıq üçün verilmiş tərcümədir",
    noticeBody: (contactName, phone) =>
      `Bu sənədin hüquqi qüvvəyə malik versiyası aşağıdakı rusca əsl mətndir. Tərcümədə hər hansı qeyri-aydınlıq olarsa, icarəyə götürmədən əvvəl ${contactName} ilə ${phone} nömrəsi ilə əlaqə saxlayın.`,
    offerPageTitle: "İcarə üçün ictimai oferta",
    privacyPageTitle: "Şəxsi məlumatların işlənməsi siyasəti",
  },
  notFound: {
    title: "Səhifə tapılmadı",
    text: "Belə səhifə yoxdur — keçid köhnəlmiş ola bilər.",
    backHome: "← Ana səhifəyə",
  },
};

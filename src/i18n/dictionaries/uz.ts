import type { Dict } from "@/i18n/types";

export const uz: Dict = {
  meta: {
    defaultTitle: "{city} ijara — {price} ₽/kundan",
    defaultDescription:
      "{cityIn} ijara xizmati (Nikolskoye): mototashlar, tez orada boshqa buyumlar. Hozircha — JIEKAI JK902, {price} ₽/kundan. Telefon, Telegram yoki MAX orqali bron qiling. To‘lov va garov uchrashuvda.",
    ogAlt: "Beri36 — Voronejda ijara",
    productTitle: (brand, model, sizePart, city, price) => `${brand} ${model}${sizePart} shlemini ${city} ijaraga olish — ${price} ₽/kundan`,
    productDescription: (brand, model, city, price, sizesText) => `${brand} ${model} shlemini ${city} ijaraga oling: ${price} ₽/kun, qaytariladigan garov, telefon, Telegram yoki MAX orqali bron. ${sizesText}`.trim(),
    productNotFound: "Mahsulot topilmadi",
  },
  nav: {
    ariaMain: "Asosiy navigatsiya",
    ariaMobile: "Mobil menyu",
    howItWorks: "Bu qanday ishlaydi",
    catalog: "Katalog",
    faq: "Savol-javob",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    call: "Qo‘ng‘iroq qilish",
    telegramWrite: "Telegramga yozish",
  },
  hero: {
    title: (city) => `${city} ijaraga oling`,
    subtitle:
      "Mototashlar — hozir katalogda. Asboblar va boshqalar — kengaytirilmoqda. Narxi",
    fromPrice: (price) => `${price} ₽/kundan boshlanadi. Sanalarni saytda hisoblang, qo‘ng‘iroq yoki messenjer orqali bron qiling.`,
    call: "Qo‘ng‘iroq qilish",
    telegram: "Telegram",
    max: "MAX",
  },
  howItWorks: {
    title: "Bu qanday ishlaydi",
    subtitle: "Uch qadam — onlayn to‘lovsiz va garov bo‘yicha kutilmagan holatlarsiz.",
    step1Title: "Qo‘ng‘iroq yoki xabar",
    step1Text:
      "Katalogdan mahsulotni tanlang, saytda sanalarni hisoblang. Qo‘ng‘iroq qiling yoki Telegram / MAX orqali yozing — bronni tasdiqlaymiz.",
    step2Title: "Uchrashuv",
    step2Text: (locality, landmark, street) =>
      `${locality} mikrorayonida (${landmark} yaqinida), ${street} manzilida uchrashamiz: buyumni ko‘rib chiqasiz, kerak bo‘lsa kiyib ko‘rasiz. Shartnoma uchun pasport yoki haydovchilik guvohnomasi kerak.`,
    step3Title: "To‘lov va garov",
    step3Text: (market, deposit) =>
      `Buyumning to‘liq bozor qiymatini topshirasiz (hozirgi shlem uchun — ${market} ₽). Yaxshi holatda qaytarilganda garov qaytariladi (masalan, 1 kunlik ijara uchun ${deposit} ₽).`,
  },
  location: {
    label: "Manzil",
    title: "Biz qayerdamiz",
    description: (city, street) =>
      `Mashmet yaqinida. Manzil: ${city}, ${street}. Aniq uchrashuv nuqtasi va vaqti bron qilishda kelishiladi.`,
    openMaps: "Yandex Xaritada ochish →",
    openNavi: "Yandex Navigatorda ochish →",
  },
  catalog: {
    title: "Katalog",
    subtitle: "Hozircha mototash; katalog kengaytiriladi.",
    noPhoto: "Rasm yo‘q",
    from: "dan",
    perDay: "₽/kun",
    more: "Batafsil →",
  },
  whenNeeded: {
    title: "Ijara qachon qulay",
    subtitle: "Bir kun yoki undan ko‘p — bir martalik xarid qilmasdan.",
    items: [
      {
        title: "GIBDD imtihoni",
        text: "Imtihon kuni uchun yopiq shlem — sotib olishdan osonroq.",
      },
      {
        title: "Yo‘lovchi uchun shlem",
        text: "Safar uchun ikkinchi shlem — bir kunga oling, ikkalangiz ham himoyada.",
      },
      {
        title: "Birinchi kilometrlar",
        text: "O‘zingizniki tanlanayotganda — o‘lchamni ijarada bilib olish qulay.",
      },
      {
        title: "O‘zingiznikini ishlata olmaysiz",
        text: "Unutildi, ta’mirda yoki tozalanmoqda — safarni bekor qilmang.",
      },
    ],
  },
  faq: {
    title: "Tez-tez so‘raladigan savollar",
    subtitle: "O‘lcham, garov, uchrashuv — qo‘ng‘iroqdan oldin qisqacha.",
    moreLink: "Barcha savollar →",
    pageTitle: "Tez-tez so‘raladigan savollar",
    pageIntro: (city) => `${city} ijarasi bo‘yicha o‘lcham, garov, uchrashuv va bron haqida javoblar.`,
    backHome: "← Bosh sahifaga",
    items: [
      {
        question: "Shlem o‘lchamini qanday tanlash kerak?",
        answer:
          "Bosh aylanasini qoshlar va quloqlar ustidan santimetr bilan o‘lchang. Saytdagi o‘lcham jadvali bilan solishtiring. Ikki o‘lcham orasida bo‘lsangiz, odatda kichikrog‘i olinadi — ichki qoplama vaqt o‘tishi bilan biroz cho‘zilib turadi. Uchrashuvda to‘lovdan oldin kiyib ko‘rish mumkin.",
      },
      {
        question: "Uchrashuv qayerda bo‘ladi?",
        answer:
          "Biz Nikolskoye mikrorayonida (Mashmet yaqinida), manzil: Voronej, Ani Maksimovoy ko‘chasi. Aniq nuqta va vaqtni telefon, Telegram yoki MAX orqali kelishamiz. Bosh sahifada xarita bor.",
      },
      {
        question: "Olishda qancha to‘lash kerak va garov qanday ishlaydi?",
        answer:
          "Berishda har doim shlemning to‘liq bozor qiymatini topshirasiz. Ushbu summadan tanlangan kunlar uchun ijara narxi ayiriladi, qolgani — qaytariladigan garov. Shlem yaxshi holatda qaytarilganda garov darhol qaytariladi.",
      },
      {
        question: "Hujjatlar kerakmi?",
        answer:
          "Ha. Ijara shartnomasi uchun uchrashuvda pasport yoki haydovchilik guvohnomasi kerak (joyida surat/nusxa ham bo‘ladi). Ijaraga beruvchining F.I.O. va rekvizitlari topshirish aktida ko‘rsatiladi, saytda e’lon qilinmaydi. Ijarachi — 18 yoshdan.",
      },
      {
        question: "Saytda onlayn to‘lov yoki ariza shakli bormi?",
        answer:
          "Onlayn to‘lov va ariza shakli yo‘q. Bron faqat +7 (950) 767-85-75 raqamiga qo‘ng‘iroq, saytdagi Telegram tugmasi yoki MAX 8 (919) 183-14-07 (Evgeniy) orqali. Ijara va garov to‘lovi shaxsan uchrashuvda naqd yoki kelishilgan holda o‘tkazma orqali.",
      },
      {
        question: "Qaytarishda kechiksam nima bo‘ladi?",
        answer:
          "Kech qaytarish avtomatik ravishda tanlangan shlem tarifi bo‘yicha yana bir kunlik ijarani qo‘shadi. Muddatni uzaytirishni oldindan kelishing — bu hammaga qulay.",
      },
    ],
    sizeChartTitle: "O‘lchamlar jadvali",
    sizeChartNote: "Bosh aylanasini qoshlar va quloqlar ustidan santimetr bilan o‘lchang.",
  },
  finalCta: {
    title: "Ijaraga olishga tayyormisiz?",
    subtitle: "Mahsulot sahifasida sanalarni hisoblang — Telegramga yozish yoki qo‘ng‘iroq qilish qulayroq.",
    call: "Qo‘ng‘iroq qilish",
    telegram: "Telegram",
    toBooking: "Bronga o‘tish",
  },
  moreProjects: {
    eyebrow: "Voronejda yana",
    title: "Bizning boshqa loyihalarimiz",
    subtitle: "Shahardagi mahalliy xizmatlar — bir xil aloqa, boshqa vazifalar.",
    tag: "Bizning loyiha",
  },
  footer: {
    offer: "Oferta",
    privacy: "Shaxsiy ma’lumotlar",
    noVat: "QQSsiz",
  },
  mobileBar: {
    call: "Qo‘ng‘iroq",
    telegram: "Telegram",
    dates: "Sanalar",
  },
  product: {
    breadcrumbHome: "Bosh sahifa",
    breadcrumbCatalog: "Katalog",
    atPickup: (price) => `Uchrashuvda — ${price} ₽`,
    atPickupNote:
      "Shundan tanlangan kunlar uchun ijara, qolgani — garov. Shlem yaxshi holatda qaytarilganda garov qaytariladi.",
    rentLine: (price) => `Ijara: ${price} ₽ / kun`,
    marketLine: (price) => `Bozor qiymati (garov asosi): ${price} ₽`,
    depositNote: (price) => `Uchrashuvda har doim ${price} ₽ topshirasiz — farqi garov sifatida qaytariladi`,
    bookingLine: "Bron telefon, Telegram yoki MAX orqali",
    faqLink: "Savol-javob: o‘lcham, garov, uchrashuv →",
    bookTitle: "Bron qilish",
    noOnlineForm: "Saytda ariza shakli yo‘q. Bron — qo‘ng‘iroq orqali",
    sizeLabel: "O‘lcham",
    inStock: (list) => `Mavjud: ${list}`,
    quickTerm: "Tezkor muddat",
    day1: "1 kun",
    weekend: "Dam olish kunlari",
    days3: "3 kun",
    startLabel: "Ijara boshlanishi",
    endLabel: "Qaytarish sanasi",
    rentalCost: "Ijara narxi",
    deposit: "Qaytariladigan garov",
    totalAtPickup: "Olishda jami",
    minTermNote: (name) => `Minimal muddat — 1 kun. Kalkulyator taxminiy; bronni ${name} telefon yoki messenjerda tasdiqlaydi.`,
    callBtn: (phone) => `Qo‘ng‘iroq: ${phone}`,
    telegramBtn: "Telegramga yozish",
    maxBtn: (phone) => `MAX ${phone}`,
    terms: "Shartlar:",
    offer: "oferta",
    privacy: "shaxsiy ma’lumotlar",
  },
  legal: {
    noticeTitle: "Bu tarjima qulaylik uchun berilgan",
    noticeBody: (contactName, phone) =>
      `Ushbu hujjatning yuridik kuchga ega versiyasi — quyidagi rus tilidagi asl nusxa. Tarjimada noaniqlik bo‘lsa, ijaraga olishdan oldin ${contactName} bilan ${phone} orqali bog‘laning.`,
    offerPageTitle: "Ijara ommaviy ofertasi",
    privacyPageTitle: "Shaxsiy ma’lumotlarni qayta ishlash siyosati",
  },
  notFound: {
    title: "Sahifa topilmadi",
    text: "Bunday sahifa mavjud emas — havola eskirgan bo‘lishi mumkin.",
    backHome: "← Bosh sahifaga",
  },
};

export type FaqItem = { question: string; answer: string };

export type Dict = {
  /** Мета по умолчанию (главная) и общие OG-строки */
  meta: {
    defaultTitle: string;
    defaultDescription: string;
    ogAlt: string;
    productTitle: (brand: string, model: string, sizePart: string, city: string, price: string) => string;
    productDescription: (brand: string, model: string, city: string, price: string, sizesText: string) => string;
    productNotFound: string;
  };
  nav: {
    ariaMain: string;
    ariaMobile: string;
    howItWorks: string;
    catalog: string;
    faq: string;
    openMenu: string;
    closeMenu: string;
    call: string;
    telegramWrite: string;
  };
  hero: {
    title: (city: string) => string;
    subtitle: string;
    fromPrice: (price: string) => string;
    call: string;
    telegram: string;
    max: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Text: string;
    step2Title: string;
    step2Text: (locality: string, landmark: string, street: string) => string;
    step3Title: string;
    step3Text: (market: string, deposit: string) => string;
  };
  location: {
    label: string;
    title: string;
    description: (city: string, street: string) => string;
    openMaps: string;
    openNavi: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    noPhoto: string;
    from: string;
    perDay: string;
    more: string;
  };
  whenNeeded: {
    title: string;
    subtitle: string;
    items: [
      { title: string; text: string },
      { title: string; text: string },
      { title: string; text: string },
      { title: string; text: string },
    ];
  };
  faq: {
    title: string;
    subtitle: string;
    moreLink: string;
    pageTitle: string;
    pageIntro: (city: string) => string;
    backHome: string;
    items: FaqItem[];
    sizeChartTitle: string;
    sizeChartNote: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    call: string;
    telegram: string;
    toBooking: string;
  };
  moreProjects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tag: string;
  };
  footer: {
    offer: string;
    privacy: string;
    noVat: string;
  };
  mobileBar: {
    call: string;
    telegram: string;
    dates: string;
  };
  product: {
    breadcrumbHome: string;
    breadcrumbCatalog: string;
    atPickup: (price: string) => string;
    atPickupNote: string;
    rentLine: (price: string) => string;
    marketLine: (price: string) => string;
    depositNote: (price: string) => string;
    bookingLine: string;
    faqLink: string;
    bookTitle: string;
    noOnlineForm: string;
    sizeLabel: string;
    inStock: (list: string) => string;
    quickTerm: string;
    day1: string;
    weekend: string;
    days3: string;
    startLabel: string;
    endLabel: string;
    rentalCost: string;
    deposit: string;
    totalAtPickup: string;
    minTermNote: (name: string) => string;
    callBtn: (phone: string) => string;
    telegramBtn: string;
    maxBtn: (phone: string) => string;
    terms: string;
    offer: string;
    privacy: string;
  };
  legal: {
    /** Баннер над юридическим текстом на неродных языках */
    noticeTitle: string;
    noticeBody: (contactName: string, phone: string) => string;
    offerPageTitle: string;
    privacyPageTitle: string;
  };
  notFound: {
    title: string;
    text: string;
    backHome: string;
  };
};

import type { Dict } from "@/i18n/types";

export const en: Dict = {
  meta: {
    defaultTitle: "rentals in {city} from {price} ₽/day",
    defaultDescription:
      "Rental service {cityIn} (Nikolskoye): motorcycle helmets, more coming soon. Currently — JIEKAI JK902 from {price} ₽/day. Book by phone, Telegram or MAX. Payment and deposit at pickup.",
    ogAlt: "Beri36 — rentals in Voronezh",
    productTitle: (brand, model, sizePart, city, price) => `Rent a ${brand} ${model} helmet${sizePart} ${city} — from ${price} ₽/day`,
    productDescription: (brand, model, city, price, sizesText) => `Rent a ${brand} ${model} helmet ${city}: ${price} ₽/day, refundable deposit, book by phone, Telegram or MAX. ${sizesText}`.trim(),
    productNotFound: "Product not found",
  },
  nav: {
    ariaMain: "Main navigation",
    ariaMobile: "Mobile menu",
    howItWorks: "How it works",
    catalog: "Catalog",
    faq: "FAQ",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    call: "Call",
    telegramWrite: "Message on Telegram",
  },
  hero: {
    title: (city) => `Rent it ${city}`,
    subtitle:
      "Motorcycle helmets — available now. Tools and more are coming as the catalog grows. From",
    fromPrice: (price) => `${price} ₽/day. Check dates on the site, book by call or messenger.`,
    call: "Call",
    telegram: "Telegram",
    max: "MAX",
  },
  howItWorks: {
    title: "How it works",
    subtitle: "Three steps — no online payment, no deposit surprises.",
    step1Title: "Call or message",
    step1Text:
      "Pick an item from the catalog and check the dates on the site. Call or message us on Telegram / MAX — we'll confirm the booking.",
    step2Title: "Meet in person",
    step2Text: (locality, landmark, street) =>
      `We meet in the ${locality} area (near ${landmark}), ${street}: you check the item and try it on if needed. Bring a passport or driver's license for the agreement.`,
    step3Title: "Payment and deposit",
    step3Text: (market, deposit) =>
      `You hand over the full market value of the item (currently ${market} ₽ for the helmet). On return in good condition, we refund the deposit (e.g. ${deposit} ₽ for a 1-day rental).`,
  },
  location: {
    label: "Location",
    title: "Where we are",
    description: (city, street) =>
      `near Mashmet. Address: ${city}, ${street}. We agree on the exact meeting point and time when you book.`,
    openMaps: "Open in Yandex Maps →",
    openNavi: "Open in Yandex Navigator →",
  },
  catalog: {
    title: "Catalog",
    subtitle: "Currently a motorcycle helmet; the catalog will grow.",
    noPhoto: "No photo",
    from: "from",
    perDay: "₽/day",
    more: "Details →",
  },
  whenNeeded: {
    title: "When renting makes sense",
    subtitle: "A day or more — no need to buy something you'll use once.",
    items: [
      {
        title: "Driving test",
        text: "A closed-face helmet for exam day — easier than buying one.",
      },
      {
        title: "A helmet for a passenger",
        text: "A second helmet for a ride — rent it for a day and both riders are covered.",
      },
      {
        title: "First few rides",
        text: "While you're choosing your own — a good way to check what size fits.",
      },
      {
        title: "Yours isn't available",
        text: "Forgot it, it's being repaired or cleaned — no need to cancel the ride.",
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    subtitle: "Sizing, deposit, meeting point — a quick read before you call.",
    moreLink: "All questions →",
    pageTitle: "Frequently asked questions",
    pageIntro: (city) =>
      `Answers about sizing, deposit, meeting point and booking a rental ${city}.`,
    backHome: "← Back to home",
    items: [
      {
        question: "How do I choose a helmet size?",
        answer:
          "Measure your head with a tape above the eyebrows and ears, then check it against the size chart on the site. If you're between sizes, the smaller one usually works better — the lining loosens up slightly over time. You can try it on before paying at the meeting.",
      },
      {
        question: "Where do we meet?",
        answer:
          "We're in the Nikolskoye area (near Mashmet), address: Voronezh, Ani Maksimovoy St. We agree on the exact point and time by phone, Telegram or MAX. There's a map on the homepage.",
      },
      {
        question: "How much do I pay at pickup, and how does the deposit work?",
        answer:
          "At pickup you always hand over the full market value of the helmet. The rental cost for the chosen days is deducted from that amount, and the rest is a refundable deposit. The deposit is returned right away once the helmet is returned in good condition.",
      },
      {
        question: "Do I need any documents?",
        answer:
          "Yes. For the rental agreement you'll need a passport or driver's license at the meeting (a photo/copy on the spot works). The lessor's full name and details are provided in the handover act, not published on the site. Renters must be 18+.",
      },
      {
        question: "Is there online payment or a booking form on the site?",
        answer:
          "No online payment and no booking form. Booking is only by call at +7 (950) 767-85-75, via the Telegram button on the site, or MAX 8 (919) 183-14-07 (Evgeniy). Payment for the rental and deposit happens in person, in cash or by transfer as agreed.",
      },
      {
        question: "What if I return it late?",
        answer:
          "A late return automatically adds another day's rental at the chosen helmet's rate. Agree on an extension in advance — it's simpler for everyone.",
      },
    ],
    sizeChartTitle: "Size chart",
    sizeChartNote: "Measure your head with a tape above the eyebrows and ears.",
  },
  finalCta: {
    title: "Ready to rent?",
    subtitle: "Check the dates on the product page — easiest to message on Telegram or call.",
    call: "Call",
    telegram: "Telegram",
    toBooking: "Go to booking",
  },
  moreProjects: {
    eyebrow: "Also in Voronezh",
    title: "Our other projects",
    subtitle: "Local services around the city — same contact, different needs.",
    tag: "Our project",
  },
  footer: {
    offer: "Terms",
    privacy: "Privacy",
    noVat: "VAT-free",
  },
  mobileBar: {
    call: "Call",
    telegram: "Telegram",
    dates: "Dates",
  },
  product: {
    breadcrumbHome: "Home",
    breadcrumbCatalog: "Catalog",
    atPickup: (price) => `At pickup — ${price} ₽`,
    atPickupNote:
      "This covers the rental for your chosen days, with the rest held as a deposit. The deposit is refunded when the helmet is returned in good condition.",
    rentLine: (price) => `Rental: ${price} ₽ / day`,
    marketLine: (price) => `Market value (security): ${price} ₽`,
    depositNote: (price) =>
      `At the meeting you always hand over ${price} ₽ — the difference is refunded as a deposit`,
    bookingLine: "Book by phone, Telegram or MAX",
    faqLink: "FAQ: sizing, deposit, meeting point →",
    bookTitle: "Book now",
    noOnlineForm: "There's no booking form on the site. Book by calling",
    sizeLabel: "Size",
    inStock: (list) => `In stock: ${list}`,
    quickTerm: "Quick term",
    day1: "1 day",
    weekend: "Weekend",
    days3: "3 days",
    startLabel: "Rental start",
    endLabel: "Return date",
    rentalCost: "Rental cost",
    deposit: "Refundable deposit",
    totalAtPickup: "Total at pickup",
    minTermNote: (name) =>
      `Minimum term is 1 day. The calculator is an estimate; ${name} confirms the booking by phone or messenger.`,
    callBtn: (phone) => `Call ${phone}`,
    telegramBtn: "Message on Telegram",
    maxBtn: (phone) => `MAX ${phone}`,
    terms: "Terms:",
    offer: "public offer",
    privacy: "privacy policy",
  },
  legal: {
    noticeTitle: "This is a translation for convenience",
    noticeBody: (contactName, phone) =>
      `The legally binding version of this document is the Russian original below. If anything in this translation is unclear, contact ${contactName} at ${phone} for clarification before renting.`,
    offerPageTitle: "Public rental offer",
    privacyPageTitle: "Privacy policy",
  },
  notFound: {
    title: "Page not found",
    text: "This page doesn't exist — the link may be outdated.",
    backHome: "← Back to home",
  },
};

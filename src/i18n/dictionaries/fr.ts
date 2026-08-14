import type { Dict } from "@/i18n/types";

export const fr: Dict = {
  meta: {
    defaultTitle: "location {city} à partir de {price} ₽/jour",
    defaultDescription:
      "Location {cityIn} (Nikolskoïe) : casques de moto, bientôt d'autres articles. Actuellement — JIEKAI JK902 à partir de {price} ₽/jour. Réservation par téléphone, Telegram ou MAX. Paiement et caution sur place.",
    ogAlt: "Beri36 — location à Voronej",
    productTitle: (brand, model, sizePart, city, price) => `Location de casque ${brand} ${model}${sizePart} ${city} — à partir de ${price} ₽/jour`,
    productDescription: (brand, model, city, price, sizesText) => `Louez un casque ${brand} ${model} ${city} : ${price} ₽/jour, caution remboursable, réservation par téléphone, Telegram ou MAX. ${sizesText}`.trim(),
    productNotFound: "Produit introuvable",
  },
  nav: {
    ariaMain: "Navigation principale",
    ariaMobile: "Menu mobile",
    howItWorks: "Comment ça marche",
    catalog: "Catalogue",
    faq: "FAQ",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    call: "Appeler",
    telegramWrite: "Écrire sur Telegram",
  },
  hero: {
    title: (city) => `Louez ${city}`,
    subtitle:
      "Casques de moto — disponibles dès maintenant. Outils et autres articles à venir. À partir de",
    fromPrice: (price) => `${price} ₽/jour. Dates sur le site, réservation par téléphone ou messagerie.`,
    call: "Appeler",
    telegram: "Telegram",
    max: "MAX",
  },
  howItWorks: {
    title: "Comment ça marche",
    subtitle: "Trois étapes — sans paiement en ligne ni surprise sur la caution.",
    step1Title: "Appel ou message",
    step1Text:
      "Choisissez un article dans le catalogue et vérifiez les dates sur le site. Appelez ou écrivez sur Telegram / MAX — nous confirmerons la réservation.",
    step2Title: "Rendez-vous",
    step2Text: (locality, landmark, street) =>
      `Nous nous retrouvons dans le quartier ${locality} (près de ${landmark}), ${street} : vous examinez l'article et l'essayez si besoin. Pièce d'identité ou permis de conduire nécessaire pour le contrat.`,
    step3Title: "Paiement et caution",
    step3Text: (market, deposit) =>
      `Vous remettez la valeur marchande complète de l'article (${market} ₽ pour le casque actuel). Au retour en bon état, la caution est remboursée (par exemple ${deposit} ₽ pour une location d'un jour).`,
  },
  location: {
    label: "Localisation",
    title: "Où nous trouver",
    description: (city, street) =>
      `près de Machmet. Adresse : ${city}, ${street}. Le point de rendez-vous exact et l'heure sont convenus lors de la réservation.`,
    openMaps: "Ouvrir dans Yandex Maps →",
    openNavi: "Ouvrir dans Yandex Navigator →",
  },
  catalog: {
    title: "Catalogue",
    subtitle: "Actuellement un casque de moto ; le catalogue va s'agrandir.",
    noPhoto: "Pas de photo",
    from: "à partir de",
    perDay: "₽/jour",
    more: "Détails →",
  },
  whenNeeded: {
    title: "Quand la location est utile",
    subtitle: "Un jour ou plus — pas besoin d'acheter pour un usage ponctuel.",
    items: [
      {
        title: "Examen de conduite",
        text: "Un casque intégral pour le jour de l'examen — plus simple que d'en acheter un.",
      },
      {
        title: "Casque pour un passager",
        text: "Un second casque pour une balade — loué pour un jour, les deux sont protégés.",
      },
      {
        title: "Premiers kilomètres",
        text: "En attendant de choisir le vôtre — pratique pour vérifier la taille.",
      },
      {
        title: "Le vôtre n'est pas disponible",
        text: "Oublié, en réparation ou en nettoyage — pas besoin d'annuler la sortie.",
      },
    ],
  },
  faq: {
    title: "Questions fréquentes",
    subtitle: "Taille, caution, rendez-vous — l'essentiel avant d'appeler.",
    moreLink: "Toutes les questions →",
    pageTitle: "Questions fréquentes",
    pageIntro: (city) =>
      `Réponses sur les tailles, la caution, le rendez-vous et la réservation d'une location ${city}.`,
    backHome: "← Retour à l'accueil",
    items: [
      {
        question: "Comment choisir la taille du casque ?",
        answer:
          "Mesurez votre tour de tête avec un mètre ruban au-dessus des sourcils et des oreilles, puis comparez avec le tableau des tailles sur le site. En cas d'hésitation entre deux tailles, prenez la plus petite — la doublure se détend légèrement avec le temps. Vous pouvez l'essayer avant de payer, lors du rendez-vous.",
      },
      {
        question: "Où se déroule le rendez-vous ?",
        answer:
          "Nous sommes dans le quartier Nikolskoïe (près de Machmet), adresse : Voronej, rue Ani Maksimovoï. Le point exact et l'heure sont convenus par téléphone, Telegram ou MAX. Une carte est disponible sur la page d'accueil.",
      },
      {
        question: "Combien payer à la remise, et comment fonctionne la caution ?",
        answer:
          "À la remise, vous versez toujours la valeur marchande complète du casque. Le coût de la location pour les jours choisis est déduit de cette somme, le reste constitue une caution remboursable. La caution est rendue immédiatement au retour du casque en bon état.",
      },
      {
        question: "Faut-il des documents ?",
        answer:
          "Oui. Pour le contrat de location, une pièce d'identité ou un permis de conduire est nécessaire au rendez-vous (une photo ou une copie sur place suffit). Le nom complet et les coordonnées du loueur sont indiqués dans l'acte de remise, non publiés sur le site. Les locataires doivent avoir 18 ans ou plus.",
      },
      {
        question: "Y a-t-il un paiement en ligne ou un formulaire de réservation ?",
        answer:
          "Non, ni paiement en ligne ni formulaire. La réservation se fait uniquement par téléphone au +7 (950) 767-85-75, via le bouton Telegram du site, ou MAX au 8 (919) 183-14-07 (Evgueni). Le paiement de la location et de la caution se fait en personne, en espèces ou par virement, selon accord.",
      },
      {
        question: "Que se passe-t-il en cas de retard au retour ?",
        answer:
          "Un retard entraîne automatiquement la facturation d'une journée supplémentaire au tarif du casque choisi. Convenez d'une prolongation à l'avance — c'est plus simple pour tout le monde.",
      },
    ],
    sizeChartTitle: "Tableau des tailles",
    sizeChartNote: "Mesurez votre tour de tête avec un mètre ruban au-dessus des sourcils et des oreilles.",
  },
  finalCta: {
    title: "Prêt à louer ?",
    subtitle:
      "Vérifiez les dates sur la fiche produit — le plus simple est d'écrire sur Telegram ou d'appeler.",
    call: "Appeler",
    telegram: "Telegram",
    toBooking: "Réserver",
  },
  moreProjects: {
    eyebrow: "Aussi à Voronej",
    title: "Nos autres projets",
    subtitle: "Des services locaux dans la ville — même contact, d'autres besoins.",
    tag: "Notre projet",
  },
  footer: {
    offer: "Conditions",
    privacy: "Confidentialité",
    noVat: "hors TVA",
  },
  mobileBar: {
    call: "Appeler",
    telegram: "Telegram",
    dates: "Dates",
  },
  product: {
    breadcrumbHome: "Accueil",
    breadcrumbCatalog: "Catalogue",
    atPickup: (price) => `À la remise — ${price} ₽`,
    atPickupNote:
      "Cette somme couvre la location pour les jours choisis, le reste étant retenu comme caution. La caution est remboursée au retour du casque en bon état.",
    rentLine: (price) => `Location : ${price} ₽ / jour`,
    marketLine: (price) => `Valeur marchande (garantie) : ${price} ₽`,
    depositNote: (price) =>
      `Au rendez-vous, vous remettez toujours ${price} ₽ — la différence est remboursée comme caution`,
    bookingLine: "Réservation par téléphone, Telegram ou MAX",
    faqLink: "FAQ : taille, caution, rendez-vous →",
    bookTitle: "Réserver",
    noOnlineForm: "Il n'y a pas de formulaire de réservation sur le site. Réservation par appel",
    sizeLabel: "Taille",
    inStock: (list) => `Disponible : ${list}`,
    quickTerm: "Durée rapide",
    day1: "1 jour",
    weekend: "Week-end",
    days3: "3 jours",
    startLabel: "Début de location",
    endLabel: "Date de retour",
    rentalCost: "Coût de la location",
    deposit: "Caution remboursable",
    totalAtPickup: "Total à la remise",
    minTermNote: (name) =>
      `Durée minimale : 1 jour. Le calculateur est indicatif ; ${name} confirme la réservation par téléphone ou messagerie.`,
    callBtn: (phone) => `Appeler ${phone}`,
    telegramBtn: "Écrire sur Telegram",
    maxBtn: (phone) => `MAX ${phone}`,
    terms: "Conditions :",
    offer: "offre publique",
    privacy: "confidentialité",
  },
  legal: {
    noticeTitle: "Traduction fournie pour votre confort",
    noticeBody: (contactName, phone) =>
      `La version juridiquement contraignante de ce document est l'original russe ci-dessous. En cas de doute sur cette traduction, contactez ${contactName} au ${phone} avant de louer.`,
    offerPageTitle: "Offre publique de location",
    privacyPageTitle: "Politique de confidentialité",
  },
  notFound: {
    title: "Page introuvable",
    text: "Cette page n'existe pas — le lien est peut-être obsolète.",
    backHome: "← Retour à l'accueil",
  },
};

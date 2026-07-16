import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SEO_CONFIG, yandexVerification } from "@/config/seo";
import { assetUrl, absoluteAssetUrl } from "@/lib/assets";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { YandexMetrika } from "@/components/YandexMetrika";
import "./globals.css";

/* Manrope с кириллицей — стабильно на Safari / iOS (Bebas без кириллицы давал «битые» заголовки) */
const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const display = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const ogImage = absoluteAssetUrl("/products/jk902-1.jpg");
const iconUrl = assetUrl("/icon.svg");
const manifestUrl = assetUrl("/manifest.webmanifest");

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: `%s · ${SEO_CONFIG.brandName}`,
  },
  description: SEO_CONFIG.defaultDescription,
  applicationName: SEO_CONFIG.brandName,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "аренда мотошлема Воронеж",
    "прокат шлема Воронеж",
    "аренда мотошлемов Воронеж",
    "взять шлем напрокат",
    "JIEKAI JK902",
    "мотоэкипировка напрокат",
    SEO_CONFIG.brandName,
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SEO_CONFIG.brandName,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    url: "/",
    images: [
      {
        url: ogImage,
        width: 1000,
        height: 1000,
        alt: "Мотошлем JIEKAI JK902 чёрный матовый — аренда в Воронеже",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [ogImage],
  },
  verification: yandexVerification
    ? { yandex: yandexVerification }
    : undefined,
  robots: { index: true, follow: true },
  manifest: manifestUrl,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SEO_CONFIG.brandName,
  },
  icons: {
    icon: [{ url: iconUrl, type: "image/svg+xml" }],
    apple: [{ url: iconUrl }],
  },
  formatDetection: {
    telephone: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${body.variable} ${display.variable} h-full`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <SiteHeader />
        <main className="flex-1 w-full min-w-0">{children}</main>
        <SiteFooter />
        <YandexMetrika />
      </body>
    </html>
  );
}

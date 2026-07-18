import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import {
  SEO_CONFIG,
  googleVerification,
  yandexVerification,
} from "@/config/seo";
import { assetUrl, absoluteAssetUrl } from "@/lib/assets";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { YandexMetrika } from "@/components/YandexMetrika";
import "./globals.css";

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const ogImage = absoluteAssetUrl("/og.jpg");
const iconSvg = assetUrl("/icon.svg");
const icon192 = assetUrl("/icon-192.png");
const icon512 = assetUrl("/icon-512.png");
const appleIcon = assetUrl("/apple-touch-icon.png");
const favicon32 = assetUrl("/favicon-32.png");
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
        width: 1200,
        height: 630,
        alt: "MotoRent36 — аренда мотошлема в Воронеже",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [ogImage],
  },
  ...(yandexVerification || googleVerification
    ? {
        verification: {
          ...(yandexVerification ? { yandex: yandexVerification } : {}),
          ...(googleVerification ? { google: googleVerification } : {}),
        },
      }
    : {}),
  robots: { index: true, follow: true },
  manifest: manifestUrl,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SEO_CONFIG.brandName,
  },
  icons: {
    icon: [
      { url: favicon32, sizes: "32x32", type: "image/png" },
      { url: iconSvg, type: "image/svg+xml" },
      { url: icon192, sizes: "192x192", type: "image/png" },
      { url: icon512, sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: appleIcon, sizes: "180x180", type: "image/png" }],
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
        <a href="#main-content" className="skip-link">
          Перейти к содержимому
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1 w-full min-w-0">
          {children}
        </main>
        <SiteFooter />
        <YandexMetrika />
      </body>
    </html>
  );
}

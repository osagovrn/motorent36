import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getDictionary } from "@/i18n/dictionaries";
import { OTHER_LOCALES, isLocale, type Locale } from "@/i18n/locales";

export function generateStaticParams() {
  return OTHER_LOCALES.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw) || raw === "ru") notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader locale={locale} dict={dict.nav} />
      <main id="main-content" className="flex-1 w-full min-w-0">
        {children}
      </main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}

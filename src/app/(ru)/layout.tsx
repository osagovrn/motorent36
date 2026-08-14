import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getDictionary } from "@/i18n/dictionaries";

export default function RuLayout({ children }: { children: React.ReactNode }) {
  const dict = getDictionary("ru");
  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти к содержимому
      </a>
      <SiteHeader locale="ru" dict={dict.nav} />
      <main id="main-content" className="flex-1 w-full min-w-0">
        {children}
      </main>
      <SiteFooter locale="ru" dict={dict} />
    </>
  );
}

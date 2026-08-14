import { HomeContent } from "@/content/HomeContent";
import { getDictionary } from "@/i18n/dictionaries";

export default function HomePage() {
  return <HomeContent locale="ru" dict={getDictionary("ru")} />;
}

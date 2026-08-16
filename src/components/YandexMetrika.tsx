import Script from "next/script";
import { SEO_CONFIG } from "@/config/seo";

/** Подключается, если задан NEXT_PUBLIC_YANDEX_METRIKA_ID */
export function YandexMetrika() {
  const id = SEO_CONFIG.yandexMetrikaId.trim();
  if (!id || !/^\d+$/.test(id)) return null;

  const scriptSrc = `https://mc.yandex.ru/metrika/tag.js?id=${id}`;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">{`
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", ${JSON.stringify(scriptSrc)}, "ym");
ym(${JSON.stringify(id)}, "init", {
  ssr: true,
  webvisor: true,
  clickmap: true,
  accurateTrackBounce: true,
  trackLinks: true
});
`}</Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}

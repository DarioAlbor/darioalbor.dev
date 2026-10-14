/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: "Darío Albor, AI-first full stack developer. Desarrollador full stack AI-first.",
  alternates: { canonical: "/", languages: { en: "/en/", es: "/es/", "x-default": "/" } },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.name,
    description: "Darío Albor, AI-first full stack developer. Desarrollador full stack AI-first.",
    locale: "en_US",
    alternateLocale: ["es_AR"],
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: site.name, images: ["/og.png"] },
};

const pickLanguage = `(function(){
  var l;
  try { l = localStorage.getItem("lang"); } catch (e) {}
  if (l !== "en" && l !== "es") l = /^es\\b/i.test(navigator.language || "") ? "es" : "en";
  location.replace("/" + l + "/");
})();`;

export default function Root() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: pickLanguage }} />
      <p className="site-name">{site.name}</p>
      <p>
        <a href="/en/" hrefLang="en">English</a> · <a href="/es/" hrefLang="es">Español</a>
      </p>
    </>
  );
}

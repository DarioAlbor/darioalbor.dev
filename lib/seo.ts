import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/content/i18n";
import { site } from "@/content/site";

export function pageMetadata({
  lang,
  path,
  title,
  description,
  type = "website",
  langs = locales,
  publishedTime,
}: {
  lang: Locale;
  path: string;
  title?: string;
  description: string;
  type?: "website" | "article" | "profile";
  langs?: readonly Locale[];
  publishedTime?: string;
}): Metadata {
  const t = getDictionary(lang);
  const url = `/${lang}${path}`;
  const languages: Record<string, string> = Object.fromEntries(langs.map((l) => [l, `/${l}${path}`]));
  languages["x-default"] = path === "/" ? "/" : languages.en ?? url;
  const fullTitle = title ? `${title} — ${site.name}` : site.name;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: t.ogLocale,
      alternateLocale: langs.filter((l) => l !== lang).map((l) => getDictionary(l).ogLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
      ...(publishedTime ? { publishedTime, authors: [site.url] } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/og.png"] },
  };
}

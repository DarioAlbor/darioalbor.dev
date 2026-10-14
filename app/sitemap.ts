import type { MetadataRoute } from "next";
import { getCv } from "@/content/cv";
import { locales, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, langs: readonly Locale[], lastModified: Date, priority: number) =>
    langs.map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      lastModified,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(langs.map((l) => [l, `${site.url}/${l}${path}`])),
          "x-default": path === "/" ? `${site.url}/` : `${site.url}/${langs.includes("en") ? "en" : langs[0]}${path}`,
        },
      },
    }));

  const pages = [
    ...entry("/", locales, now, 1),
    ...entry("/cv/", locales, now, 0.9),
    ...entry("/writing/", locales, now, 0.7),
    ...entry("/projects/", locales, now, 0.5),
    ...entry("/contact/", locales, now, 0.5),
    ...getCv("en").jobs.flatMap((j) => entry(`/work/${j.slug}/`, locales, now, 0.6)),
  ];

  const slugs = new Set(locales.flatMap((l) => getPosts(l).map((p) => p.slug)));
  const posts = [...slugs].flatMap((slug) => {
    const langs = locales.filter((l) => getPosts(l).some((p) => p.slug === slug));
    const date = getPosts(langs[0]).find((p) => p.slug === slug)!.date;
    return entry(`/writing/${slug}/`, langs, new Date(`${date}T12:00:00Z`), 0.7);
  });

  return [...pages, ...posts];
}

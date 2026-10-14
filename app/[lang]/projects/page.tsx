import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/content/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: "/projects/", title: t.projects.title, description: t.meta.projects });
}

export default async function Projects({ params }: PageProps<"/[lang]/projects">) {
  const t = getDictionary((await params).lang as Locale);
  return (
    <>
      <h1>{t.projects.title}</h1>
      <p className="muted">{t.soon}</p>
    </>
  );
}

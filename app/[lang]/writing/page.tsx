import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "@/content/i18n";
import { pageMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/posts";

export async function generateMetadata({ params }: PageProps<"/[lang]/writing">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: "/writing/", title: t.writing.title, description: t.meta.writing });
}

export default async function Writing({ params }: PageProps<"/[lang]/writing">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const posts = getPosts(lang);
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))];

  return (
    <>
      <h1>{t.writing.title}</h1>
      {years.map((year) => (
        <section key={year}>
          <h2>{year}</h2>
          <ul className="index">
            {posts
              .filter((p) => p.date.startsWith(year))
              .map((p) => (
                <li key={p.slug}>
                  <time dateTime={p.date} className="date">{p.date}</time>
                  <Link href={`/${lang}/writing/${p.slug}/`}>
                    {p.title}
                    {p.draft && ` (${t.writing.draft})`}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, locales, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/json-ld";
import { getPost, getPosts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  return getPosts(params.lang as Locale).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/writing/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPost(lang as Locale, slug);
  return pageMetadata({
    lang: lang as Locale,
    path: `/writing/${slug}/`,
    title: post.title,
    description: post.summary,
    type: "article",
    langs: locales.filter((l) => getPosts(l).some((p) => p.slug === slug)),
    publishedTime: post.date,
  });
}

export default async function PostPage({ params }: PageProps<"/[lang]/writing/[slug]">) {
  const { lang, slug } = await params;
  const t = getDictionary(lang as Locale);
  const post = await getPost(lang as Locale, slug);

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          datePublished: post.date,
          inLanguage: lang,
          url: `${site.url}/${lang}/writing/${slug}/`,
          author: { "@type": "Person", name: site.name, url: site.url },
        }}
      />
      <h1>{post.title}</h1>
      <time dateTime={post.date} className="date">{post.date}</time>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <p className="small">
        <Link href={`/${lang}/writing/`}>{t.writing.back}</Link>
      </p>
    </article>
  );
}

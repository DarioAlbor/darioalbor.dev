import type { Metadata } from "next";
import Link from "next/link";
import { getCv } from "@/content/cv";
import { getDictionary, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import JsonLd from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  return getCv(params.lang as Locale).jobs.map((j) => ({ slug: j.slug }));
}

function findJob(lang: string, slug: string) {
  return getCv(lang as Locale).jobs.find((j) => j.slug === slug)!;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const job = findJob(lang, slug);
  return pageMetadata({
    lang: lang as Locale,
    path: `/work/${slug}/`,
    title: job.company,
    description: `${job.role} · ${job.dates}. ${job.bullets[0]}`,
  });
}

export default async function JobPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  const t = getDictionary(lang as Locale);
  const job = findJob(lang, slug);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/${lang}/` },
      { "@type": "ListItem", position: 2, name: "CV", item: `${site.url}/${lang}/cv/` },
      { "@type": "ListItem", position: 3, name: job.company, item: `${site.url}/${lang}/work/${slug}/` },
    ],
  };

  return (
    <article className="job">
      <JsonLd data={breadcrumbs} />
      <h1>{job.company}</h1>
      <p className="muted">
        {job.role} · {job.dates}
        <br />
        {job.place}
      </p>
      <ul>
        {job.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <p>
        <b>{t.cv.tech}:</b> {job.tech}
      </p>
      <p className="small">
        <Link href={`/${lang}/cv/`}>{t.job.back}</Link>
      </p>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getCv } from "@/content/cv";
import { getDictionary, type Locale } from "@/content/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: "/cv/", title: t.cv.title, description: t.meta.cv, type: "profile" });
}

const pdfs = [
  { locale: "en", href: "/cv/dario-albor-cv-en.pdf?v=2", label: "English" },
  { locale: "es", href: "/cv/dario-albor-cv-es.pdf?v=2", label: "Español" },
];

export default async function CV({ params }: PageProps<"/[lang]/cv">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const cv = getCv(lang);
  const ordered = [...pdfs].sort((a, b) => Number(b.locale === lang) - Number(a.locale === lang));

  return (
    <>
      <h1>{t.cv.title}</h1>
      <p>
        {t.cv.pdf}:{" "}
        {ordered.map((p, i) => (
          <span key={p.href}>
            {i > 0 && " · "}
            <a href={p.href} hrefLang={p.locale}>{p.label}</a>
          </span>
        ))}
      </p>

      <h2>{t.cv.profile}</h2>
      <p dangerouslySetInnerHTML={{ __html: cv.profile }} />

      <h2>{t.cv.experience}</h2>
      {cv.jobs.map((j) => (
        <div key={j.slug} className="entry job">
          <h3>
            <Link href={`/${lang}/work/${j.slug}/`}>{j.company}</Link>
          </h3>
          <p className="muted">
            {j.role} · {j.dates} · {j.place}
          </p>
          <ul>
            {j.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
            <li>
              <b>{t.cv.tech}:</b> {j.tech}
            </li>
          </ul>
        </div>
      ))}

      <h2>{t.cv.education}</h2>
      <div className="entry">
        <h3>{cv.education.school}</h3>
        <p className="muted">
          {cv.education.degree} · {cv.education.dates} · {cv.education.place}
        </p>
      </div>

      <h2>{t.cv.skills}</h2>
      <dl className="skills">
        {cv.skills.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

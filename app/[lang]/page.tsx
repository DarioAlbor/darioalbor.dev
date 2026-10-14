import type { Metadata } from "next";
import Link from "next/link";
import { getCv } from "@/content/cv";
import { getDictionary, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import JsonLd from "@/components/json-ld";
import { getPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: "/", absoluteTitle: t.meta.title, description: t.meta.home, type: "profile" });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const cv = getCv(lang);
  const posts = getPosts(lang).slice(0, 5);

  const person = {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    url: `${site.url}/${lang}/`,
    image: `${site.url}/og.png`,
    jobTitle: "Full Stack Developer",
    description: t.meta.home,
    email: `mailto:${t.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Tecnológica Nacional" },
    worksFor: { "@type": "Organization", name: cv.jobs[0].company },
    knowsAbout: ["Software architecture", "AI-assisted development", "NestJS", "Next.js", "TypeScript", "PostgreSQL", "Proxmox"],
    sameAs: [site.github, site.linkedin],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/`,
        name: site.name,
        inLanguage: ["en", "es"],
        publisher: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "ProfilePage",
        url: `${site.url}/${lang}/`,
        name: t.meta.title,
        inLanguage: lang,
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: person,
      },
    ],
  };

  return (
    <>
      <JsonLd data={graph} />
      <h1 className="sr-only">{t.meta.title}</h1>
      {t.home.intro.map((p) => (
        <p key={p}>{p}</p>
      ))}

      <h2>{t.home.writing}</h2>
      <ul className="index">
        {posts.map((p) => (
          <li key={p.slug}>
            <time dateTime={p.date} className="date">{p.date}</time>
            <Link href={`/${lang}/writing/${p.slug}/`}>{p.title}</Link>
          </li>
        ))}
      </ul>

      <h2>{t.home.work}</h2>
      <ul className="index">
        {cv.jobs.map((j) => (
          <li key={j.slug}>
            <span className="date">{j.years}</span>
            <span>
              <Link href={`/${lang}/work/${j.slug}/`}>{j.company}</Link>, <span className="muted">{j.role}</span>
            </span>
          </li>
        ))}
      </ul>

      <h2>{t.home.projects}</h2>
      <p className="muted">{t.soon}</p>
    </>
  );
}

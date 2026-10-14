import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/content/i18n";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import ContactForm from "./contact-form";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: "/contact/", title: t.contact.title, description: t.meta.contact });
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);

  return (
    <>
      <h1>{t.contact.title}</h1>
      <ContactForm lang={lang} t={t.contact.form} email={t.email} />

      <h2>{t.contact.email}</h2>
      <p>
        <a href={`mailto:${t.email}`}>{t.email}</a>
      </p>

      <h2>{t.contact.elsewhere}</h2>
      <ul className="index">
        <li>
          <span className="date">github</span>
          <a href={site.github}>{site.github.replace("https://", "")}</a>
        </li>
        <li>
          <span className="date">linkedin</span>
          <a href={site.linkedin}>{site.linkedin.replace("https://www.", "")}</a>
        </li>
      </ul>
    </>
  );
}

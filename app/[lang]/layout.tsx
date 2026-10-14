import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { getPosts } from "@/lib/posts";
import LangSwitch from "./lang-switch";
import Year from "./year";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s — ${site.name}` },
    description: t.meta.home,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  const postSlugs = Object.fromEntries(
    locales.map((l) => [l, getPosts(l).map((p) => p.slug)]),
  ) as Record<Locale, string[]>;
  const options = locales.map((l) => ({ locale: l, label: getDictionary(l).label }));

  return (
    <html lang={t.htmlLang}>
      <body>
        <header>
          <div className="masthead">
            <p className="site-name">
              <Link href={`/${lang}/`}>
                <span className="logo" aria-hidden="true" />
                {site.name}
              </Link>
            </p>
            <LangSwitch current={lang} options={options} postSlugs={postSlugs} />
          </div>
          <nav>
            <Link href={`/${lang}/`}>{t.nav.home}</Link> · <Link href={`/${lang}/writing/`}>{t.nav.writing}</Link> ·{" "}
            <Link href={`/${lang}/projects/`}>{t.nav.projects}</Link> · <Link href={`/${lang}/cv/`}>{t.nav.cv}</Link> ·{" "}
            <Link href={`/${lang}/contact/`}>{t.nav.contact}</Link>
          </nav>
        </header>
        <hr />
        <main>{children}</main>
        <hr />
        <footer>
          © <Year /> {site.name} · <a href={`mailto:${t.email}`}>{t.email}</a>
        </footer>
      </body>
    </html>
  );
}

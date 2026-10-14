"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/i18n";

type Option = { locale: Locale; label: string };

function targetPath(pathname: string, to: Locale, postSlugs: Record<Locale, string[]>) {
  const rest = pathname.split("/").slice(2).filter(Boolean);
  if (rest[0] === "writing" && rest[1] && !postSlugs[to].includes(rest[1])) {
    return `/${to}/writing/`;
  }
  return `/${[to, ...rest].join("/")}/`;
}

export default function LangSwitch({
  current,
  options,
  postSlugs,
}: {
  current: Locale;
  options: Option[];
  postSlugs: Record<Locale, string[]>;
}) {
  const pathname = usePathname();

  return (
    <p className="lang-switch">
      {options.map((o, i) => {
        return (
          <span key={o.locale}>
            {i > 0 && " · "}
            {o.locale === current ? (
              <strong aria-current="true">{o.label}</strong>
            ) : (
              <Link
                href={targetPath(pathname, o.locale, postSlugs)}
                hrefLang={o.locale}
                onClick={() => {
                  try {
                    localStorage.setItem("lang", o.locale);
                  } catch {}
                }}
              >
                {o.label}
              </Link>
            )}
          </span>
        );
      })}
    </p>
  );
}

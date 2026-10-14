"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary, Locale } from "@/content/i18n";
import { site } from "@/content/site";
import Turnstile from "./turnstile";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({
  lang,
  t,
  email,
}: {
  lang: Locale;
  t: Dictionary["contact"]["form"];
  email: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt] = useState(() => Date.now());
  const [attempt, setAttempt] = useState(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(e.currentTarget.action, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (res.ok && data.ok) {
        setStatus("sent");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
    setAttempt((n) => n + 1);
  }

  if (status === "sent") return <p>{t.sent}</p>;

  return (
    <form className="contact" action="/api/contact.php" method="post" onSubmit={onSubmit}>
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="t" value={startedAt} />
      <div className="hp" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label>
        {t.name}
        <input type="text" name="name" required maxLength={100} autoComplete="name" />
      </label>
      <label>
        {t.email}
        <input type="email" name="email" required maxLength={200} autoComplete="email" />
      </label>
      <label>
        {t.message}
        <textarea name="message" required maxLength={5000} rows={7} />
      </label>

      <Turnstile siteKey={site.turnstileSiteKey} lang={lang} resetKey={attempt} />

      <p>
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.send}
        </button>
      </p>
      {status === "error" && (
        <p className="error">
          {t.error} <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
    </form>
  );
}

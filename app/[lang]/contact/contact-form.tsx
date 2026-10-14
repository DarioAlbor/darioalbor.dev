"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Dictionary, Locale } from "@/content/i18n";
import { site } from "@/content/site";
import Turnstile from "./turnstile";

type Reason = "captcha" | "rate" | "invalid" | "server";
type Toast = { kind: "ok" } | { kind: "error"; reason: Reason };

const TOAST_MS = 8000;

export default function ContactForm({
  lang,
  t,
  email,
}: {
  lang: Locale;
  t: Dictionary["contact"]["form"];
  email: string;
}) {
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<(Toast & { id: number }) | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), TOAST_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = new FormData(form);
    if (!body.get("cf-turnstile-response")) {
      setToast({ kind: "error", reason: "captcha", id: Date.now() });
      return;
    }
    setSending(true);
    let result: Toast;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(20000),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      result =
        res.ok && data.ok === true
          ? { kind: "ok" }
          : { kind: "error", reason: ["captcha", "rate", "invalid"].includes(data.error) ? data.error : "server" };
    } catch {
      result = { kind: "error", reason: "server" };
    }
    if (result.kind === "ok") form.reset();
    setSending(false);
    setAttempt((n) => n + 1);
    setToast({ ...result, id: Date.now() });
  }

  return (
    <>
      <form className="contact" action="/api/contact.php" method="post" onSubmit={onSubmit}>
        <input type="hidden" name="lang" value={lang} />
        <input type="hidden" name="t" value={startedAt} />
        <div className="hp" aria-hidden="true">
          <label>
            Leave empty <input type="text" name="hp_extra" tabIndex={-1} autoComplete="off" />
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
          <button type="submit" disabled={sending}>
            {sending ? t.sending : t.send}
          </button>
        </p>
      </form>

      <div className="toast-region" aria-live="polite">
        {toast && (
          <div key={toast.id} className={`toast toast-${toast.kind}`} role="status">
            <span className="toast-mark" aria-hidden="true">
              {toast.kind === "ok" ? "✓" : "✗"}
            </span>
            <span>
              {toast.kind === "ok" ? (
                t.sent
              ) : toast.reason === "server" ? (
                <>
                  {t.error} <a href={`mailto:${email}`}>{email}</a>.
                </>
              ) : (
                t.errors[toast.reason]
              )}
            </span>
            <button type="button" className="toast-close" onClick={() => setToast(null)} aria-label={t.close}>
              ×
            </button>
          </div>
        )}
      </div>
    </>
  );
}

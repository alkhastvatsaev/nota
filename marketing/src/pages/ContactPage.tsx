import { type FormEvent, useState } from "react";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "../config/contact";
import { useLocale } from "../i18n/LocaleContext";
import { OpenNotaLink } from "../components/OpenNotaLink";
import { SeoFooterNav } from "../components/SeoFooterNav";
import { SiteHeader } from "../components/SiteHeader";

type Status = "idle" | "sending" | "success" | "error" | "config";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-line bg-mist px-4 py-3.5 text-base font-normal text-ink outline-none transition placeholder:text-mute/50 focus:border-accent focus:bg-void";

export function ContactPage() {
  const { locale, t } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          locale,
          company: honeypot,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.status === 503 || data?.error === "mail_not_configured") {
        setStatus("config");
        return;
      }
      if (!res.ok || !data?.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-svh bg-void text-ink">
      <a href="#main" className="skip-link">
        {t.skipToContent}
      </a>
      <SiteHeader />

      <main id="main" className="mx-auto max-w-xl px-6 pb-20 pt-8 sm:px-10">
        <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
          {t.contactEyebrow}
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.5rem)] leading-tight tracking-tight text-ink">
          {t.contactTitle}
        </h1>
        <p className="mt-4 text-lg font-normal leading-relaxed text-mute">{t.contactLead}</p>

        <div className="mt-8 rounded-3xl border border-line bg-mist px-5 py-5 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.14em] text-mute uppercase">
            {t.contactDirect}
          </p>
          <a
            href={CONTACT_MAILTO}
            className="mt-2 inline-flex min-h-11 break-all text-base font-medium text-ink underline-offset-2 hover:text-accent hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-2 text-sm font-normal text-mute">Nota CRM · heynota.app</p>
        </div>

        <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
          <label className="block text-sm font-medium text-ink">
            <span>{t.contactName}</span>
            <input
              required
              name="name"
              autoComplete="name"
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldClass}
            />
          </label>

          <label className="block text-sm font-medium text-ink">
            <span>{t.contactEmail}</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              maxLength={200}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </label>

          <label className="block text-sm font-medium text-ink">
            <span>{t.contactMessage}</span>
            <textarea
              required
              name="message"
              rows={7}
              maxLength={5000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${fieldClass} resize-y min-h-[10rem]`}
            />
          </label>

          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-8 py-3 text-sm text-on-accent transition hover:bg-accent-deep disabled:opacity-60"
            >
              {status === "sending" ? t.contactSending : t.contactSend}
            </button>
            <a
              href={CONTACT_MAILTO}
              className="inline-flex min-h-11 items-center justify-center text-sm font-normal text-mute underline-offset-2 hover:text-ink hover:underline"
            >
              {t.contactOrMail} {CONTACT_EMAIL}
            </a>
          </div>

          {status === "success" ? (
            <p
              className="rounded-2xl border border-line bg-sky-soft px-4 py-3 text-sm font-medium text-ink"
              role="status"
            >
              {t.contactSuccess}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm font-normal text-mute" role="alert">
              {t.contactError}{" "}
              <a href={CONTACT_MAILTO} className="text-accent underline-offset-2 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          ) : null}
          {status === "config" ? (
            <p className="text-sm font-normal text-mute" role="alert">
              {t.contactErrorConfig}{" "}
              <a href={CONTACT_MAILTO} className="text-accent underline-offset-2 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          ) : null}
        </form>

        <div className="mt-14 rounded-3xl bg-mist px-6 py-8 text-center sm:px-10">
          <p className="font-display text-xl tracking-tight text-ink">{t.openNotaNow}</p>
          <p className="mt-2 text-sm font-normal text-mute">{t.noSignupNoWait}</p>
          <div className="mt-6 flex justify-center">
            <OpenNotaLink
              variant="primary"
              utmContent="contact_page_bottom"
              className="rounded-full bg-accent px-8 py-4 text-sm text-on-accent transition hover:bg-accent-deep"
            />
          </div>
        </div>

        <nav aria-label="Nota" className="mt-12 border-t border-line pt-8">
          <SeoFooterNav
            currentPath="/contact"
            className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-normal text-mute"
          />
        </nav>
      </main>
    </div>
  );
}

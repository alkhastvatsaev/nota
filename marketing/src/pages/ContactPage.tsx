import { type FormEvent, useState } from "react";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "../config/contact";
import { FOUNDER_FULL_NAME } from "../config/founder";
import { useLocale } from "../i18n/LocaleContext";
import { OpenNotaLink } from "../components/OpenNotaLink";
import { SeoFooterNav } from "../components/SeoFooterNav";
import { SiteHeader } from "../components/SiteHeader";
import { StickyCta } from "../components/StickyCta";

type Status = "idle" | "sending" | "success" | "error" | "config";

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
    <div className="min-h-svh bg-void pb-24 text-ink md:pb-0">
      <a href="#main" className="skip-link">
        {t.skipToContent}
      </a>
      <SiteHeader />

      <main id="main" className="mx-auto max-w-2xl px-6 pb-16 pt-8 sm:px-10">
        <p className="text-xs tracking-[0.22em] text-accent uppercase">{t.contactEyebrow}</p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)] leading-tight tracking-tight text-ink">
          {t.contactTitle}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-mute">{t.contactLead}</p>

        <p className="mt-6 text-sm text-mute">
          {t.contactOrMail}{" "}
          <a
            href={CONTACT_MAILTO}
            className="font-normal text-ink underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
          <label className="block text-sm text-ink">
            <span>{t.contactName}</span>
            <input
              required
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-line bg-mist px-4 py-3 text-base text-ink outline-none focus:border-accent"
            />
          </label>

          <label className="block text-sm text-ink">
            <span>{t.contactEmail}</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-line bg-mist px-4 py-3 text-base text-ink outline-none focus:border-accent"
            />
          </label>

          <label className="block text-sm text-ink">
            <span>{t.contactMessage}</span>
            <textarea
              required
              name="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 w-full resize-y rounded-2xl border border-line bg-mist px-4 py-3 text-base text-ink outline-none focus:border-accent"
            />
          </label>

          {/* Honeypot */}
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

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-8 py-3 text-sm text-on-accent transition hover:bg-accent-deep disabled:opacity-60"
          >
            {status === "sending" ? t.contactSending : t.contactSend}
          </button>

          {status === "success" ? (
            <p className="text-sm text-ink" role="status">
              {t.contactSuccess}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-mute" role="alert">
              {t.contactError}{" "}
              <a href={CONTACT_MAILTO} className="text-accent underline-offset-2 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          ) : null}
          {status === "config" ? (
            <p className="text-sm text-mute" role="alert">
              {t.contactErrorConfig}{" "}
              <a href={CONTACT_MAILTO} className="text-accent underline-offset-2 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          ) : null}
        </form>

        <div className="mt-14 rounded-3xl bg-mist px-6 py-8 text-center sm:px-10">
          <p className="font-display text-xl tracking-tight text-ink">{t.openNotaNow}</p>
          <p className="mt-2 text-sm text-mute">
            {FOUNDER_FULL_NAME} · {CONTACT_EMAIL}
          </p>
          <div className="mt-6 hidden justify-center md:flex">
            <OpenNotaLink
              variant="primary"
              utmContent="contact_page_bottom"
              className="rounded-full bg-accent px-8 py-4 text-sm text-on-accent transition hover:bg-accent-deep"
            />
          </div>
        </div>

        <SeoFooterNav
          currentPath="/contact"
          className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute"
        />
      </main>

      <StickyCta />
    </div>
  );
}

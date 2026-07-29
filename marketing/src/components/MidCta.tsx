import { useLocale } from "../i18n/LocaleContext";
import { OpenNotaLink } from "./OpenNotaLink";

export function MidCta() {
  const { t } = useLocale();
  return (
    <section
      className="border-t border-line bg-void px-6 py-14 text-center sm:px-10 sm:py-16"
      aria-label={t.midCtaAria}
    >
      <p className="font-display text-xl tracking-tight text-ink sm:text-2xl">{t.midCta}</p>
      <p className="mx-auto mt-3 max-w-md text-sm text-mute">{t.midCtaLead}</p>
      <div className="mt-7 flex justify-center">
        <OpenNotaLink
          variant="primary"
          utmContent="mid_cta"
          className="rounded-full bg-accent px-8 py-4 text-sm text-on-accent transition hover:bg-accent-deep"
        />
      </div>
    </section>
  );
}

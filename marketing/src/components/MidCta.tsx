import { useLocale } from "../i18n/LocaleContext";
import { OpenNotaLink } from "./OpenNotaLink";

export function MidCta() {
  const { t } = useLocale();
  return (
    <section className="bg-void px-6 py-12 text-center sm:px-10 sm:py-14" aria-label={t.midCtaAria}>
      <p className="font-display text-xl tracking-tight text-ink sm:text-2xl">{t.midCta}</p>
      <div className="mt-6 flex justify-center">
        <OpenNotaLink
          variant="primary"
          className="rounded-full bg-accent px-8 py-4 text-sm text-on-accent transition hover:bg-accent-deep"
        />
      </div>
    </section>
  );
}

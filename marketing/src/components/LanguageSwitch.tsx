import { useLocale } from "../i18n/LocaleContext";

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={`inline-flex items-center gap-1 text-xs ${className}`}
      role="group"
      aria-label={t.langSwitchAria}
    >
      <button
        type="button"
        onClick={() => setLocale("fr")}
        className={
          locale === "fr"
            ? "rounded-full bg-ink px-2.5 py-1 text-void"
            : "rounded-full px-2.5 py-1 text-mute hover:text-ink"
        }
        aria-pressed={locale === "fr"}
      >
        {t.langFr}
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={
          locale === "en"
            ? "rounded-full bg-ink px-2.5 py-1 text-void"
            : "rounded-full px-2.5 py-1 text-mute hover:text-ink"
        }
        aria-pressed={locale === "en"}
      >
        {t.langEn}
      </button>
    </div>
  );
}

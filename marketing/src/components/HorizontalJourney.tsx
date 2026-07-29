import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "../i18n/LocaleContext";

/** Étapes verticales compactes — pas de scroll hijack (concentration). */
export function HorizontalJourney() {
  const reduce = useReducedMotion();
  const { t } = useLocale();
  const chapters = t.journey;

  return (
    <section
      id="voyage"
      className="border-t border-line bg-void px-6 py-16 sm:px-10 sm:py-20"
      aria-label={t.journeyAria}
    >
      <ol className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3 sm:gap-8">
        {chapters.map((chapter, i) => (
          <motion.li
            key={chapter.title}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-center sm:text-left"
          >
            <p className="text-xs tracking-[0.28em] text-accent uppercase">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl">
              {chapter.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-mute sm:text-base">{chapter.line}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

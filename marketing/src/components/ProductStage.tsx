import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "../i18n/LocaleContext";

/** Aperçu kanban avec libellés métiers réalistes (pas de noms fictifs absurdes). */
export function ProductStage() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const columns = t.productStages.map((stage, i) => ({
    stage,
    items: t.productDemoLines[i] ?? [],
  }));

  return (
    <section
      id="produit"
      className="relative border-t border-line bg-mist py-16 sm:py-20"
      aria-labelledby="produit-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <h2
          id="produit-heading"
          className="font-display text-[clamp(1.5rem,4vw,2.25rem)] tracking-tight text-ink"
        >
          {t.productHeading}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-mute sm:text-base">{t.productLead}</p>
      </div>

      <div className="mx-auto mt-10 flex max-w-5xl justify-center px-6 sm:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-3xl"
        >
          <div className="overflow-hidden rounded-[1.75rem] border border-line bg-gradient-to-br from-sky-soft via-mist to-void shadow-[0_24px_60px_rgba(37,99,235,0.12)]">
            <div className="flex items-center gap-2 border-b border-line/80 bg-void/70 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-4 sm:p-6">
              {columns.map((col, i) => (
                <motion.div
                  key={col.stage}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}
                  className="rounded-2xl border border-line/80 bg-void/90 p-3"
                >
                  <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-mute">
                    {col.stage}
                  </p>
                  <div className="space-y-2">
                    {col.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-line bg-mist px-3 py-2.5 text-xs text-ink"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

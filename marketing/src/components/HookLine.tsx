import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "../i18n/LocaleContext";

export function HookLine() {
  const reduce = useReducedMotion();
  const { t } = useLocale();

  return (
    <section
      className="relative flex min-h-[42svh] items-center justify-center bg-mist px-6 py-16 text-center"
      aria-label={t.hookAria}
    >
      <div>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-[1.15] tracking-tight text-mute"
        >
          {t.hookLine1}
        </motion.p>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-[1.15] tracking-tight text-ink"
        >
          {t.hookLine2}
        </motion.p>
      </div>
    </section>
  );
}

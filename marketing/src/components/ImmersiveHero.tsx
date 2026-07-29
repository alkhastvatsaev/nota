import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "../i18n/LocaleContext";
import { OpenNotaLink } from "./OpenNotaLink";
import { HeroNotaTitle } from "./HeroNotaTitle";

const spring = { type: "spring" as const, stiffness: 80, damping: 18, mass: 0.85 };

/** Hero allégé : marque + promesse + un CTA — sans fade au scroll ni particules. */
export function ImmersiveHero() {
  const { t } = useLocale();
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[78svh] flex-col overflow-hidden bg-void sm:min-h-[82svh]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(900px 480px at 50% -10%, rgba(37,99,235,0.12), transparent 55%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center overflow-visible px-6 pb-16 text-center md:pb-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.05 }}
          className="overflow-visible"
        >
          <h1 className="flex w-full justify-center overflow-visible leading-none">
            <HeroNotaTitle reduceMotion={!!reduce} />
            <span className="sr-only">NOTA {t.heroSr}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.14 }}
          className="mt-6 max-w-xl text-lg font-medium leading-snug text-ink sm:text-xl"
        >
          {t.heroSub}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.24 }}
          className="mt-8"
        >
          <OpenNotaLink
            variant="primary"
            utmContent="hero"
            className="rounded-full bg-ink px-8 py-4 text-sm text-void transition hover:bg-accent"
          />
        </motion.div>
        <p className="mt-3 text-xs font-normal text-mute">{t.noAccountAccess}</p>
      </div>
    </section>
  );
}

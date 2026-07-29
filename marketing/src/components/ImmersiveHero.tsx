import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLocale } from "../i18n/LocaleContext";
import { OpenNotaLink } from "./OpenNotaLink";
import { HeroNotaTitle } from "./HeroNotaTitle";

const spring = { type: "spring" as const, stiffness: 80, damping: 18, mass: 0.85 };

export function ImmersiveHero() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const yTitle = useTransform(smooth, [0, 0.55], reduce ? [0, 0] : [0, -28]);
  const opacityHero = useTransform(smooth, [0, 0.75], reduce ? [1, 1] : [1, 0.15]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-void"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(900px 480px at 50% -10%, rgba(37,99,235,0.14), transparent 55%)",
        }}
      />

      <motion.div
        style={{ opacity: opacityHero }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center overflow-visible px-6 pb-24 text-center md:pb-20"
      >
        <motion.div
          style={{ y: yTitle }}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.08 }}
          className="overflow-visible"
        >
          <h1 className="flex w-full justify-center overflow-visible leading-none">
            <HeroNotaTitle reduceMotion={!!reduce} />
            <span className="sr-only">NOTA {t.heroSr}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="mt-5 max-w-lg text-lg font-normal text-mute sm:text-xl"
        >
          {t.heroSub}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.32 }}
          className="mt-9"
        >
          <OpenNotaLink
            variant="primary"
            utmContent="hero"
            className="rounded-full bg-ink px-8 py-4 text-sm text-void transition hover:bg-accent"
          >
            {t.heroCta}
          </OpenNotaLink>
        </motion.div>
        <p className="mt-3 text-xs font-normal text-mute">{t.noAccountAccess}</p>
      </motion.div>

      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute bottom-10 left-1/2 z-10 h-8 w-px -translate-x-1/2 bg-accent/50 md:bottom-8"
          animate={{ opacity: [0.2, 0.85, 0.2], scaleY: [0.7, 1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </section>
  );
}

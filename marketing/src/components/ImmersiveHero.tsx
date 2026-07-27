import { lazy, Suspense, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { OpenNotaLink } from "./OpenNotaLink";

const ParticleField = lazy(() =>
  import("./ui/ParticleField").then((m) => ({ default: m.ParticleField }))
);

const spring = { type: "spring" as const, stiffness: 80, damping: 18, mass: 0.85 };

export function ImmersiveHero() {
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

      {!reduce && (
        <Suspense fallback={null}>
          <div className="pointer-events-none absolute inset-0">
            <ParticleField />
          </div>
        </Suspense>
      )}

      <motion.div
        style={{ opacity: opacityHero }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-28 text-center md:pb-24"
      >
        <motion.h1
          style={{ y: yTitle }}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.08 }}
          className="font-display text-[clamp(3.25rem,13vw,9rem)] leading-[0.95] tracking-tight text-ink"
        >
          NOTA
          <span className="sr-only">
            {" "}
            — CRM interventions terrain pour entreprises à équipes mobiles
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="mt-5 max-w-lg text-lg text-mute sm:text-xl"
        >
          Carte, techniciens, dossiers — pour vos missions sur site.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.32 }}
          className="mt-9"
        >
          <OpenNotaLink
            variant="primary"
            className="rounded-full bg-ink px-8 py-4 text-sm text-void transition hover:bg-accent"
          />
        </motion.div>
        <p className="mt-3 text-xs text-mute">Sans compte · Accès immédiat</p>
      </motion.div>

      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute bottom-24 left-1/2 z-10 h-8 w-px -translate-x-1/2 bg-accent/50 md:bottom-8"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      )}
    </section>
  );
}

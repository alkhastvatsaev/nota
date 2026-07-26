import { motion, useReducedMotion } from "framer-motion";
import { OpenNotaLink } from "./OpenNotaLink";

export function FinalAct() {
  const reduce = useReducedMotion();

  return (
    <section id="ouvrir" className="relative overflow-hidden bg-void py-24 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(600px 280px at 50% 40%, rgba(29,78,216,0.12), transparent 70%)",
        }}
      />
      <div className="relative mx-auto flex max-w-lg flex-col items-center px-6 text-center">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[clamp(2rem,5vw,3rem)] tracking-tight text-ink"
        >
          À vous de jouer.
        </motion.h2>
        <p className="mt-3 text-base text-mute">On ne vous demande rien.</p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mt-9 hidden md:block"
        >
          <OpenNotaLink className="rounded-full bg-accent px-10 py-4 text-sm text-on-accent shadow-[0_16px_40px_rgba(29,78,216,0.28)] transition hover:bg-accent-deep" />
        </motion.div>
        <p className="mt-6 hidden text-xs text-mute md:block">À vous · Tout de suite</p>
      </div>
    </section>
  );
}

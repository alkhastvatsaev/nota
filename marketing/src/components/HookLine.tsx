import { motion, useReducedMotion } from "framer-motion";

/** Une seule phrase de tension — zéro lecture longue. */
export function HookLine() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[42svh] items-center justify-center bg-mist px-6 py-16 text-center"
      aria-label="Promesse Nota"
    >
      <div>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-[1.15] tracking-tight text-mute"
        >
          Vous avez mieux à faire.
        </motion.p>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-[1.15] tracking-tight text-ink"
        >
          Nota garde le reste.
        </motion.p>
      </div>
    </section>
  );
}

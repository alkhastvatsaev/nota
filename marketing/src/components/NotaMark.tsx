"use client";

import { motion, useReducedMotion } from "framer-motion";

const LETTERS = ["N", "O", "T", "A"] as const;
const easePremium = [0.22, 1, 0.36, 1] as const;

/**
 * Lettres pleines devant · animation derrière uniquement.
 * Padding pour éviter que le A soit rogné (leading serré / overflow).
 */
export function NotaMark({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={`inline-block text-ink ${className}`}>NOTA</span>;
  }

  return (
    <motion.span
      className={`nota-mark relative inline-block overflow-visible ${className}`}
      aria-label="NOTA"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: easePremium }}
    >
      {/* === Couche animation (derrière) === */}
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
        {/* Plaque de lumière douce derrière le mot */}
        <motion.span
          className="absolute left-1/2 top-1/2 h-[85%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-[40%]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.08) 45%, transparent 72%)",
          }}
          animate={{ opacity: [0.45, 0.75, 0.45], scale: [0.98, 1.04, 0.98] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bande specular qui passe derrière les lettres */}
        <motion.span
          className="absolute inset-y-0 w-[22%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-sky-400/35 to-transparent"
          animate={{ left: ["-30%", "110%"] }}
          transition={{
            duration: 3.2,
            delay: 1.2,
            repeat: Infinity,
            repeatDelay: 3.8,
            ease: [0.45, 0, 0.25, 1],
          }}
        />
      </span>

      {/* === Lettres solides (devant) === */}
      <span className="relative z-10 inline-flex text-ink" aria-hidden>
        {LETTERS.map((letter, i) => (
          <motion.span
            key={letter}
            className="inline-block"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.15 + i * 0.06,
              ease: easePremium,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}

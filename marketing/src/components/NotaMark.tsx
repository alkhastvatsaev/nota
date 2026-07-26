"use client";

import { motion, useReducedMotion } from "framer-motion";

const LETTERS = ["N", "O", "T", "A"] as const;

const easePremium = [0.22, 1, 0.36, 1] as const;

/**
 * Marque NOTA premium — entrée raffinée + shimmer lent type métal / lumière.
 * Pas de bounce, pas de bloom flou.
 */
export function NotaMark({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={`inline-block text-ink ${className}`}>NOTA</span>;
  }

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      aria-label="NOTA"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.span
        className="relative inline-flex"
        aria-hidden
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.15, delay: 0.12, ease: easePremium }}
      >
        {LETTERS.map((letter, i) => (
          <motion.span
            key={letter}
            className="nota-premium-letter relative inline-block"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.18 + i * 0.07,
              ease: easePremium,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>

      {/* Specular — fine bande de lumière qui traverse (luxe, lent) */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-[12%] -left-1/4 w-1/4 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent mix-blend-soft-light"
        animate={{ left: ["-35%", "110%"] }}
        transition={{
          duration: 2.8,
          delay: 1.4,
          repeat: Infinity,
          repeatDelay: 4.5,
          ease: [0.45, 0, 0.25, 1],
        }}
      />
    </motion.span>
  );
}

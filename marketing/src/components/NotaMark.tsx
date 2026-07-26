"use client";

import { motion, useReducedMotion } from "framer-motion";

const LETTERS = ["N", "O", "T", "A"] as const;

/**
 * Animation marque NOTA — visible, propre, sans bloom flou.
 * Entrée lettre par lettre + shimmer sur le remplissage + léger souffle.
 */
export function NotaMark({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={`inline-block text-ink ${className}`}>NOTA</span>;
  }

  return (
    <span className={`relative inline-block ${className}`} aria-label="NOTA">
      <span className="relative inline-flex" aria-hidden>
        {LETTERS.map((letter, i) => (
          <motion.span
            key={letter}
            className="nota-live-letter relative inline-block"
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: 1,
              y: [0, -4, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] },
              y: {
                duration: 2.8,
                delay: 0.85 + i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>

      {/* Scan line sous le mot — trait net 1px */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 left-0 h-px w-full overflow-hidden"
      >
        <motion.span
          className="absolute inset-y-0 left-0 w-1/3 bg-accent"
          animate={{ x: ["-120%", "320%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.6 }}
        />
      </motion.span>
    </span>
  );
}

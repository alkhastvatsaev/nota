"use client";

import { motion, useReducedMotion } from "framer-motion";

const LETTERS = ["N", "O", "T", "A"] as const;

/** Contour net 1px autour des lettres — sans glow / blur. */
export function NotaMark({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative inline-flex items-baseline tracking-tight">
        {LETTERS.map((letter, i) => (
          <motion.span
            key={letter}
            className={reduce ? "inline-block text-ink" : "nota-edge-letter inline-block text-ink"}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 18,
              delay: 0.08 + i * 0.04,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

const easePremium = [0.22, 1, 0.36, 1] as const;

/**
 * Animation sur le contour des lettres (stroke SVG qui court le long du tracé).
 * Remplissage plein devant — la lumière ne remplit pas les glyphes.
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easePremium }}
    >
      <svg
        className="nota-mark-svg block h-[1em] w-auto overflow-visible text-ink"
        viewBox="0 0 640 160"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Contour animé — sous le fill */}
        <text
          className="nota-contour"
          x="12"
          y="118"
          fontFamily="Open Sans, Arial, Helvetica, sans-serif"
          fontSize="132"
          fontWeight="700"
          letterSpacing="-4"
        >
          NOTA
        </text>
        {/* Lettres pleines devant */}
        <text
          className="nota-fill"
          x="12"
          y="118"
          fill="currentColor"
          fontFamily="Open Sans, Arial, Helvetica, sans-serif"
          fontSize="132"
          fontWeight="700"
          letterSpacing="-4"
        >
          NOTA
        </text>
      </svg>
    </motion.span>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

const LETTERS = ["N", "O", "T", "A"] as const;

/** Halo + shimmer discrets autour du mot-marque — ton IA, élégant. */
export function NotaMark({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <span className={`relative inline-block ${className}`}>
      {!reduce ? (
        <>
          {/* Soft neural glow — barely there */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(29,78,216,0.16) 0%, rgba(29,78,216,0.05) 42%, transparent 70%)",
              filter: "blur(18px)",
            }}
            animate={{ opacity: [0.35, 0.55, 0.35], scale: [0.98, 1.03, 0.98] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Thin orbital sparks */}
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/50"
              style={{ boxShadow: "0 0 6px rgba(29,78,216,0.35)" }}
              animate={{
                x: [
                  Math.cos((i / 4) * Math.PI * 2) * 58,
                  Math.cos((i / 4) * Math.PI * 2 + Math.PI) * 72,
                  Math.cos((i / 4) * Math.PI * 2 + Math.PI * 2) * 58,
                ],
                y: [
                  Math.sin((i / 4) * Math.PI * 2) * 28,
                  Math.sin((i / 4) * Math.PI * 2 + Math.PI) * 36,
                  Math.sin((i / 4) * Math.PI * 2 + Math.PI * 2) * 28,
                ],
                opacity: [0.15, 0.55, 0.15],
              }}
              transition={{
                duration: 9 + i * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.35,
              }}
            />
          ))}
        </>
      ) : null}

      <span className="relative inline-flex items-baseline tracking-tight" aria-hidden={false}>
        {LETTERS.map((letter, i) => (
          <motion.span
            key={letter}
            className="nota-shimmer-letter relative inline-block"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 18,
              delay: 0.08 + i * 0.05,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>

      {!reduce ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-[18%] left-0 w-[28%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent"
          animate={{ left: ["-20%", "110%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3.2 }}
        />
      ) : null}
    </span>
  );
}

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const columns = [
  { stage: "Prospect", items: ["Northwind", "Helio"] },
  { stage: "Échange", items: ["Cedar", "Atlas"] },
  { stage: "Offre", items: ["Orbit"] },
  { stage: "Signé", items: ["Lumen"] },
];

export function ProductStage() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const rotateX = useTransform(smooth, [0.1, 0.45, 0.75], reduce ? [0, 0, 0] : [14, 0, -4]);
  const scale = useTransform(smooth, [0.1, 0.45, 0.8], reduce ? [1, 1, 1] : [0.88, 1.02, 0.98]);
  const y = useTransform(smooth, [0.1, 0.5], reduce ? [0, 0] : [60, 0]);
  const glow = useTransform(smooth, [0.2, 0.5], [0.35, 1]);

  return (
    <section
      ref={ref}
      id="produit"
      className="relative bg-mist py-20 sm:py-28"
      aria-labelledby="produit-heading"
    >
      <h2
        id="produit-heading"
        className="mb-8 text-center font-display text-[clamp(1.5rem,4vw,2.25rem)] tracking-tight text-ink sm:mb-10"
      >
        Votre pipeline commercial.
      </h2>

      <div
        className="mx-auto flex max-w-5xl justify-center px-6 sm:px-10"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          style={{
            rotateX,
            scale,
            y,
            opacity: glow,
            transformStyle: "preserve-3d",
          }}
          className="w-full max-w-3xl origin-center will-change-transform"
        >
          <div className="overflow-hidden rounded-[1.75rem] border border-line bg-gradient-to-br from-sky-soft via-mist to-void shadow-[0_40px_100px_rgba(37,99,235,0.18)]">
            <div className="flex items-center gap-2 border-b border-line/80 bg-void/70 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-4 sm:p-6">
              {columns.map((col, i) => (
                <motion.div
                  key={col.stage}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.08 + i * 0.07,
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                  }}
                  className="rounded-2xl border border-line/80 bg-void/90 p-3"
                >
                  <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-mute">
                    {col.stage}
                  </p>
                  <div className="space-y-2">
                    {col.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-line bg-mist px-3 py-2.5 text-xs text-ink"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

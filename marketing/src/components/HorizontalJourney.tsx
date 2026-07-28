import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLocale } from "../i18n/LocaleContext";

export function HorizontalJourney() {
  const reduce = useReducedMotion();
  const { t } = useLocale();
  const chapters = t.journey;

  if (reduce) {
    return (
      <section id="voyage" className="bg-void px-6 py-16 sm:px-10" aria-label={t.journeyAria}>
        <div className="mx-auto flex max-w-md flex-col gap-10">
          {chapters.map((chapter, i) => (
            <div key={chapter.title} className="text-center">
              <p className="text-xs tracking-[0.28em] text-accent uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
                {chapter.title}
              </h2>
              <p className="mt-2 text-base text-mute">{chapter.line}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return <ScrollJourney chapters={chapters} ariaLabel={t.journeyAria} />;
}

function ScrollJourney({
  chapters,
  ariaLabel,
}: {
  chapters: { title: string; line: string }[];
  ariaLabel: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });
  const x = useTransform(smooth, [0, 1], ["0%", "-66.666%"]);

  return (
    <section id="voyage" ref={ref} className="relative bg-void" aria-label={ariaLabel}>
      <div className="h-[180vh]">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <motion.div style={{ x }} className="flex w-[300vw]">
            {chapters.map((chapter, i) => (
              <div
                key={chapter.title}
                className="flex h-svh w-screen flex-col items-center justify-center px-6 text-center sm:px-10"
              >
                <motion.span
                  className="font-display text-sm tracking-[0.35em] text-accent uppercase"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.55 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                <motion.h2
                  className="mt-3 font-display text-[clamp(2.5rem,11vw,7rem)] leading-[0.9] tracking-tight text-ink"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {chapter.title}
                </motion.h2>
                <motion.p
                  className="mt-5 max-w-sm text-base text-mute sm:text-lg"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ delay: 0.06, duration: 0.4 }}
                >
                  {chapter.line}
                </motion.p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

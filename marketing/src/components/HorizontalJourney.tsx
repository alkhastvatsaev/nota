import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/** Clair pour tout le monde — ni jargon, ni phrases vides. */
const chapters = [
  { title: "Noter", line: "Ce que le client a dit, gardé." },
  { title: "Suivre", line: "Voir où en est chaque affaire." },
  { title: "Rappeler", line: "Qui relancer, et quand." },
];

export function HorizontalJourney() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (reduce || !isDesktop) {
    return (
      <section
        id="voyage"
        className="bg-void px-6 py-16 sm:px-10"
        aria-label="Comment Nota fonctionne"
      >
        <div className="mx-auto flex max-w-md flex-col gap-10">
          {chapters.map((chapter, i) => (
            <motion.div
              key={chapter.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.06 }}
              className="text-center"
            >
              <p className="text-xs tracking-[0.28em] text-accent uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
                {chapter.title}
              </h2>
              <p className="mt-2 text-base text-mute">{chapter.line}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return <DesktopJourney />;
}

function DesktopJourney() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });
  const x = useTransform(smooth, [0, 1], ["0%", "-66.666%"]);

  return (
    <section
      id="voyage"
      ref={ref}
      className="relative bg-void"
      aria-label="Comment Nota fonctionne"
    >
      <div className="h-[180vh]">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <motion.div style={{ x }} className="flex w-[300vw]">
            {chapters.map((chapter, i) => (
              <div
                key={chapter.title}
                className="flex h-svh w-screen flex-col items-center justify-center px-10 text-center"
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
                  className="mt-3 font-display text-[clamp(3rem,11vw,7rem)] leading-[0.9] tracking-tight text-ink"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {chapter.title}
                </motion.h2>
                <motion.p
                  className="mt-5 max-w-sm text-lg text-mute"
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

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

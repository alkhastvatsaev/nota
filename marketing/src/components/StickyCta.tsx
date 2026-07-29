import { useEffect, useState } from "react";
import { OpenNotaLink } from "./OpenNotaLink";

type StickyCtaProps = {
  /** Désactive totalement (ex. page Contact = le formulaire est l’action). */
  disabled?: boolean;
};

/**
 * Mobile only: barre CTA après le hero, masquée près d’un CTA principal / footer.
 */
export function StickyCta({ disabled = false }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (disabled) {
      setVisible(false);
      return;
    }
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 768px)").matches) return;

    const hero = document.getElementById("top");
    const footer = document.querySelector("footer");
    const primaryCtAs = Array.from(document.querySelectorAll<HTMLElement>('[data-cta="primary"]'));

    let heroPast = false;
    let coverVisible = false;

    const update = () => {
      setVisible(heroPast && !coverVisible);
    };

    const heroObs = hero
      ? new IntersectionObserver(
          ([entry]) => {
            heroPast = !entry.isIntersecting || entry.intersectionRatio < 0.35;
            update();
          },
          { threshold: [0, 0.35, 1] }
        )
      : null;

    if (hero && heroObs) heroObs.observe(hero);

    const coverObs = new IntersectionObserver(
      (entries) => {
        coverVisible = entries.some((e) => e.isIntersecting && e.intersectionRatio > 0.1);
        update();
      },
      { threshold: [0, 0.1, 0.4], rootMargin: "0px 0px -8% 0px" }
    );

    primaryCtAs.forEach((el) => {
      if (el.closest("[data-sticky-cta]")) return;
      coverObs.observe(el);
    });
    if (footer) coverObs.observe(footer);

    if (!hero) {
      const onScroll = () => {
        // Plus patient hors home : évite le sticky trop tôt sur pages SEO
        heroPast = window.scrollY > 420;
        update();
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        coverObs.disconnect();
        heroObs?.disconnect();
      };
    }

    return () => {
      coverObs.disconnect();
      heroObs?.disconnect();
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div
      data-sticky-cta
      className={[
        "fixed inset-x-0 bottom-0 z-[55] border-t border-line/80 bg-void/95 p-3 backdrop-blur-md transition duration-300 md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      ].join(" ")}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <OpenNotaLink
        variant="primary"
        utmContent="sticky"
        className="w-full rounded-full bg-accent py-3.5 text-sm text-on-accent shadow-[0_8px_24px_rgba(29,78,216,0.28)] transition active:bg-accent-deep"
      />
    </div>
  );
}

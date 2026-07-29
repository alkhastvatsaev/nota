type HeroNotaTitleProps = {
  reduceMotion: boolean;
};

/**
 * HTML wordmark (same font as the rest of the site).
 * Soft sweep via background-clip; -webkit-text-stroke seals Safari hairline cracks.
 */
export function HeroNotaTitle({ reduceMotion }: HeroNotaTitleProps) {
  return (
    <span className={reduceMotion ? "hero-nota hero-nota--static" : "hero-nota"} aria-hidden>
      NOTA
    </span>
  );
}

type HeroNotaTitleProps = {
  reduceMotion: boolean;
};

/**
 * Glyphs stay solid ink (never gradient-filled — Safari/SVG tears strokes).
 * Shine is a soft light beam blended on top, sweeping outside→outside.
 */
export function HeroNotaTitle({ reduceMotion }: HeroNotaTitleProps) {
  return (
    <span className={reduceMotion ? "hero-nota hero-nota--static" : "hero-nota"} aria-hidden>
      <span className="hero-nota__ink">NOTA</span>
      {!reduceMotion && <span className="hero-nota__beam" aria-hidden />}
    </span>
  );
}

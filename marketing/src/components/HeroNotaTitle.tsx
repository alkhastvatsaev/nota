type HeroNotaTitleProps = {
  reduceMotion: boolean;
};

/**
 * Glyphs are always solid ink — no background-clip / SVG gradient fill
 * (those tear letter joins on Safari). Soft glow sweeps behind the word.
 */
export function HeroNotaTitle({ reduceMotion }: HeroNotaTitleProps) {
  return (
    <span className={reduceMotion ? "hero-nota hero-nota--static" : "hero-nota"} aria-hidden>
      {!reduceMotion && <span className="hero-nota__glow" />}
      <span className="hero-nota__ink">NOTA</span>
    </span>
  );
}

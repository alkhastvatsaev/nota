type HeroNotaTitleProps = {
  reduceMotion: boolean;
};

/**
 * Solid HTML wordmark — one text node "NOTA" (no SVG text).
 * Soft halo sweeps behind glyphs only; letter fill stays solid ink so Safari
 * cannot tear glyphs or invent a gap between T and A.
 */
export function HeroNotaTitle({ reduceMotion }: HeroNotaTitleProps) {
  return (
    <span className={reduceMotion ? "hero-nota hero-nota--static" : "hero-nota"} aria-hidden>
      {!reduceMotion && <span className="hero-nota__halo" />}
      <span className="hero-nota__ink">NOTA</span>
    </span>
  );
}

type HeroNotaTitleProps = {
  reduceMotion: boolean;
};

/**
 * Strategy A: solid navy wordmark + soft halo sweeping behind (never paints the glyphs).
 */
export function HeroNotaTitle({ reduceMotion }: HeroNotaTitleProps) {
  return (
    <span className={reduceMotion ? "hero-nota hero-nota--static" : "hero-nota"} aria-hidden>
      {!reduceMotion && <span className="hero-nota__halo" />}
      <span className="hero-nota__ink">NOTA</span>
    </span>
  );
}

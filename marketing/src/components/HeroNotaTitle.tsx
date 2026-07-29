type HeroNotaTitleProps = {
  reduceMotion: boolean;
};

/**
 * Two stacked text layers (CSS grid, same cell):
 * 1. Solid ink — always full glyphs
 * 2. Shine — gradient clipped to letter shapes only (not a blob on top)
 */
export function HeroNotaTitle({ reduceMotion }: HeroNotaTitleProps) {
  return (
    <span className={reduceMotion ? "hero-nota hero-nota--static" : "hero-nota"} aria-hidden>
      <span className="hero-nota__ink">NOTA</span>
      {!reduceMotion && <span className="hero-nota__shine">NOTA</span>}
    </span>
  );
}

type HeroNotaTitleProps = {
  reduceMotion: boolean;
};

/**
 * Single text layer — solid-ink gradient only (no double-layer blend).
 * Transparent stops + mix-blend caused jagged edges and a black A corner on Safari.
 */
export function HeroNotaTitle({ reduceMotion }: HeroNotaTitleProps) {
  return (
    <span className={reduceMotion ? "hero-nota hero-nota--static" : "hero-nota"} aria-hidden>
      NOTA
    </span>
  );
}

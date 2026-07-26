import { useReducedMotion } from "framer-motion";

/**
 * Marque NOTA — fill plein, contour fin, brillance qui court sur l’extérieur.
 */
export function NotaMark({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={`inline-block text-ink ${className}`}>NOTA</span>;
  }

  const textProps = {
    x: 20,
    y: 128,
    fontFamily: "Open Sans, Arial, Helvetica, sans-serif",
    fontSize: 132,
    fontWeight: 700,
    letterSpacing: -4,
  } as const;

  return (
    <span className={`nota-mark relative inline-block overflow-visible ${className}`} aria-hidden>
      <svg
        className="nota-mark-svg block h-[1em] w-auto overflow-visible text-ink"
        viewBox="0 0 680 170"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Contour de base — fin, toujours visible */}
        <text className="nota-contour-base" {...textProps}>
          NOTA
        </text>
        {/* Specular — tiret lumineux le long du tracé (extérieur) */}
        <text className="nota-contour-shine" {...textProps}>
          NOTA
        </text>
        {/* Lettres pleines devant — la lumière ne remplit pas les glyphes */}
        <text className="nota-fill" fill="currentColor" {...textProps}>
          NOTA
        </text>
      </svg>
    </span>
  );
}

import { useReducedMotion } from "framer-motion";

/**
 * Marque NOTA — fill plein, contour fin.
 * Une “lampe” traverse gauche → droite et n’éclaire que le contour
 * (masque CSS, fiable Safari).
 */
export function NotaMark({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <span className={`nota-mark ${className}`}>
      {/* Contour de base — toujours visible */}
      <span className="nota-mark-stroke nota-mark-stroke--base" aria-hidden>
        NOTA
      </span>

      {/* Contour éclairé — seulement sous le faisceau */}
      {!reduce && (
        <span className="nota-mark-stroke nota-mark-stroke--lit" aria-hidden>
          NOTA
        </span>
      )}

      {/* Fill plein devant — la lumière ne touche jamais l’intérieur */}
      <span className="nota-mark-fill" aria-hidden>
        NOTA
      </span>
    </span>
  );
}

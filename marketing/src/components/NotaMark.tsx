import { useId } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Marque NOTA — fill plein, contour fin.
 * Une “lampe” traverse gauche → droite et n’éclaire que le contour.
 */
export function NotaMark({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const lampGradId = `nota-lamp-${uid}`;
  const lampMaskId = `nota-lamp-mask-${uid}`;

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
        <defs>
          {/* Faisceau doux : noir (caché) → blanc (éclairé) → noir */}
          <linearGradient
            id={lampGradId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="200"
            y2="0"
          >
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="32%" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#fff" stopOpacity="1" />
            <stop offset="68%" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          <mask id={lampMaskId} maskUnits="userSpaceOnUse" x="-40" y="-20" width="760" height="210">
            <g className="nota-lamp-beam">
              <rect x="-200" y="-20" width="200" height="210" fill={`url(#${lampGradId})`} />
            </g>
          </mask>
        </defs>

        {/* Contour de base — discret, toujours là */}
        <text className="nota-contour-base" {...textProps}>
          NOTA
        </text>

        {/* Contour éclairé — visible seulement sous le faisceau */}
        <text className="nota-contour-lit" mask={`url(#${lampMaskId})`} {...textProps}>
          NOTA
        </text>

        {/* Fill plein devant — la lumière ne touche jamais l’intérieur */}
        <text className="nota-fill" fill="currentColor" {...textProps}>
          NOTA
        </text>
      </svg>
    </span>
  );
}

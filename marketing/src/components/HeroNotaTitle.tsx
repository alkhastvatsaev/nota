type HeroNotaTitleProps = {
  reduceMotion: boolean;
};

/**
 * Strategy B: solid ink glyphs + soft light beam masked to letter shapes.
 * Letter fill is never an animated gradient (avoids Safari glyph tears).
 */
export function HeroNotaTitle({ reduceMotion }: HeroNotaTitleProps) {
  return (
    <svg
      className="hero-nota-svg"
      viewBox="0 0 320 128"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="hero-nota-beam"
          gradientUnits="userSpaceOnUse"
          x1="-420"
          y1="64"
          x2="60"
          y2="64"
        >
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0" />
          <stop offset="32%" stopColor="#93c5fd" stopOpacity="0" />
          <stop offset="42%" stopColor="#60a5fa" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#dbeafe" stopOpacity="0.85" />
          <stop offset="58%" stopColor="#60a5fa" stopOpacity="0.55" />
          <stop offset="68%" stopColor="#93c5fd" stopOpacity="0" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
          {!reduceMotion && (
            <>
              <animate
                attributeName="x1"
                dur="7s"
                repeatCount="indefinite"
                values="-420;280"
                calcMode="spline"
                keySplines="0.37 0 0.63 1"
                keyTimes="0;1"
              />
              <animate
                attributeName="x2"
                dur="7s"
                repeatCount="indefinite"
                values="60;760"
                calcMode="spline"
                keySplines="0.37 0 0.63 1"
                keyTimes="0;1"
              />
            </>
          )}
        </linearGradient>

        <mask id="hero-nota-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="128">
          <rect width="320" height="128" fill="#000" />
          <text
            x="160"
            y="98"
            textAnchor="middle"
            fill="#fff"
            fontFamily="Open Sans, Arial, Helvetica, sans-serif"
            fontSize="82"
            fontWeight="700"
            letterSpacing="-1.2"
          >
            NOTA
          </text>
        </mask>
      </defs>

      {/* Base — solid ink only */}
      <text
        x="160"
        y="98"
        textAnchor="middle"
        fill="#0b1f3a"
        fontFamily="Open Sans, Arial, Helvetica, sans-serif"
        fontSize="82"
        fontWeight="700"
        letterSpacing="-1.2"
      >
        NOTA
      </text>

      {/* Light inside letter shapes only */}
      {!reduceMotion && (
        <rect
          x="0"
          y="0"
          width="320"
          height="128"
          fill="url(#hero-nota-beam)"
          mask="url(#hero-nota-mask)"
        />
      )}
    </svg>
  );
}

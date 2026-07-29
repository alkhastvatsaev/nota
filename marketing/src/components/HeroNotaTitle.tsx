type HeroNotaTitleProps = {
  reduceMotion: boolean;
};

/**
 * Specular sweep: wide soft band travels fully past the glyphs so the loop
 * fades in/out outside the word (seamless restart while letters are solid navy).
 */
export function HeroNotaTitle({ reduceMotion }: HeroNotaTitleProps) {
  const fill = reduceMotion ? "#0b1f3a" : "url(#hero-nota-grad)";

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
          id="hero-nota-grad"
          gradientUnits="userSpaceOnUse"
          x1="-480"
          y1="64"
          x2="0"
          y2="64"
        >
          {/* Wide soft band — peak ~20% of the gradient length, not a thin neon spike */}
          <stop offset="0%" stopColor="#0b1f3a" />
          <stop offset="18%" stopColor="#0b1f3a" />
          <stop offset="32%" stopColor="#122a4d" />
          <stop offset="40%" stopColor="#1e3a8a" />
          <stop offset="46%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="54%" stopColor="#2563eb" />
          <stop offset="60%" stopColor="#1e3a8a" />
          <stop offset="68%" stopColor="#122a4d" />
          <stop offset="82%" stopColor="#0b1f3a" />
          <stop offset="100%" stopColor="#0b1f3a" />
          {!reduceMotion && (
            <>
              {/* One-way sweep: start left of N, end right of A → both ends = solid ink */}
              <animate
                attributeName="x1"
                dur="12s"
                repeatCount="indefinite"
                values="-480;320"
                calcMode="spline"
                keySplines="0.42 0 0.58 1"
                keyTimes="0;1"
              />
              <animate
                attributeName="x2"
                dur="12s"
                repeatCount="indefinite"
                values="0;800"
                calcMode="spline"
                keySplines="0.42 0 0.58 1"
                keyTimes="0;1"
              />
            </>
          )}
        </linearGradient>
      </defs>
      <text
        x="160"
        y="98"
        textAnchor="middle"
        dominantBaseline="alphabetic"
        fill={fill}
        fontFamily="Open Sans, Arial, Helvetica, sans-serif"
        fontSize="82"
        fontWeight="700"
        letterSpacing="-1.2"
      >
        NOTA
      </text>
    </svg>
  );
}

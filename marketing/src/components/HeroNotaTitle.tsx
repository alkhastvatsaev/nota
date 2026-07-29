type HeroNotaTitleProps = {
  reduceMotion: boolean;
};

/** Wordmark sized like former clamp(3.25rem,13vw,9rem) text — height drives scale. */
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
          x1="0"
          y1="60"
          x2="320"
          y2="60"
        >
          <stop offset="0%" stopColor="#0b1f3a" />
          <stop offset="32%" stopColor="#0b1f3a" />
          <stop offset="42%" stopColor="#1e40af" />
          <stop offset="48%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="52%" stopColor="#2563eb" />
          <stop offset="58%" stopColor="#1e40af" />
          <stop offset="68%" stopColor="#0b1f3a" />
          <stop offset="100%" stopColor="#0b1f3a" />
          {!reduceMotion && (
            <>
              <animate
                attributeName="x1"
                dur="10s"
                repeatCount="indefinite"
                values="-80;0;80"
                calcMode="spline"
                keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                keyTimes="0;0.5;1"
              />
              <animate
                attributeName="x2"
                dur="10s"
                repeatCount="indefinite"
                values="240;320;400"
                calcMode="spline"
                keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                keyTimes="0;0.5;1"
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

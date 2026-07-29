type HeroNotaTitleProps = {
  reduceMotion: boolean;
};

export function HeroNotaTitle({ reduceMotion }: HeroNotaTitleProps) {
  const fill = reduceMotion ? "#0b1f3a" : "url(#hero-nota-grad)";

  return (
    <svg
      className="hero-nota-svg"
      viewBox="0 0 520 112"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="hero-nota-grad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="48"
          x2="520"
          y2="48"
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
                values="-120;0;120"
                calcMode="spline"
                keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                keyTimes="0;0.5;1"
              />
              <animate
                attributeName="x2"
                dur="10s"
                repeatCount="indefinite"
                values="320;520;720"
                calcMode="spline"
                keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                keyTimes="0;0.5;1"
              />
            </>
          )}
        </linearGradient>
      </defs>
      <text x="12" y="86" fill={fill} className="hero-nota-svg-text">
        NOTA
      </text>
    </svg>
  );
}

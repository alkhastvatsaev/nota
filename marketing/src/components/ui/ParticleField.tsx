import { useEffect, useRef } from "react";

/** Particles light — pause hors viewport pour perf CPU. */
export function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let visible = true;
    let raf = 0;
    let particles: Array<{
      x: number;
      y: number;
      speed: number;
      opacity: number;
      fadeDelay: number;
      fadeStart: number;
      fadingOut: boolean;
    }> = [];

    const setSize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const count = () => {
      const area = canvas.clientWidth * canvas.clientHeight;
      return Math.min(48, Math.max(12, Math.floor(area / 18000)));
    };

    const make = () => {
      const fadeDelay = Math.random() * 600 + 100;
      return {
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        speed: Math.random() / 5 + 0.08,
        opacity: 0.55,
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
      };
    };

    const reset = (p: (typeof particles)[number]) => {
      p.x = Math.random() * canvas.clientWidth;
      p.y = Math.random() * canvas.clientHeight;
      p.speed = Math.random() / 5 + 0.08;
      p.opacity = 0.55;
      p.fadeDelay = Math.random() * 600 + 100;
      p.fadeStart = Date.now() + p.fadeDelay;
      p.fadingOut = false;
    };

    const init = () => {
      particles = Array.from({ length: count() }, make);
    };

    const draw = () => {
      if (!visible) {
        raf = 0;
        return;
      }
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      const now = Date.now();
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < 0) reset(p);
        if (!p.fadingOut && now > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.01;
          if (p.opacity <= 0) reset(p);
        }
        ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 0.7, 1.5);
      }
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const next = entry?.isIntersecting ?? true;
        if (next === visible) return;
        visible = next;
        if (!visible) {
          cancelAnimationFrame(raf);
          raf = 0;
          ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        } else if (!raf) {
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    setSize();
    init();
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-30 ${className}`}
      aria-hidden
    />
  );
}

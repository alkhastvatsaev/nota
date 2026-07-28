import { OpenNotaLink } from "./OpenNotaLink";

export function StickyCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-line/80 bg-void/95 p-3 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <OpenNotaLink
        variant="primary"
        className="w-full rounded-full bg-accent py-3.5 text-sm text-on-accent shadow-[0_8px_24px_rgba(29,78,216,0.28)] transition active:bg-accent-deep"
      />
    </div>
  );
}

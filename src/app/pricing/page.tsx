import Link from "next/link";
import { PricingLanding } from "@/features/subscriptions";
import NotaLockMark from "@/features/subscriptions/components/NotaLockMark";

export default function PricingPage() {
  return (
    <main className="min-h-dvh overflow-y-auto bg-[radial-gradient(circle_at_top,#f8fafc_0,#fff_42%,#f8fafc_100%)] font-[family-name:var(--font-outfit)] text-slate-950">
      <header>
        <div className="mx-auto flex max-w-5xl justify-center px-4 py-4 sm:px-6">
          <Link href="/" aria-label="NOTA" className="inline-flex shrink-0">
            <NotaLockMark className="h-12 w-10" />
          </Link>
        </div>
      </header>

      <section className="px-4 pb-10 pt-2 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_30px_90px_-60px_rgba(2,6,23,0.55)] backdrop-blur sm:p-10">
          <PricingLanding />
        </div>
      </section>
    </main>
  );
}

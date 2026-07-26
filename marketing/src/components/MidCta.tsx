import { OpenNotaLink } from "./OpenNotaLink";

/** Rappel CTA après le produit. */
export function MidCta() {
  return (
    <section
      className="bg-void px-6 py-12 text-center sm:px-10 sm:py-14"
      aria-label="Accéder à Nota"
    >
      <p className="font-display text-xl tracking-tight text-ink sm:text-2xl">
        Essayez Nota — sans créer de compte.
      </p>
      <p className="mt-2 text-sm text-mute">Sans inscription · Accès immédiat</p>
      <div className="mt-6 hidden justify-center md:flex">
        <OpenNotaLink
          variant="primary"
          className="rounded-full bg-accent px-8 py-4 text-sm text-on-accent transition hover:bg-accent-deep"
        />
      </div>
    </section>
  );
}

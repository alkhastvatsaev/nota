type Shot = {
  src: string;
  alt: string;
  caption: string;
};

const SHOTS: Shot[] = [
  {
    src: "/product/carte.png",
    alt: "Carte des interventions Nota — vue des missions sur le terrain",
    caption: "Carte des missions",
  },
  {
    src: "/product/interventions.png",
    alt: "Liste et dossiers d’interventions Nota",
    caption: "Dossiers interventions",
  },
  {
    src: "/product/facturation.png",
    alt: "Hub facturation Nota lié aux interventions",
    caption: "Facturation",
  },
];

type ProductProofGalleryProps = {
  id?: string;
  title?: string;
};

export function ProductProofGallery({
  id = "apercu-produit",
  title = "Aperçu du produit",
}: ProductProofGalleryProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-10">
      <h2 id={`${id}-heading`} className="font-display text-xl tracking-tight text-ink">
        {title}
      </h2>
      <p className="mt-2 text-sm text-mute">
        Captures réelles de l’application Nota — carte, dossiers et facturation.
      </p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-3">
        {SHOTS.map((shot) => (
          <li key={shot.src} className="overflow-hidden rounded-2xl border border-line bg-mist">
            <img
              src={shot.src}
              alt={shot.alt}
              width={640}
              height={400}
              loading="lazy"
              decoding="async"
              className="h-auto w-full border-b border-line"
            />
            <p className="px-3 py-2 text-center text-xs text-mute">{shot.caption}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

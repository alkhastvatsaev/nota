import { useLocale } from "../i18n/LocaleContext";

type ProductProofGalleryProps = {
  id?: string;
  title?: string;
};

export function ProductProofGallery({ id = "apercu-produit", title }: ProductProofGalleryProps) {
  const { t } = useLocale();
  const heading = title ?? t.galleryTitle;

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-10">
      <h2 id={`${id}-heading`} className="font-display text-xl tracking-tight text-ink">
        {heading}
      </h2>
      <p className="mt-2 text-sm text-mute">{t.galleryLead}</p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-3">
        {t.galleryShots.map((shot) => (
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

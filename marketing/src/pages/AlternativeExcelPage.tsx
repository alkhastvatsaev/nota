import { Link } from "react-router-dom";
import { SeoPageLayout } from "../components/SeoPageLayout";

export function AlternativeExcelPage() {
  return (
    <SeoPageLayout
      eyebrow="Alternative Excel commercial"
      title="Vous méritez mieux qu’un tableur"
      lead="Votre temps vaut plus qu’une mauvaise version de fichier."
    >
      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">Ce qui vous freine</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Plusieurs fichiers, plusieurs vérités</li>
          <li>Relances qui glissent</li>
          <li>Partage d’équipe fragile</li>
          <li>Vue d’ensemble qui se perd</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">
          Ce que vous gardez avec Nota
        </h2>
        <p className="mt-3">
          Vos affaires sous les yeux : étapes claires, notes intactes, prochaine action visible —
          sans tableur à maintenir.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">Pour vous</h2>
        <p className="mt-3">
          Si vous vendez en relationnel et que vous en avez assez des pastilles de couleur dans une
          feuille.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">À votre rythme</h2>
        <p className="mt-3">
          Pas besoin de tout migrer le jour 1. Ouvrez Nota, notez ce qui compte, avancez.{" "}
          <Link
            to="/crm-sans-inscription"
            className="text-accent underline-offset-2 hover:underline"
          >
            CRM sans inscription
          </Link>
          .
        </p>
      </section>
    </SeoPageLayout>
  );
}

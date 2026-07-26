import { Link } from "react-router-dom";
import { SeoPageLayout } from "../components/SeoPageLayout";

export function AlternativeExcelPage() {
  return (
    <SeoPageLayout
      eyebrow="Alternative Excel commercial"
      title="Remplacez le tableur par un vrai suivi client"
      lead="Excel marche… jusqu’à la mauvaise version, la colonne oubliée, ou la relance ratée."
    >
      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">Le frein Excel</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Plusieurs fichiers, plusieurs vérités</li>
          <li>Peu de rappels de relance fiables</li>
          <li>Partage d’équipe fragile</li>
          <li>Pipeline qui devient illisible</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">Nota à la place</h2>
        <p className="mt-3">
          Étapes claires (prospect → échange → offre → signé), notes gardées, prochaine action
          visible — sans tableur à maintenir.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">Pour qui</h2>
        <p className="mt-3">
          Freelances, TPE et PME qui vendent en relationnel et en ont assez des pastilles de couleur
          dans une feuille.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">Sans friction</h2>
        <p className="mt-3">
          Pas besoin de tout migrer le jour 1. Ouvrez Nota, créez vos deals actifs, avancez.{" "}
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

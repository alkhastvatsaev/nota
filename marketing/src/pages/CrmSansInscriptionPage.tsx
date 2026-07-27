import { SeoPageLayout } from "../components/SeoPageLayout";

export function CrmSansInscriptionPage() {
  return (
    <SeoPageLayout
      eyebrow="CRM sans inscription"
      title="Suivez vos clients sans créer de compte"
      lead="Ouvrez Nota et commencez. Pas d’email. Pas de formulaire."
    >
      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">
          Pourquoi sans inscription ?
        </h2>
        <p className="mt-3">
          Les outils habituels commencent par un compte et un plan. Vous voulez juste noter un
          client et savoir qui rappeler.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">Ce que Nota fait</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Planifier et suivre les interventions (carte, statuts, dossiers)</li>
          <li>Hub technicien mobile : missions, photos, signature</li>
          <li>Notes clients et relances commerciales</li>
          <li>Accès immédiat à l’app, sans inscription sur ce site</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">En 3 gestes</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Ouvrir Nota</li>
          <li>Ajouter un client ou une affaire</li>
          <li>Noter la prochaine relance</li>
        </ol>
      </section>
    </SeoPageLayout>
  );
}

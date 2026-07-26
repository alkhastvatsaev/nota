import { SeoPageLayout } from "../components/SeoPageLayout";

export function CrmSansInscriptionPage() {
  return (
    <SeoPageLayout
      eyebrow="CRM sans inscription"
      title="Un CRM sans compte, sans formulaire"
      lead="Ouvrez Nota et suivez clients, pipeline et relances. Pas d’email. Pas de tunnel d’inscription."
    >
      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">
          Pourquoi un CRM sans inscription ?
        </h2>
        <p className="mt-3">
          La plupart des CRM commencent par un compte et un plan. Vous voulez juste enregistrer un
          client et la prochaine relance.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">Ce que Nota fait</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Fiches clients et historique</li>
          <li>Pipeline : prospect → échange → offre → signé</li>
          <li>Notes et prochaines actions</li>
          <li>Accès immédiat, sans inscription sur ce site</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">En 3 gestes</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Ouvrir Nota</li>
          <li>Ajouter un client ou un deal</li>
          <li>Noter la prochaine relance</li>
        </ol>
      </section>
    </SeoPageLayout>
  );
}

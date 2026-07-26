import { SeoPageLayout } from "../components/SeoPageLayout";

export function CrmSansInscriptionPage() {
  return (
    <SeoPageLayout
      eyebrow="CRM sans inscription"
      title="C’est à vous — sans formulaire"
      lead="Vous voulez suivre vos clients, pas remplir un compte. Ouvrez Nota."
    >
      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">Ce que vous gagnez</h2>
        <p className="mt-3">
          Votre temps. Votre clarté. La suite au bon moment — sans tunnel d’inscription.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">
          Ce que Nota garde pour vous
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Ce qu’on vous confie</li>
          <li>Ce qui mérite votre attention</li>
          <li>La prochaine étape, visible</li>
          <li>Zéro inscription sur ce site</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">Simple, pour vous</h2>
        <p className="mt-3">
          Nota se met à votre place : qui, quoi, prochaine étape. Rien de plus.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl tracking-tight text-ink">En 3 gestes</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Ouvrir Nota</li>
          <li>Noter ce qui compte</li>
          <li>Revenir au bon moment</li>
        </ol>
      </section>
    </SeoPageLayout>
  );
}

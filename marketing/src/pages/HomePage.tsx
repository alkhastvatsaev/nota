import { SmoothScroll } from "../components/SmoothScroll";
import { ProgressRail } from "../components/ProgressRail";
import { HypnoticField } from "../components/HypnoticField";
import { SiteHeader } from "../components/SiteHeader";
import { ImmersiveHero } from "../components/ImmersiveHero";
import { HookLine } from "../components/HookLine";
import { HorizontalJourney } from "../components/HorizontalJourney";
import { ProductStage } from "../components/ProductStage";
import { MidCta } from "../components/MidCta";
import { Footer } from "../components/Footer";
import { StickyCta } from "../components/StickyCta";
import { HomeSeoIntro } from "../components/HomeSeoIntro";
import { OpenNotaLink } from "../components/OpenNotaLink";

export function HomePage() {
  return (
    <SmoothScroll>
      <div className="relative bg-void pb-20 text-ink md:pb-0">
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <OpenNotaLink
          variant="nav"
          utmContent="skip_link"
          className="skip-link skip-link-cta"
          showIcon={false}
        />
        <HypnoticField />
        <ProgressRail />
        {/* Header hors du hero : sticky réel (overflow du hero cassait le sticky). */}
        <SiteHeader brandIsLink={false} />
        <main id="main" className="relative z-10">
          <ImmersiveHero />
          <HookLine />
          <HorizontalJourney />
          <ProductStage />
          <HomeSeoIntro />
          <MidCta />
        </main>
        <Footer />
        <StickyCta />
      </div>
    </SmoothScroll>
  );
}

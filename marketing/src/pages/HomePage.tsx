import { SmoothScroll } from "../components/SmoothScroll";
import { SiteHeader } from "../components/SiteHeader";
import { ImmersiveHero } from "../components/ImmersiveHero";
import { HookLine } from "../components/HookLine";
import { HorizontalJourney } from "../components/HorizontalJourney";
import { ProductStage } from "../components/ProductStage";
import { MidCta } from "../components/MidCta";
import { Footer } from "../components/Footer";
import { StickyCta } from "../components/StickyCta";
import { HomeSeoIntro } from "../components/HomeSeoIntro";
import { useLocale } from "../i18n/LocaleContext";

export function HomePage() {
  const { t } = useLocale();

  return (
    <SmoothScroll>
      <div className="relative bg-void pb-28 text-ink md:pb-0">
        <a href="#main" className="skip-link">
          {t.skipToContent}
        </a>
        {/* Header hors du hero : sticky réel (overflow du hero cassait le sticky). */}
        <SiteHeader brandIsLink={false} showFounder={false} />
        <main id="main" className="relative z-10">
          <ImmersiveHero />
          <HookLine />
          <HorizontalJourney />
          <ProductStage />
          <HomeSeoIntro />
          <MidCta />
        </main>
        <Footer hideFaq />
        <StickyCta />
      </div>
    </SmoothScroll>
  );
}

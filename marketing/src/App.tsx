import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GUIDE_PAGES } from "./content/guides";
import { LANDING_PAGES, LEGACY_PATH_REDIRECTS } from "./content/landing-pages";
import { SeoHead } from "./components/SeoHead";
import { SiteAnalytics } from "./components/SiteAnalytics";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

const CrmSansInscriptionPage = lazy(() =>
  import("./pages/CrmSansInscriptionPage").then((m) => ({
    default: m.CrmSansInscriptionPage,
  }))
);
const AlternativeExcelPage = lazy(() =>
  import("./pages/AlternativeExcelPage").then((m) => ({
    default: m.AlternativeExcelPage,
  }))
);
const MarketingLandingPage = lazy(() =>
  import("./pages/MarketingLandingPage").then((m) => ({
    default: m.MarketingLandingPage,
  }))
);
const GuidePage = lazy(() =>
  import("./pages/GuidePage").then((m) => ({
    default: m.GuidePage,
  }))
);

function PageFallback() {
  return (
    <div
      className="grid min-h-svh place-items-center bg-void text-sm text-mute"
      role="status"
      aria-live="polite"
    >
      Chargement…
    </div>
  );
}

function LegacyRedirect({ from }: { from: string }) {
  const target = LEGACY_PATH_REDIRECTS[from];
  if (!target) return <NotFoundPage />;
  return <Navigate to={target} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SeoHead />
      <SiteAnalytics />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {LANDING_PAGES.map((page) => (
            <Route key={page.path} path={page.path} element={<MarketingLandingPage />} />
          ))}
          {GUIDE_PAGES.map((page) => (
            <Route key={page.path} path={page.path} element={<GuidePage />} />
          ))}
          {Object.keys(LEGACY_PATH_REDIRECTS).map((legacyPath) => (
            <Route
              key={legacyPath}
              path={legacyPath}
              element={<LegacyRedirect from={legacyPath} />}
            />
          ))}
          <Route path="/crm-sans-inscription" element={<CrmSansInscriptionPage />} />
          <Route path="/alternative-excel-commercial" element={<AlternativeExcelPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

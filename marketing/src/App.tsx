import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SeoHead } from "./components/SeoHead";
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SeoHead />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crm-sans-inscription" element={<CrmSansInscriptionPage />} />
          <Route path="/alternative-excel-commercial" element={<AlternativeExcelPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

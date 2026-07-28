import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/open-sans/latin-700.css";
import "@fontsource/open-sans/latin-ext-700.css";
import App from "./App";
import { LocaleProvider } from "./i18n/LocaleContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>
);

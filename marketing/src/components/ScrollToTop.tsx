import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Remonte en haut à chaque navigation (SPA). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

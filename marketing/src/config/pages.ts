import { APP_URL, SITE_NAME, SITE_URL } from "./site";
import {
  ALL_PAGES,
  ALTERNATIVE_EXCEL_SEO,
  CRM_SANS_INSCRIPTION_SEO,
  FOUNDER_PROFILE_SEO,
  HOME_SEO,
  getAllPages,
  getHomeSeo,
  type PageSeo,
} from "./pages-data";

export type { PageSeo };
export {
  ALL_PAGES,
  ALTERNATIVE_EXCEL_SEO,
  CRM_SANS_INSCRIPTION_SEO,
  FOUNDER_PROFILE_SEO,
  HOME_SEO,
  getAllPages,
  getHomeSeo,
  APP_URL,
  SITE_NAME,
  SITE_URL,
};

export function absoluteUrl(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

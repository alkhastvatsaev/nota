import { APP_URL } from "../config/site";

export type AppLinkUtm = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
};

/** URL app avec UTM pour mesurer les clics depuis le marketing. */
export function buildAppUrl(utm?: AppLinkUtm): string {
  const params = new URLSearchParams();
  params.set("utm_source", utm?.source ?? "heynota");
  params.set("utm_medium", utm?.medium ?? "cta");
  params.set("utm_campaign", utm?.campaign ?? "open_nota");
  if (utm?.content) params.set("utm_content", utm.content);
  return `${APP_URL}?${params.toString()}`;
}

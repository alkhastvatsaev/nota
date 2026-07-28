import { next } from "@vercel/edge";

const COOKIE = "nota_lang";
const MAX_AGE = 60 * 60 * 24 * 365;

function readCookie(header, name) {
  if (!header) return null;
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=(fr|en)`));
  return match?.[1] ?? null;
}

/**
 * FR IP → français. Autre pays → anglais.
 * ?lang=fr|en et cookie existant priment sur la géo.
 */
export default function middleware(request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("lang");
  const existing = readCookie(request.headers.get("cookie"), COOKIE);

  let lang;
  if (q === "fr" || q === "en") {
    lang = q;
  } else if (existing === "fr" || existing === "en") {
    lang = existing;
  } else {
    const country = (request.headers.get("x-vercel-ip-country") || "").toUpperCase();
    lang = country === "FR" ? "fr" : "en";
  }

  const response = next();
  response.headers.append(
    "Set-Cookie",
    `${COOKIE}=${lang}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`
  );
  response.headers.set("x-nota-lang", lang);
  return response;
}

/** Ne pas toucher sitemap/robots/assets (évite cookies/HTML côté crawlers). */
export const config = {
  matcher: ["/((?!api/|.*\\.[\\w]+$).*)"],
};


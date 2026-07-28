/**
 * POST /api/contact
 * Envoie le message via Resend → CONTACT_TO (défaut iCloud fondateur).
 * Env Vercel (projet heynota) : RESEND_API_KEY, optionnel CONTACT_FROM / CONTACT_TO.
 */
export const config = {
  runtime: "edge",
};

const TO = process.env.CONTACT_TO || "alkhastvatsaev@icloud.com";
const FROM = process.env.CONTACT_FROM || "Nota <onboarding@resend.dev>";
const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type",
      },
    });
  }

  if (request.method !== "POST") {
    return json(405, { ok: false, error: "method_not_allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(503, { ok: false, error: "mail_not_configured" });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }

  // Honeypot anti-bot
  if (payload?.company || payload?.website) {
    return json(200, { ok: true });
  }

  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim().toLowerCase();
  const message = String(payload?.message || "").trim();
  const locale = payload?.locale === "en" ? "en" : "fr";

  if (!name || name.length > MAX_NAME) {
    return json(400, { ok: false, error: "invalid_name" });
  }
  if (!email || email.length > MAX_EMAIL || !isEmail(email)) {
    return json(400, { ok: false, error: "invalid_email" });
  }
  if (!message || message.length > MAX_MESSAGE) {
    return json(400, { ok: false, error: "invalid_message" });
  }

  const subject =
    locale === "en"
      ? `[heynota.app] Message from ${name}`
      : `[heynota.app] Message de ${name}`;

  const text = [
    `Nom / Name: ${name}`,
    `Email: ${email}`,
    `Langue / Locale: ${locale}`,
    "",
    message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend error", res.status, detail);
    return json(502, { ok: false, error: "send_failed" });
  }

  return json(200, { ok: true });
}

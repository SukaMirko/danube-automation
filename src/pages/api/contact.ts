import type { APIRoute } from "astro";
import { sendLeadMail } from "../../lib/mail";
import { markMail, saveLead } from "../../lib/leads";

export const prerender = false;

type Lead = {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  source: string;
};

function clean(value: unknown, max: number, keepLines = false) {
  let text = String(value ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  text = keepLines
    ? text.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim()
    : text.replace(/\s+/g, " ").trim();
  return text.slice(0, max);
}

function pageOf(raw: unknown) {
  if (!raw || typeof raw !== "object") return "";
  return clean((raw as Record<string, unknown>).page, 200);
}

function sourceText(raw: unknown) {
  if (!raw || typeof raw !== "object") return "";
  const data = raw as Record<string, unknown>;
  const keys = ["page", "landing", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "referrer"];
  return keys
    .filter((key) => data[key])
    .map((key) => `${key}=${clean(data[key], 200)}`)
    .join(", ");
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function leadText(lead: Lead) {
  return [
    `Name: ${lead.name}`,
    `Company: ${lead.company || "—"}`,
    `Phone: ${lead.phone || "—"}`,
    `Email: ${lead.email || "—"}`,
    "",
    lead.message,
    "",
    `Source: ${lead.source || "—"} (danubeautomation.com)`,
  ].join("\n");
}

function page(title: string, body: string, status = 200) {
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)}</title>
<style>body{margin:0;background:#F6F4EE;color:#2B3A42;font:1.1rem/1.5 system-ui,sans-serif}main{max-width:40rem;margin:auto;padding:2.5rem 1.2rem}a{color:#0E4A5A}h1{font-family:Georgia,serif;color:#242424;font-size:2.2rem;letter-spacing:-.03em}</style>
<main><p>Danube Automation</p><h1>${escapeHtml(title)}</h1>${body}<p><a href="/contact">Back to contact</a></p></main></html>`;
  return new Response(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

async function readFields(request: Request) {
  const type = request.headers.get("content-type") || "";
  if (type.includes("application/json")) {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return null;
    return body as Record<string, unknown>;
  }
  const form = await request.formData();
  const fields: Record<string, unknown> = {};
  form.forEach((value, key) => {
    if (typeof value === "string") fields[key] = value;
  });
  return fields;
}

export const POST: APIRoute = async ({ request }) => {
  const wantsJson = (request.headers.get("accept") || "").includes("application/json")
    || (request.headers.get("content-type") || "").includes("application/json");
  const fields = await readFields(request);
  if (!fields) {
    const error = "The message could not be read.";
    return wantsJson ? json({ ok: false, error }, 400) : page("Message not sent", `<p>${error}</p>`, 400);
  }

  if (clean(fields.website, 200)) {
    return wantsJson
      ? json({ ok: true, mode: "ignored" })
      : page("Received", "<p>Thank you.</p>");
  }

  const lead: Lead = {
    name: clean(fields.name, 120),
    company: clean(fields.company, 160),
    phone: clean(fields.phone, 40),
    email: clean(fields.email, 160),
    message: clean(fields.message, 4000, true),
    source: sourceText(fields.source),
  };

  if (!lead.name || lead.message.length < 5 || (!lead.email && !lead.phone)) {
    const error = "Please add your name, a short message and an email or phone number.";
    return wantsJson ? json({ ok: false, error }, 400) : page("Message not sent", `<p>${error}</p>`, 400);
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    const error = "That email address does not look right.";
    return wantsJson ? json({ ok: false, error }, 400) : page("Message not sent", `<p>${error}</p>`, 400);
  }

  const saved = await saveLead({
    stranica: pageOf(fields.source),
    ime: lead.name,
    firma: lead.company,
    telefon: lead.phone,
    email: lead.email,
    poruka: lead.message,
    izvor: lead.source,
  });

  const to = process.env.MAIL_TO?.trim() || "mirko@biznisautomatika.rs";
  const from = process.env.MAIL_FROM?.trim() || (process.env.RESEND_API_KEY ? "Danube Automation <onboarding@resend.dev>" : process.env.MAIL_USER?.trim()) || to;
  try {
    await sendLeadMail({
      from,
      to,
      subject: `[danubeautomation.com] Inquiry: ${lead.name}${lead.company ? " / " + lead.company : ""}`,
      text: leadText(lead),
    });
    await markMail(saved.id, true);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(`Lead mail failed (id ${saved.id}, saved: ${saved.saved}):`, reason);
    await markMail(saved.id, false, reason);
    // Upit je sačuvan: posetilac dobija poruku o uspehu. Greška ide samo u log.
    if (!saved.saved) {
      const missing = reason === "NO_MAIL";
      const message = missing
        ? "The message cannot be sent right now. Please call or WhatsApp +381 60 745 2220."
        : "The message did not arrive. Please call or WhatsApp +381 60 745 2220.";
      return wantsJson
        ? json({ ok: false, error: message }, missing ? 503 : 502)
        : page("Message not sent", `<p>${escapeHtml(message)}</p>`, missing ? 503 : 502);
    }
  }

  return wantsJson
    ? json({ ok: true })
    : page("Message sent", "<p>Thank you. We will reply within one working day.</p>");
};

const notAllowed: APIRoute = () =>
  new Response(JSON.stringify({ ok: false, error: "Use the form on the website or email us." }), {
    status: 405,
    headers: { allow: "POST", "content-type": "application/json; charset=utf-8" },
  });

export const GET = notAllowed;
export const HEAD = notAllowed;
export const OPTIONS: APIRoute = () => new Response(null, { status: 204, headers: { allow: "POST, OPTIONS" } });

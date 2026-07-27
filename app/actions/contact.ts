"use server";

import { createHash } from "crypto";
import { headers } from "next/headers";
import {
  contactSchema,
  type ContactActionResult,
} from "@/lib/contact-schema";
import { getSupabaseAdmin } from "@/lib/supabase/server";

function hashIp(ip: string) {
  return createHash("sha256").update(ip).digest("hex");
}

export async function submitContact(
  raw: unknown
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  // Honeypot: bots fill hidden "website" field
  if (data.website) {
    return { ok: true };
  }

  const headerStore = headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const userAgent = headerStore.get("user-agent") ?? null;

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      message: data.message,
      company: data.company || null,
      project_type: data.project_type || null,
      source: "portfolio",
      page_url: data.page_url || null,
      user_agent: userAgent,
      ip_hash: hashIp(ip),
      status: "new",
    });

    if (error) {
      console.error("contact insert failed:", error.message);
      return {
        ok: false,
        error: "Something went wrong. Please try again in a moment.",
      };
    }

    await maybeSendEmail(data);

    return { ok: true };
  } catch (err) {
    console.error("contact submit error:", err);
    return {
      ok: false,
      error: "Something went wrong. Please try again in a moment.",
    };
  }
}

async function maybeSendEmail(data: {
  name: string;
  email: string;
  message: string;
  company?: string;
  project_type?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Portfolio contact from ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company || "—"}`,
          `Type: ${data.project_type || "—"}`,
          "",
          data.message,
        ].join("\n"),
      }),
    });
  } catch (err) {
    console.error("contact email failed:", err);
  }
}

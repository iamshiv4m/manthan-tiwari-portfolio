import { NextResponse } from "next/server";

export type InquiryPayload = {
  fullName: string;
  email: string;
  whatsapp: string;
  coachingInterest: string;
  experience: string;
  goal: string;
  message: string;
};

function validateBody(body: unknown): { ok: true; data: InquiryPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }
  const b = body as Record<string, unknown>;
  const fullName = String(b.fullName ?? "").trim();
  const email = String(b.email ?? "").trim();
  const whatsapp = String(b.whatsapp ?? "").trim();
  const coachingInterest = String(b.coachingInterest ?? "").trim();
  const experience = String(b.experience ?? "").trim();
  const goal = String(b.goal ?? "").trim();
  const message = String(b.message ?? "").trim();

  if (!fullName) return { ok: false, error: "Full name is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Valid email is required." };
  if (!whatsapp) return { ok: false, error: "WhatsApp number is required." };
  if (!goal) return { ok: false, error: "Primary goal is required." };

  return {
    ok: true,
    data: {
      fullName,
      email,
      whatsapp,
      coachingInterest,
      experience,
      goal,
      message,
    },
  };
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = validateBody(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const webhook = process.env.INQUIRY_WEBHOOK_URL;

  if (!webhook) {
    return NextResponse.json(
      {
        ok: true,
        message:
          "Inquiry validated successfully. Configure INQUIRY_WEBHOOK_URL (e.g. Formspree, Zapier, or your API) to deliver submissions automatically.",
        preview: parsed.data,
      },
      { status: 200 },
    );
  }

  try {
    const forward = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "manthan-tiwari-portfolio",
        submittedAt: new Date().toISOString(),
        ...parsed.data,
      }),
    });

    if (!forward.ok) {
      return NextResponse.json(
        { error: "Failed to forward inquiry. Please email directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Thank you — your inquiry was submitted successfully.",
    });
  } catch {
    return NextResponse.json(
      { error: "Delivery service unavailable. Please contact via WhatsApp or email." },
      { status: 502 },
    );
  }
}

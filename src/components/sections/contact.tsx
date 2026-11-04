"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import {
  coachingInterests,
  experienceLevels,
  siteConfig,
  whatsappUrl,
} from "@/data/site";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CtaButton } from "@/components/ui/cta-button";

type FormState = {
  fullName: string;
  email: string;
  whatsapp: string;
  coachingInterest: string;
  experience: string;
  goal: string;
  message: string;
};

const initial: FormState = {
  fullName: "",
  email: "",
  whatsapp: "",
  coachingInterest: coachingInterests[0],
  experience: experienceLevels[0],
  goal: "",
  message: "",
};

type SubmitStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function ContactSection() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<SubmitStatus>({ type: "idle" });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  function validate(): boolean {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) errors.fullName = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email.";
    if (!form.whatsapp.trim()) errors.whatsapp = "WhatsApp number is required.";
    if (!form.goal.trim()) errors.goal = "Primary goal is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ type: "loading" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        message:
          data.message ??
          "Inquiry received. Manthan will get back to you soon.",
      });
      setForm(initial);
      setFieldErrors({});
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <section id="contact" className="border-t border-border py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Contact
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Ready to build your stronger self?
          </h2>
          <p className="mt-4 text-muted">
            Whether you&apos;re preparing for competition, building strength, or
            transforming your physique, let&apos;s create a training plan built
            around your goals.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
          <ScrollReveal>
            <form
              onSubmit={onSubmit}
              className="space-y-5"
              noValidate
              aria-labelledby="contact-heading"
            >
              <h3 id="contact-heading" className="sr-only">
                Coaching inquiry form
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="mb-1.5 block text-xs uppercase tracking-widest text-muted">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, fullName: e.target.value }))
                    }
                    className={inputClass}
                    autoComplete="name"
                  />
                  {fieldErrors.fullName && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.fullName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-widest text-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className={inputClass}
                    autoComplete="email"
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="whatsapp" className="mb-1.5 block text-xs uppercase tracking-widest text-muted">
                  WhatsApp number
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, whatsapp: e.target.value }))
                  }
                  className={inputClass}
                  autoComplete="tel"
                />
                {fieldErrors.whatsapp && (
                  <p className="mt-1 text-xs text-red-400">{fieldErrors.whatsapp}</p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="coachingInterest" className="mb-1.5 block text-xs uppercase tracking-widest text-muted">
                    Coaching interest
                  </label>
                  <select
                    id="coachingInterest"
                    value={form.coachingInterest}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        coachingInterest: e.target.value,
                      }))
                    }
                    className={inputClass}
                  >
                    {coachingInterests.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="experience" className="mb-1.5 block text-xs uppercase tracking-widest text-muted">
                    Training experience
                  </label>
                  <select
                    id="experience"
                    value={form.experience}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, experience: e.target.value }))
                    }
                    className={inputClass}
                  >
                    {experienceLevels.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="goal" className="mb-1.5 block text-xs uppercase tracking-widest text-muted">
                  Primary goal
                </label>
                <input
                  id="goal"
                  name="goal"
                  value={form.goal}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, goal: e.target.value }))
                  }
                  className={inputClass}
                />
                {fieldErrors.goal && (
                  <p className="mt-1 text-xs text-red-400">{fieldErrors.goal}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-widest text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>

              <CtaButton
                type="submit"
                variant="primary"
                fullWidth
                disabled={status.type === "loading"}
                size="lg"
              >
                {status.type === "loading" ? "Sending…" : "Send enquiry"}
              </CtaButton>

              {status.type === "success" && (
                <p className="text-sm text-accent" role="status">
                  {status.message}
                </p>
              )}
              {status.type === "error" && (
                <p className="text-sm text-red-400" role="alert">
                  {status.message}
                </p>
              )}
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                Prefer WhatsApp?
              </p>
              <p className="mt-2 text-sm text-muted">
                Fastest way to reach Manthan — tap below with a pre-filled message.
              </p>
              <CtaButton
                href={whatsappUrl}
                variant="whatsapp"
                fullWidth
                className="mt-5"
                size="lg"
              >
                Chat on WhatsApp
              </CtaButton>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 flex items-center gap-3 rounded-xl border border-border p-4 text-sm transition-colors hover:border-accent/50"
              >
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <span className="font-medium break-all">{siteConfig.email}</span>
              </a>
            </div>
            <p className="text-center text-xs text-muted">
              Or call / WhatsApp:{" "}
              <a href={whatsappUrl} className="text-accent hover:underline">
                {siteConfig.phone}
              </a>
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

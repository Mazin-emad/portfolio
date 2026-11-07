"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ContactState = {
  status: "idle" | "sending" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "message", true>>;
};

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-base outline-none transition-colors placeholder:text-muted focus:border-accent-text aria-[invalid=true]:border-red-500";

/**
 * Web3Forms' free plan only accepts submissions made from the visitor's browser (server-to-server
 * calls are rejected), so this posts directly. The access key is designed to be public.
 */
export function ContactForm({ accessKey }: { accessKey?: string }) {
  const t = useTranslations("contact");
  const [state, setState] = useState<ContactState>({ status: "idle" });
  const pending = state.status === "sending";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return setState({ status: "success" }); // honeypot

    const v = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };
    const errors: NonNullable<ContactState["errors"]> = {};
    if (v.name.length < 3) errors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = true;
    if (v.message.length < 10) errors.message = true;
    if (Object.keys(errors).length) return setState({ status: "error", errors });

    if (!accessKey) return setState({ status: "error" });
    setState({ status: "sending" });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio message from ${v.name}`,
          from_name: "Portfolio",
          ...v,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      setState({ status: data.success ? "success" : "error" });
    } catch {
      setState({ status: "error" });
    }
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="border-line bg-surface flex items-start gap-4 rounded-2xl border p-8"
      >
        <CheckCircle2 className="text-accent-text mt-1 shrink-0" aria-hidden />
        <p className="text-lg">{t("success")}</p>
      </div>
    );
  }

  const err = state.errors ?? {};

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label mb-2 block">
            {t("name")}
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={err.name}
            className={field}
          />
          {err.name && <p className="mt-2 text-sm text-red-500">{t("errName")}</p>}
        </div>
        <div>
          <label htmlFor="email" className="label mb-2 block">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            dir="ltr"
            aria-invalid={err.email}
            className={cn(field, "text-start")}
          />
          {err.email && <p className="mt-2 text-sm text-red-500">{t("errEmail")}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label mb-2 block">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={err.message}
          className={cn(field, "resize-y")}
        />
        {err.message && <p className="mt-2 text-sm text-red-500">{t("errMessage")}</p>}
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="bg-accent text-accent-ink hover:bg-fg hover:text-bg inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors disabled:opacity-60"
        >
          {pending ? t("sending") : t("send")}
          <ArrowUpRight size={16} className="flip-rtl" aria-hidden />
        </button>
        {state.status === "error" && !state.errors && (
          <p role="alert" className="text-sm text-red-500">
            {t("error")}
          </p>
        )}
      </div>
    </form>
  );
}

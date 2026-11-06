"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { sendMessage, type ContactState } from "@/app/[locale]/contact/actions";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-base outline-none transition-colors placeholder:text-muted focus:border-accent-text aria-[invalid=true]:border-red-500";

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, action, pending] = useActionState(sendMessage, initial);

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
    <form action={action} noValidate className="grid gap-5">
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

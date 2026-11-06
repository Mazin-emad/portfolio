"use server";

import { z } from "zod";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "message", true>>;
};

const schema = z.object({
  name: z.string().trim().min(3),
  email: z.string().trim().email(),
  message: z.string().trim().min(10),
});

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill hidden fields, humans don't.
  if (formData.get("botcheck")) return { status: "success" };

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: NonNullable<ContactState["errors"]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "message") errors[key] = true;
    }
    return { status: "error", errors };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not set");
    return { status: "error" };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio message from ${parsed.data.name}`,
        from_name: "Portfolio",
        ...parsed.data,
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success ? { status: "success" } : { status: "error" };
  } catch {
    return { status: "error" };
  }
}

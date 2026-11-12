"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

export default function ContactForm() {
  const t = useTranslations("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`${t("mailSubjectPrefix")} ${name}`);
    const body = encodeURIComponent(
      [
        `${t("name")}: ${name}`,
        `${t("phone")}: ${phone}`,
        `${t("email")}: ${email}`,
        "",
        message,
      ].join("\n"),
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const fieldClass =
    "w-full rounded-md border border-petrol/15 bg-white px-4 py-2.5 text-foreground shadow-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-sm text-foreground/65">{t("required")}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-1.5 sm:col-span-1">
          <span className="text-sm font-medium text-petrol-dark">
            {t("name")} *
          </span>
          <input
            required
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block space-y-1.5 sm:col-span-1">
          <span className="text-sm font-medium text-petrol-dark">
            {t("phone")} *
          </span>
          <input
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-sm font-medium text-petrol-dark">
            {t("email")} *
          </span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-sm font-medium text-petrol-dark">
            {t("message")} *
          </span>
          <textarea
            required
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${fieldClass} resize-y min-h-[8rem]`}
          />
        </label>
      </div>
      <p className="text-sm text-foreground/65">{t("note")}</p>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-cta px-8 py-3 text-sm font-semibold text-petrol-deep transition hover:bg-cta-hover"
      >
        {t("send")}
      </button>
    </form>
  );
}

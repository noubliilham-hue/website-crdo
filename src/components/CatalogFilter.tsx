"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

export type CatalogItem = {
  type: "service" | "product" | "lab" | "training";
  title: string;
  description: string;
};

type CatalogFilterProps = {
  items: CatalogItem[];
};

const filterKeys = ["all", "service", "product", "lab", "training"] as const;

export default function CatalogFilter({ items }: CatalogFilterProps) {
  const t = useTranslations("catalog");
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof filterKeys)[number]>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesType =
        activeFilter === "all" || item.type === activeFilter;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [items, query, activeFilter]);

  const mailSubject = encodeURIComponent(t("mailSubject"));
  const mailBody = encodeURIComponent(
    `${t("download.text")}\n\n${filtered.map((i) => `- ${i.title}`).join("\n")}`,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full max-w-md rounded-md border border-petrol/15 bg-white px-4 py-2.5 text-foreground shadow-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
        />
        <div className="flex flex-wrap gap-2">
          {filterKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveFilter(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                activeFilter === key
                  ? "bg-petrol text-white"
                  : "border border-petrol/15 bg-white text-petrol-dark hover:border-gold"
              }`}
            >
              {t(`filters.${key}`)}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-foreground/65">
        {filtered.length} {t("results")}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-petrol/20 bg-sand/20 px-6 py-10 text-center text-foreground/70">
          {t("empty")}
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <li
              key={`${item.type}-${item.title}`}
              className="flex flex-col rounded-lg border border-petrol/10 bg-white p-5 shadow-sm"
            >
              <span className="mb-2 inline-flex w-fit rounded-full bg-sand/50 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-petrol-dark">
                {t(`filters.${item.type}`)}
              </span>
              <h3 className="text-lg font-semibold text-petrol-dark">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/75">
                {item.description}
              </p>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(`${t("request")}: ${item.title}`)}`}
                className="mt-4 text-sm font-semibold text-gold transition hover:text-cta"
              >
                {t("request")} →
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="rounded-lg border border-petrol/10 bg-petrol-dark p-8 text-white lg:p-10">
        <h3 className="text-xl font-bold">{t("download.title")}</h3>
        <p className="mt-3 max-w-2xl text-slate-brand">{t("download.text")}</p>
        <a
          href={`mailto:${site.email}?subject=${mailSubject}&body=${mailBody}`}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-cta px-6 py-3 text-sm font-semibold text-petrol-deep transition hover:bg-cta-hover"
        >
          {t("download.button")}
        </a>
      </div>
    </div>
  );
}

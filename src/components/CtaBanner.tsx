import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CtaBanner() {
  const t = await getTranslations("cta");

  return (
    <section className="relative overflow-hidden bg-petrol py-14 text-white lg:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, var(--gold) 0%, transparent 45%), radial-gradient(circle at 80% 20%, var(--sand) 0%, transparent 40%)",
        }}
      />
      <div className="container-x relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-start">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-brand sm:text-lg">
            {t("text")}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-cta px-6 py-3 text-sm font-semibold text-petrol-deep transition hover:bg-cta-hover"
          >
            {t("primary")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
          >
            {t("secondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}

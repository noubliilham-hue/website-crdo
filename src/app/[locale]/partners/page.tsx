import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/partners">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "partners" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function PartnersPage({
  params,
}: PageProps<"/[locale]/partners">) {
  return (
    <LocalePage params={params}>
      {(locale) => <PartnersPageContent locale={locale} />}
    </LocalePage>
  );
}

async function PartnersPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("partners");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const categories = t.raw("categories.items") as {
    title: string;
    text: string;
  }[];
  const logos = t.raw("logos") as string[];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        crumbs={[{ label: tNav("partners") }]}
      />

      <Section>
        <Reveal>
          <article className="mx-auto max-w-3xl rounded-lg border border-gold/25 bg-petrol-dark p-8 text-white lg:p-10">
            <h2 className="text-xl font-bold text-gold">{t("primary.title")}</h2>
            <p className="mt-4 leading-relaxed text-slate-brand">
              {t("primary.text")}
            </p>
          </article>
        </Reveal>
      </Section>

      <Section tone="sand" title={t("categories.title")}>
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {categories.map((cat, index) => (
              <Reveal key={cat.title} delayMs={index * 60}>
                <article className="rounded-lg border border-petrol/10 bg-white p-6">
                  <h3 className="font-semibold text-petrol-dark">{cat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {cat.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section title={t("logosTitle")}>
        <Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {logos.map((name) => (
              <div
                key={name}
                className="flex aspect-[3/2] items-center justify-center rounded-lg border border-dashed border-petrol/20 bg-sand/25 px-3 text-center text-xs font-medium text-foreground/50"
              >
                {name}
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="sand">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-petrol-dark">
              {t("become.title")}
            </h2>
            <p className="mt-4 text-foreground/75">{t("become.text")}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-cta px-8 py-3 text-sm font-semibold text-petrol-deep transition hover:bg-cta-hover"
            >
              {tCommon("contactUs")}
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

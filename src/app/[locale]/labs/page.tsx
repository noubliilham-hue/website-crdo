import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/labs">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "labs" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function LabsPage({
  params,
}: PageProps<"/[locale]/labs">) {
  return (
    <LocalePage params={params}>
      {(locale) => <LabsPageContent locale={locale} />}
    </LocalePage>
  );
}

async function LabsPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("labs");
  const tNav = await getTranslations("nav");

  const items = t.raw("items") as {
    title: string;
    description: string;
    equipment: string[];
  }[];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        crumbs={[{ label: tNav("labs") }]}
      />

      <Section>
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-foreground/80">
            {t("intro")}
          </p>
        </Reveal>
      </Section>

      <Section tone="sand">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {items.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 60}>
                <article className="h-full rounded-lg border border-petrol/10 bg-white p-6">
                  <h2 className="text-xl font-semibold text-petrol-dark">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {item.description}
                  </p>
                  <div className="mt-5 border-t border-petrol/10 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                      {t("equipmentTitle")}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {item.equipment.map((eq) => (
                        <li key={eq} className="text-sm text-foreground/75">
                          {eq}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-lg border border-gold/30 bg-petrol-dark p-8 text-white lg:p-10">
            <h2 className="text-xl font-bold">{t("quality.title")}</h2>
            <p className="mt-4 leading-relaxed text-slate-brand">
              {t("quality.text")}
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/solutions">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "solutions" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function SolutionsPage({
  params,
}: PageProps<"/[locale]/solutions">) {
  return (
    <LocalePage params={params}>
      {(locale) => <SolutionsPageContent locale={locale} />}
    </LocalePage>
  );
}

async function SolutionsPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("solutions");
  const tNav = await getTranslations("nav");

  const items = t.raw("items") as {
    title: string;
    description: string;
    points: string[];
  }[];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        crumbs={[{ label: tNav("solutions") }]}
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
                <article className="h-full rounded-lg border border-petrol/10 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-petrol-dark">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {item.description}
                  </p>
                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                      {t("pointsTitle")}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2 text-sm text-foreground/75"
                        >
                          <span className="text-gold">•</span>
                          {point}
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
    </>
  );
}

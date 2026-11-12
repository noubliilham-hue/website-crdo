import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  return (
    <LocalePage params={params}>
      {(locale) => <ServicesPageContent locale={locale} />}
    </LocalePage>
  );
}

async function ServicesPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("services");
  const tNav = await getTranslations("nav");

  const items = t.raw("items") as {
    title: string;
    description: string;
    points: string[];
  }[];
  const steps = t.raw("process.steps") as { title: string; text: string }[];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        crumbs={[{ label: tNav("services") }]}
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
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 50}>
                <article className="h-full rounded-lg border border-petrol/10 bg-white p-6">
                  <h2 className="text-lg font-semibold text-petrol-dark">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {item.description}
                  </p>
                  <ul className="mt-4 space-y-1">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm text-foreground/70 before:me-2 before:text-gold before:content-['•']"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section title={t("process.title")}>
        <Reveal>
          <ol className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 70}>
                <li className="list-none rounded-lg border border-petrol/10 bg-white p-5 text-center">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-petrol text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-semibold text-petrol-dark">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Reveal>
      </Section>
    </>
  );
}

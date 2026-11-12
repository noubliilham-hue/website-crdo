import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/academy">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "academy" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function AcademyPage({
  params,
}: PageProps<"/[locale]/academy">) {
  return (
    <LocalePage params={params}>
      {(locale) => <AcademyPageContent locale={locale} />}
    </LocalePage>
  );
}

async function AcademyPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("academy");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const programs = t.raw("programs") as {
    title: string;
    description: string;
    duration: string;
  }[];
  const formats = t.raw("formats.items") as string[];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        crumbs={[{ label: tNav("academy") }]}
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <Reveal key={program.title} delayMs={index * 50}>
                <article className="flex h-full flex-col rounded-lg border border-petrol/10 bg-white p-6">
                  <h2 className="text-lg font-semibold text-petrol-dark">
                    {program.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">
                    {program.description}
                  </p>
                  <p className="mt-4 text-xs font-medium text-gold">
                    {t("durationLabel")}: {program.duration}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section title={t("formats.title")}>
        <Reveal>
          <ul className="mx-auto grid max-w-2xl gap-3">
            {formats.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-md border border-petrol/10 bg-white px-5 py-3 text-sm text-foreground/80"
              >
                <span className="text-gold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section tone="petrol">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white">{t("cta.title")}</h2>
            <p className="mt-4 text-slate-brand">{t("cta.text")}</p>
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

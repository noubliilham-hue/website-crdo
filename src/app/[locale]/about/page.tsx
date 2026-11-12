import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  return (
    <LocalePage params={params}>
      {(locale) => <AboutPageContent locale={locale} />}
    </LocalePage>
  );
}

async function AboutPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tNav = await getTranslations("nav");

  const storyParagraphs = t.raw("story.paragraphs") as string[];
  const objectives = t.raw("objectives.items") as string[];
  const values = t.raw("values.items") as { title: string; text: string }[];
  const legalRows = t.raw("legal.rows") as { label: string; value: string }[];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        crumbs={[{ label: tNav("about") }]}
      />

      <Section title={t("story.title")}>
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-foreground/80">
            {storyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="sand">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-lg border border-petrol/10 bg-white p-8">
              <h2 className="text-xl font-bold text-petrol-dark">
                {t("vision.title")}
              </h2>
              <p className="mt-4 leading-relaxed text-foreground/75">
                {t("vision.text")}
              </p>
            </article>
            <article className="rounded-lg border border-petrol/10 bg-white p-8">
              <h2 className="text-xl font-bold text-petrol-dark">
                {t("mission.title")}
              </h2>
              <p className="mt-4 leading-relaxed text-foreground/75">
                {t("mission.text")}
              </p>
            </article>
          </div>
        </Reveal>
      </Section>

      <Section title={t("objectives.title")}>
        <Reveal>
          <ul className="mx-auto grid max-w-3xl gap-3">
            {objectives.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-md border border-petrol/10 bg-white px-5 py-4 text-sm leading-relaxed text-foreground/80"
              >
                <span className="mt-2 size-2 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="values" tone="sand" title={t("values.title")}>
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delayMs={index * 50}>
                <article className="h-full rounded-lg border border-petrol/10 bg-white p-6">
                  <h3 className="font-semibold text-petrol-dark">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {value.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section title={t("univ.title")}>
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-foreground/80">
            {t("univ.text")}
          </p>
        </Reveal>
      </Section>

      <Section tone="sand" title={t("org.title")} subtitle={t("org.text")}>
        <Reveal>
          <div className="overflow-hidden rounded-lg border border-petrol/10 bg-white p-4 lg:p-6">
            <Image
              src="/brand/org-chart.png"
              alt={t("org.alt")}
              width={1200}
              height={800}
              unoptimized
              className="mx-auto h-auto w-full max-w-4xl"
            />
          </div>
        </Reveal>
      </Section>

      <Section title={t("legal.title")}>
        <Reveal>
          <div className="mx-auto max-w-3xl overflow-x-auto rounded-lg border border-petrol/10 bg-white">
            <table className="w-full min-w-[20rem] text-start text-sm">
              <tbody>
                {legalRows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-petrol/10 last:border-b-0"
                  >
                    <th className="w-1/3 bg-sand/30 px-5 py-4 font-semibold text-petrol-dark">
                      {row.label}
                    </th>
                    <td className="px-5 py-4 text-foreground/80">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

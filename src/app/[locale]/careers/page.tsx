import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/careers">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "careers" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function CareersPage({
  params,
}: PageProps<"/[locale]/careers">) {
  return (
    <LocalePage params={params}>
      {(locale) => <CareersPageContent locale={locale} />}
    </LocalePage>
  );
}

async function CareersPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("careers");
  const tNav = await getTranslations("nav");
  const tForm = await getTranslations("form");

  const whyItems = t.raw("why.items") as { title: string; text: string }[];
  const openings = t.raw("openings") as {
    title: string;
    type: string;
    location: string;
    description: string;
  }[];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        crumbs={[{ label: tNav("careers") }]}
      />

      <Section title={t("why.title")}>
        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {whyItems.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 60}>
                <article className="rounded-lg border border-petrol/10 bg-white p-6">
                  <h3 className="font-semibold text-petrol-dark">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="sand" title={t("openingsTitle")}>
        <Reveal>
          <ul className="mx-auto max-w-3xl space-y-4">
            {openings.map((job, index) => (
              <Reveal key={job.title} delayMs={index * 60}>
                <li className="rounded-lg border border-petrol/10 bg-white p-6">
                  <h3 className="text-lg font-semibold text-petrol-dark">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-gold">
                    {job.type} · {job.location}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {job.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-foreground/65">
            {t("note")}
          </p>
        </Reveal>
      </Section>

      <Section title={t("applyTitle")} subtitle={t("applyText")}>
        <Reveal>
          <div className="mx-auto max-w-xl rounded-lg border border-petrol/10 bg-white p-6 shadow-sm lg:p-8">
            <p className="mb-4 text-sm text-foreground/65">{tForm("cvNote")}</p>
            <ContactForm />
          </div>
        </Reveal>
      </Section>
    </>
  );
}

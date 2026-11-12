import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function HomePage({ params }: PageProps<"/[locale]">) {
  return (
    <LocalePage params={params}>
      {(locale) => <HomePageContent locale={locale} />}
    </LocalePage>
  );
}

async function HomePageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  const introPoints = t.raw("intro.points") as string[];
  const pillars = t.raw("pillars") as { title: string; text: string }[];

  const tSolutions = await getTranslations("solutions");
  const solutionItems = (tSolutions.raw("items") as {
    title: string;
    description: string;
  }[]).slice(0, 3);

  const tAbout = await getTranslations("about");
  const values = (tAbout.raw("values.items") as {
    title: string;
    text: string;
  }[]).slice(0, 4);

  const tServices = await getTranslations("services");
  const serviceItems = (tServices.raw("items") as {
    title: string;
    description: string;
  }[]).slice(0, 3);

  const tPartners = await getTranslations("partners");
  const tNews = await getTranslations("news");
  const newsItems = (tNews.raw("items") as {
    date: string;
    category: string;
    title: string;
    excerpt: string;
  }[]).slice(0, 3);

  const cardClass =
    "h-full rounded-lg border border-petrol/10 bg-white p-6 shadow-sm transition hover:border-gold/40";

  return (
    <>
      <Hero />

      <Section
        eyebrow={t("intro.eyebrow")}
        title={t("intro.title")}
        subtitle={t("intro.text")}
      >
        <Reveal>
          <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {introPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-md border border-petrol/10 bg-white px-4 py-3 text-sm leading-relaxed text-foreground/80"
              >
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gold" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section tone="sand">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delayMs={index * 80}>
                <article className={cardClass}>
                  <h3 className="text-lg font-semibold text-petrol-dark">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {pillar.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section
        eyebrow={t("solutions.eyebrow")}
        title={t("solutions.title")}
        subtitle={t("solutions.text")}
      >
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {solutionItems.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 80}>
                <article className={cardClass}>
                  <h3 className="text-lg font-semibold text-petrol-dark">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center rounded-md bg-petrol px-6 py-3 text-sm font-semibold text-white transition hover:bg-petrol-dark"
            >
              {tCommon("viewAll")} — {tNav("solutions")}
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section
        tone="sand"
        eyebrow={t("values.eyebrow")}
        title={t("values.title")}
        subtitle={t("values.text")}
      >
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delayMs={index * 60}>
                <article className="rounded-lg border border-petrol/10 bg-white p-5">
                  <h3 className="font-semibold text-petrol-dark">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/70">{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/about"
              className="text-sm font-semibold text-gold transition hover:text-cta"
            >
              {tCommon("learnMore")} →
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        subtitle={t("services.text")}
      >
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {serviceItems.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 80}>
                <article className={cardClass}>
                  <h3 className="text-lg font-semibold text-petrol-dark">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-md border border-petrol/20 px-6 py-3 text-sm font-semibold text-petrol-dark transition hover:border-gold"
            >
              {tCommon("viewAll")} — {tNav("services")}
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section
        tone="sand"
        eyebrow={t("news.eyebrow")}
        title={t("news.title")}
        subtitle={t("news.text")}
      >
        <Reveal>
          <ul className="mx-auto max-w-3xl space-y-4">
            {newsItems.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 70}>
                <li className="rounded-lg border border-petrol/10 bg-white p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/60">
                    <time dateTime={item.date}>
                      {new Intl.DateTimeFormat(locale, {
                        dateStyle: "medium",
                      }).format(new Date(item.date))}
                    </time>
                    <span aria-hidden>·</span>
                    <span className="font-medium text-gold">{item.category}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-petrol-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {item.excerpt}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link
              href="/news"
              className="text-sm font-semibold text-gold transition hover:text-cta"
            >
              {tCommon("viewAll")} →
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section
        eyebrow={t("partners.eyebrow")}
        title={t("partners.title")}
        subtitle={t("partners.text")}
      >
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-lg border border-petrol/10 bg-white p-8 text-center">
            <p className="text-sm leading-relaxed text-foreground/75">
              {tPartners("primary.text")}
            </p>
            <Link
              href="/partners"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-cta px-6 py-3 text-sm font-semibold text-petrol-deep transition hover:bg-cta-hover"
            >
              {tNav("partners")}
            </Link>
          </div>
        </Reveal>
      </Section>

      <CtaBanner />
    </>
  );
}

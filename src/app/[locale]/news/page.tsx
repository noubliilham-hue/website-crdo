import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function NewsPage({ params }: PageProps<"/[locale]/news">) {
  return (
    <LocalePage params={params}>
      {(locale) => <NewsPageContent locale={locale} />}
    </LocalePage>
  );
}

async function NewsPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("news");
  const tNav = await getTranslations("nav");

  const items = t.raw("items") as {
    date: string;
    category: string;
    title: string;
    excerpt: string;
  }[];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        crumbs={[{ label: tNav("news") }]}
      />

      <Section>
        <Reveal>
          <p className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-foreground/80">
            {t("intro")}
          </p>
          <ul className="mx-auto max-w-3xl space-y-6">
            {items.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 70}>
                <li className="rounded-lg border border-petrol/10 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/60">
                    <time dateTime={item.date}>
                      {new Intl.DateTimeFormat(locale, {
                        dateStyle: "long",
                      }).format(new Date(item.date))}
                    </time>
                    <span aria-hidden>·</span>
                    <span className="rounded-full bg-sand/50 px-2.5 py-0.5 font-medium text-petrol-dark">
                      {item.category}
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-petrol-dark">
                    {item.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-foreground/75">
                    {item.excerpt}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function ProductsPage({
  params,
}: PageProps<"/[locale]/products">) {
  return (
    <LocalePage params={params}>
      {(locale) => <ProductsPageContent locale={locale} />}
    </LocalePage>
  );
}

async function ProductsPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("products");
  const tNav = await getTranslations("nav");

  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        crumbs={[{ label: tNav("products") }]}
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 60}>
                <article className="relative flex h-full flex-col rounded-lg border border-petrol/10 bg-white p-6">
                  <span className="absolute end-4 top-4 rounded-full bg-sand/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-petrol-dark">
                    {t("badge")}
                  </span>
                  <h2 className="pe-16 text-lg font-semibold text-petrol-dark">
                    {item.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-foreground/70">
            {t("note")}
          </p>
        </Reveal>
      </Section>

      <CtaBanner />
    </>
  );
}

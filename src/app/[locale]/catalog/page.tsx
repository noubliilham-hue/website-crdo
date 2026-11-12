import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import CatalogFilter, {
  type CatalogItem,
} from "@/components/CatalogFilter";
import Reveal from "@/components/Reveal";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/catalog">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "catalog" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function CatalogPage({
  params,
}: PageProps<"/[locale]/catalog">) {
  return (
    <LocalePage params={params}>
      {(locale) => <CatalogPageContent locale={locale} />}
    </LocalePage>
  );
}

async function CatalogPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("catalog");
  const tNav = await getTranslations("nav");

  const items = t.raw("items") as CatalogItem[];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        crumbs={[{ label: tNav("catalog") }]}
      />

      <Section>
        <Reveal>
          <CatalogFilter items={items} />
        </Reveal>
      </Section>
    </>
  );
}

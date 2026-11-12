import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import LocalePage from "@/components/LocalePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  return (
    <LocalePage params={params}>
      {(locale) => <ContactPageContent locale={locale} />}
    </LocalePage>
  );
}

async function ContactPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        crumbs={[{ label: tNav("contact") }]}
      />

      <Section>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-xl font-bold text-petrol-dark">
                {t("infoTitle")}
              </h2>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="text-sm font-semibold text-gold">
                    {t("phones")}
                  </dt>
                  <dd className="mt-2 space-y-1">
                    {site.phones.map((phone) => (
                      <a
                        key={phone.tel}
                        href={`tel:${phone.tel}`}
                        className="block text-foreground/80 transition hover:text-petrol-dark"
                      >
                        {phone.display}
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gold">
                    {t("email")}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-foreground/80 transition hover:text-petrol-dark"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gold">
                    {t("address")}
                  </dt>
                  <dd className="mt-2 text-foreground/80">
                    {tFooter("address")}
                  </dd>
                </div>
                <div>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-sm font-semibold text-gold transition hover:text-cta"
                  >
                    {t("map")} →
                  </a>
                </div>
              </dl>

              <div className="mt-10 rounded-lg border border-petrol/10 bg-sand/30 p-5">
                <h3 className="font-semibold text-petrol-dark">
                  {t("hoursTitle")}
                </h3>
                <p className="mt-2 text-sm text-foreground/75">{t("hours")}</p>
              </div>
            </div>

            <div className="rounded-lg border border-petrol/10 bg-white p-6 shadow-sm lg:p-8">
              <h2 className="text-xl font-bold text-petrol-dark">
                {t("formTitle")}
              </h2>
              <p className="mt-2 text-sm text-foreground/70">{t("formText")}</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

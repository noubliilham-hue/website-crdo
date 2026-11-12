import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export default async function Hero() {
  const t = await getTranslations("hero");
  const tBrand = await getTranslations("brand");

  return (
    <section className="relative min-h-[88vh] overflow-hidden text-white">
      <Image
        src={site.heroImage}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-petrol-deep/75 via-petrol-dark/80 to-petrol-deep/90" />
      <div className="container-x relative flex min-h-[88vh] flex-col justify-center pb-24 pt-36 lg:pb-28 lg:pt-40">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
            <span className="font-semibold text-gold">{t("badge")}</span>
            <span className="text-white/85">{t("badgeText")}</span>
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-brand sm:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center rounded-md bg-cta px-6 py-3 text-sm font-semibold text-petrol-deep transition hover:bg-cta-hover"
            >
              {t("cta1")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-gold hover:bg-white/15"
            >
              {t("cta2")}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 start-0 end-0">
          <div className="container-x flex items-end justify-between gap-4">
            <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-petrol-dark/60 px-4 py-2 backdrop-blur-sm">
              <Image
                src="/brand/logo.jpg"
                alt={tBrand("logoAlt")}
                width={40}
                height={40}
                className="rounded-sm object-cover"
              />
              <div className="text-xs sm:text-sm">
                <p className="font-semibold text-gold">{t("badge")}</p>
                <p className="text-white/80">{t("badgeText")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Crumb = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
};

export default async function PageHero({
  title,
  subtitle,
  crumbs,
}: PageHeroProps) {
  const t = await getTranslations("common");

  return (
    <div className="border-b border-sand/60 bg-petrol-dark pt-28 pb-12 text-white lg:pt-32 lg:pb-16">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-brand">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-gold">
                {t("breadcrumbHome")}
              </Link>
            </li>
            {crumbs?.map((crumb, index) => (
              <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                <span aria-hidden className="opacity-50">
                  /
                </span>
                {crumb.href ? (
                  <Link href={crumb.href} className="transition hover:text-gold">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-brand">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  ar: "AR",
  fr: "FR",
  en: "EN",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const cycleLocale = () => {
    const index = routing.locales.indexOf(locale);
    const next = routing.locales[(index + 1) % routing.locales.length];
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      type="button"
      onClick={cycleLocale}
      className="rounded-md border border-white/25 px-2.5 py-1.5 text-xs font-semibold tracking-wide text-white transition hover:border-gold hover:text-gold focus-visible:outline-offset-2"
      aria-label={`${localeLabels[locale]} — switch language`}
      title={localeLabels[locale]}
    >
      {localeLabels[locale]}
    </button>
  );
}

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "fr", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const rtlLocales: Locale[] = ["ar"];
export const isRtl = (locale: string) => rtlLocales.includes(locale as Locale);

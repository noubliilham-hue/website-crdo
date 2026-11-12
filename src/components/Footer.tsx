import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { extraNav, navItems, site } from "@/lib/site";

const socialPlaceholders = [
  { label: "LinkedIn", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
];

async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");
  const tBrand = await getTranslations("brand");
  const year = await copyrightYear();

  return (
    <footer className="border-t border-sand/50 bg-petrol-deep text-white">
      <div className="container-x py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/brand/logo.jpg"
                alt={tBrand("logoAlt")}
                width={56}
                height={56}
                className="rounded-sm object-cover"
              />
              <div>
                <p className="text-lg font-bold text-gold">{tBrand("name")}</p>
                <p className="text-xs text-slate-brand">{tBrand("tagline")}</p>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-brand">
              {tFooter("about")}
            </p>
            <p className="mt-3 text-xs text-white/70">{tFooter("partner")}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-gold/40 bg-petrol-dark/50 px-3 py-2 text-xs font-semibold text-gold">
              {tFooter("iso")}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              {tFooter("quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm">
              {navItems.slice(0, 6).map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-slate-brand transition hover:text-white"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              {tFooter("more")}
            </h3>
            <ul className="space-y-2 text-sm">
              {navItems.slice(6).map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-slate-brand transition hover:text-white"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
              {extraNav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-slate-brand transition hover:text-white"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              {tFooter("contact")}
            </h3>
            <ul className="space-y-3 text-sm text-slate-brand">
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="transition hover:text-white"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li className="leading-relaxed">{tFooter("address")}</li>
              <li>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline-offset-2 transition hover:underline"
                >
                  Google Maps
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              {socialPlaceholders.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xs font-semibold text-slate-brand transition hover:border-gold hover:text-gold"
                >
                  {social.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-center text-xs text-slate-brand sm:flex-row sm:items-center sm:justify-between sm:text-start">
          <p>
            © {year} {tBrand("name")}. {tFooter("rights")}
          </p>
          <p>{tFooter("iso")}</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { navItems, site } from "@/lib/site";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");
  const tBrand = useTranslations("brand");
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const submitSearch = () => {
    const q = query.trim();
    if (!q) return;
    router.push(`/catalog?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setQuery("");
  };

  const primaryPhone = site.phones[0];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-petrol-dark/95 shadow-md backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-x">
        <div className="flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/brand/logo.jpg"
              alt={tBrand("logoAlt")}
              width={48}
              height={48}
              className="rounded-sm object-cover"
              priority
            />
            <span className="hidden text-sm font-bold leading-tight text-white sm:block">
              <span className="block text-gold">{tBrand("name")}</span>
              <span className="block max-w-[11rem] text-[0.65rem] font-medium text-white/80">
                {tBrand("fullName")}
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 xl:flex"
            aria-label={tHeader("mainNav")}
          >
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`rounded-md px-2.5 py-2 text-sm font-medium transition ${
                    active
                      ? "text-gold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tNav(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden md:block">
              {searchOpen ? (
                <div className="flex items-center gap-1 rounded-md border border-white/20 bg-petrol-deep/80 p-1">
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                    placeholder={tHeader("searchPlaceholder")}
                    className="w-44 bg-transparent px-2 py-1 text-sm text-white placeholder:text-white/50 outline-none lg:w-52"
                    aria-label={tHeader("searchPlaceholder")}
                  />
                  <button
                    type="button"
                    onClick={submitSearch}
                    className="rounded px-2 py-1 text-xs font-semibold text-gold hover:bg-white/10"
                  >
                    {tHeader("searchSubmit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="rounded px-2 py-1 text-xs text-white/70 hover:text-white"
                    aria-label={tHeader("close")}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="rounded-md p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
                  aria-label={tHeader("search")}
                  aria-expanded={searchOpen}
                >
                  <SearchIcon />
                </button>
              )}
            </div>

            <LanguageSwitcher />

            <a
              href={`tel:${primaryPhone.tel}`}
              className="hidden rounded-md p-2 text-white/90 transition hover:bg-white/10 hover:text-gold lg:inline-flex"
              aria-label={tHeader("call")}
            >
              <PhoneIcon />
            </a>

            <Link
              href="/contact"
              className="hidden rounded-md bg-cta px-4 py-2 text-xs font-semibold text-petrol-deep transition hover:bg-cta-hover sm:inline-flex lg:text-sm"
            >
              {tHeader("quote")}
            </Link>

            <button
              type="button"
              className="inline-flex rounded-md p-2 text-white xl:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? tHeader("close") : tHeader("menu")}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-petrol-dark xl:hidden">
          <div className="container-x py-4">
            <div className="mb-4 flex gap-2 md:hidden">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                placeholder={tHeader("searchPlaceholder")}
                className="min-w-0 flex-1 rounded-md border border-white/15 bg-petrol-deep px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none"
              />
              <button
                type="button"
                onClick={submitSearch}
                className="rounded-md bg-white/10 px-3 text-sm font-medium text-gold"
              >
                {tHeader("searchSubmit")}
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label={tHeader("mainNav")}>
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-white/95 hover:bg-white/10"
                >
                  {tNav(item.key)}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-wrap gap-3 border-t border-white/10 pt-4">
              <a
                href={`tel:${primaryPhone.tel}`}
                className="text-sm text-gold"
              >
                {primaryPhone.display}
              </a>
              <Link
                href="/contact"
                className="inline-flex rounded-md bg-cta px-4 py-2 text-sm font-semibold text-petrol-deep"
              >
                {tHeader("quote")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.86 19.86 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

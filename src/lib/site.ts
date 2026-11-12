export const site = {
  email: "sarlcrdo.ceo@univ-eloued.dz",
  phones: [
    { display: "(+213) 06 64 61 88 76", tel: "+213664618876" },
    { display: "(+213) 06 56 03 31 53", tel: "+213656033153" },
  ],
  whatsapp: "213664618876",
  heroImage:
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=2400&q=80",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=El+Oued+Algeria+Universit%C3%A9+Echahid+Hamma+Lakhdar",
} as const;

export const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "solutions", href: "/solutions" },
  { key: "services", href: "/services" },
  { key: "products", href: "/products" },
  { key: "labs", href: "/labs" },
  { key: "academy", href: "/academy" },
  { key: "news", href: "/news" },
  { key: "partners", href: "/partners" },
  { key: "contact", href: "/contact" },
] as const;

export const extraNav = [
  { key: "catalog", href: "/catalog" },
  { key: "careers", href: "/careers" },
] as const;

export type NavKey =
  | (typeof navItems)[number]["key"]
  | (typeof extraNav)[number]["key"];

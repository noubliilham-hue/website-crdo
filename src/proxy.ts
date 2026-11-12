import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redirects `/` -> `/ar` (default locale) and enforces locale prefixes.
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|brand|.*\\..*).*)"],
};

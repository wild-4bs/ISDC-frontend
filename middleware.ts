import { jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const PROTECTED_ROUTES = ["/dashboard", "/profile"];
const ADMIN_ONLY_ROUTES = ["/dashboard"];
const PATIENT_ONLY_ROUTES = ["/profile"];
const AUTH_ROUTES = ["/login"];

// Must match the locales defined in your routing config
const SUPPORTED_LOCALES = routing.locales as readonly string[];
const DEFAULT_LOCALE = routing.defaultLocale as string;

const intlMiddleware = createMiddleware(routing);

// ── helpers ────────────────────────────────────────────────────────────────

/**
 * Strips a locale prefix from the pathname so route checks work regardless
 * of whether next-intl has prefixed the URL.
 * e.g. "/en/dashboard" → "/dashboard", "/dashboard" → "/dashboard"
 */
function stripLocale(pathname: string): { locale: string; bare: string } {
  const segments = pathname.split("/"); // ["", "en", "dashboard"]
  const maybeLocale = segments[1];

  if (SUPPORTED_LOCALES.includes(maybeLocale)) {
    return {
      locale: maybeLocale,
      bare: "/" + segments.slice(2).join("/") || "/",
    };
  }

  return { locale: DEFAULT_LOCALE, bare: pathname };
}

async function getRole(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return (payload.role as string) ?? null;
  } catch {
    return null;
  }
}

/** Redirects to a locale-prefixed path to keep intl routing intact. */
function redirectTo(
  request: NextRequest,
  bare: string,
  locale: string,
): NextResponse {
  const localised = `/${locale}${bare === "/" ? "" : bare}`;
  return NextResponse.redirect(new URL(localised, request.url));
}

// ── main middleware ────────────────────────────────────────────────────────

export default async function middleware(
  request: NextRequest,
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const { locale, bare } = stripLocale(pathname);

  const accessToken = request.cookies.get("accessToken")?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((r) => bare.startsWith(r));
  const isAdminOnly = ADMIN_ONLY_ROUTES.some((r) => bare.startsWith(r));
  const isPatientOnly = PATIENT_ONLY_ROUTES.some((r) => bare.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => bare.startsWith(r));

  // ── 1. No token → protected route ────────────────────────────────────────
  if (!accessToken && isProtectedRoute) {
    return redirectTo(request, "/login", locale);
  }

  // ── 2. Role-based access control ─────────────────────────────────────────
  if (accessToken && (isAdminOnly || isPatientOnly || isAuthRoute)) {
    const role = await getRole(accessToken);

    // Token present but invalid/expired — treat as unauthenticated
    if (!role) {
      if (isProtectedRoute) return redirectTo(request, "/login", locale);
      return intlMiddleware(request);
    }

    if (isAdminOnly && role !== "admin") {
      return redirectTo(request, "/", locale);
    }

    if (isPatientOnly && role !== "patient") {
      return redirectTo(request, "/", locale);
    }

    if (isAuthRoute) {
      return redirectTo(
        request,
        role === "admin" ? "/dashboard" : "/profile",
        locale,
      );
    }
  }

  // ── 3. Delegate to next-intl ──────────────────────────────────────────────
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
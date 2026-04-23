import { jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const PROTECTED_ROUTES = ["/dashboard", "/profile"];
const ADMIN_ONLY_ROUTES = ["/dashboard"];
const PATIENT_ONLY_ROUTES = ["/profile"];
const AUTH_ROUTES = ["/login"];

const intlMiddleware = createMiddleware(routing);

// ── helpers ────────────────────────────────────────────────────────────────

async function getRole(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return (payload.role as string) ?? null;
  } catch {
    return null;
  }
}

function redirect(request: NextRequest, path: string): NextResponse {
  return NextResponse.redirect(new URL(path, request.url));
}

// ── main middleware ────────────────────────────────────────────────────────

export default async function proxy(
  request: NextRequest,
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuthenticated = !!accessToken;

  const isProtectedRoute = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAdminOnly = ADMIN_ONLY_ROUTES.some((r) => pathname.startsWith(r));
  const isPatientOnly = PATIENT_ONLY_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // ── 1. Unauthenticated → protected route ──────────────────────────────────
  if (!isAuthenticated && isProtectedRoute) {
    return redirect(request, "/");
  }

  // ── 2. Role-based access control ─────────────────────────────────────────
  if (isAuthenticated && (isAdminOnly || isPatientOnly || isAuthRoute)) {
    const role = await getRole(accessToken!);

    if (isAdminOnly && role !== "admin") {
      return redirect(request, "/");
    }

    if (isPatientOnly && role !== "patient") {
      return redirect(request, "/");
    }

    if (isAuthRoute) {
      return redirect(request, role === "admin" ? "/dashboard" : "/profile");
    }
  }

  // ── 3. Delegate to next-intl ──────────────────────────────────────────────
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

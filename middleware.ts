import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const PROTECTED_ROUTES = ["/dashboard", "/profile"];
const ADMIN_ONLY_ROUTES = ["/dashboard"];
const PATIENT_ONLY_ROUTES = ["/profile"];
const AUTH_ROUTES = ["/login"];

const ROLE_HOME: Record<string, string> = {
  admin: "/dashboard",
  patient: "/profile",
};

// ── helpers ────────────────────────────────────────────────────────────────

async function getRole(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return (payload.role as string) ?? null;
  } catch {
    return null;
  }
}

function redirectTo(request: NextRequest, path: string): NextResponse {
  return NextResponse.redirect(new URL(path, request.url));
}

// ── main middleware ────────────────────────────────────────────────────────

export default async function middleware(
  request: NextRequest,
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAdminOnly = ADMIN_ONLY_ROUTES.some((r) => pathname.startsWith(r));
  const isPatientOnly = PATIENT_ONLY_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // ── 1. No token → protected route ────────────────────────────────────────
  if (!accessToken && isProtectedRoute) {
    return redirectTo(request, "/login");
  }

  // ── 2. Role-based access control ─────────────────────────────────────────
  if (accessToken && (isAdminOnly || isPatientOnly || isAuthRoute)) {
    const role = await getRole(accessToken);

    // Invalid / expired token — treat as logged out
    if (!role) {
      return isProtectedRoute
        ? redirectTo(request, "/login")
        : NextResponse.next();
    }

    if (isAdminOnly && role !== "admin") return redirectTo(request, "/");
    if (isPatientOnly && role !== "patient") return redirectTo(request, "/");

    if (isAuthRoute) {
      return redirectTo(request, ROLE_HOME[role] ?? "/");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

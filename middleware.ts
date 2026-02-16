import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("better-auth.session_token") ||
  req.cookies.get("__Secure-better-auth.session_token");

  // Si no hay sesión, manda a login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/movements/:path*", "/reports/:path*", "/users/:path*"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    if (!payload.exp) return false;

    // exp is in seconds, Date.now() is ms
    const isExpired = Date.now() >= payload.exp * 1000;

    return !isExpired;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;
  console.log("Middleware", { pathname, token });
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify-otp");

  // 🚫 No token or invalid/expired token → block dashboard
  if (
    pathname.startsWith("/dashboard") &&
    (!token || !isTokenValid(token))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔁 Logged-in user → block auth pages
  if (token && isTokenValid(token) && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/verify-otp",
  ],
};

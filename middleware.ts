import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ??
    request.cookies.get("__Secure-better-auth.session_token"); // en producción con HTTPS

  const isProtected =
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/reading-list") ||
    request.nextUrl.pathname.startsWith("/profile");

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export { proxy as middleware };

export const config = {
  matcher: [
    "/admin/:path*",
    "/reading-list",
    "/profile",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

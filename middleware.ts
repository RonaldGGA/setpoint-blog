import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isProtected =
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/reading-list") ||
    request.nextUrl.pathname.startsWith("/profile");

  // Si la ruta es protegida y no hay cookie → al login
  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export { proxy as middleware };

export const config = {
  matcher: [
    // Protege estas rutas
    "/admin/:path*",
    "/reading-list",
    "/profile",
    // Excluye archivos estáticos y api routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

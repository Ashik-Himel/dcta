import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { serverDomain } from "./lib/variables";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  const token = request.cookies.get("token")?.value || "";
  const pathname = request.nextUrl.pathname;

  const loginRoutes = ["/en/login", "/bn/login"];

  let result = null;
  if (token) {
    try {
      const res = await fetch(`${serverDomain}/api/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      result = await res.json();

      if (
        result?.message === "User not found" ||
        result?.message === "Invalid token"
      ) {
        intlResponse.headers.append(
          "Set-Cookie",
          "token=; Path=/; Max-Age=0; Secure; SameSite=Strict"
        );
      }
    } catch (err) {
      console.error("Auth fetch error:", err);
    }
  }

  if (!result?.ok) {
    if (
      pathname.startsWith("/en/student/") ||
      pathname.startsWith("bn/student/") ||
      pathname.startsWith("/en/admin/") ||
      pathname.startsWith("/bn/admin/")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (loginRoutes.includes(pathname)) {
      if (result?.user?.role === "student") {
        return NextResponse.redirect(
          new URL("/student/dashboard", request.url)
        );
      } else if (result?.user?.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }

    if (result?.user?.role === "student" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
    if (result?.user?.role === "admin" && pathname.startsWith("/student/")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return intlResponse;
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/login",
    "/student/:path*",
    "/admin/:path*",
  ],
};

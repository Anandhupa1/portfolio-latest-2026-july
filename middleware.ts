import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/auth/constants";

const PUBLIC_ADMIN = new Set(["/admin/login", "/admin/register"]);

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) return null;
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isPublic = PUBLIC_ADMIN.has(pathname);
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const secret = getSecret();

  let authed = false;
  if (token && secret) {
    try {
      await jwtVerify(token, secret);
      authed = true;
    } catch {
      authed = false;
    }
  }

  if (authed && isPublic) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!authed && !isPublic) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

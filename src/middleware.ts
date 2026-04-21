import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory storage for rate limiting
// Note: In a production distributed environment, use Redis or a DB.
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export default auth((req: NextRequest & { auth: any }) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  const isOnAdmin = nextUrl.pathname.startsWith("/admin");
  const isLoginPage = nextUrl.pathname === "/login";

  // 1. If trying to access admin and NOT logged in, redirect to login
  if (isOnAdmin && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 2. If logged in and trying to access login, redirect to admin
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login", "/api/auth/callback/credentials"],
};



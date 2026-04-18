import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory storage for rate limiting
// Note: In a production distributed environment, use Redis or a DB.
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export default auth((req: NextRequest & { auth: any }) => {
  const { nextUrl, ip } = req;
  const isLoginPage = nextUrl.pathname === "/login";
  const isAuthCallback = nextUrl.pathname === "/api/auth/callback/credentials";
  const userIp = ip || "anonymous";

  if ((isLoginPage || isAuthCallback) && req.method === "POST") {
    const record = loginAttempts.get(userIp);
    const now = Date.now();

    if (record) {
      if (now - record.lastAttempt > RATE_LIMIT_WINDOW) {
        // Reset window
        loginAttempts.set(userIp, { count: 1, lastAttempt: now });
      } else if (record.count >= MAX_ATTEMPTS) {
        // Block
        return NextResponse.json(
          { error: "Demasiados intentos. Inténtalo más tarde." },
          { status: 429 }
        );
      } else {
        // Increment
        record.count += 1;
        record.lastAttempt = now;
      }
    } else {
      loginAttempts.set(userIp, { count: 1, lastAttempt: now });
    }
  }

  // If unauthenticated and trying to access admin, let auth() handle redirect
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login", "/api/auth/callback/credentials"],
};



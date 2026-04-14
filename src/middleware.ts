export { auth as middleware } from "./auth";

export const config = {
  // Protect all routes under /admin
  matcher: ["/admin/:path*"],
};

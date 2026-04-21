import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const adminEmail = process.env.ADMIN_USER?.trim();
        const b64Hash = process.env.ADMIN_PASSWORD_B64?.trim();
        const adminPasswordHash = b64Hash 
          ? Buffer.from(b64Hash, 'base64').toString('ascii') 
          : "";

        if (credentials.email === adminEmail) {
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            adminPasswordHash as string
          );

          if (isPasswordCorrect) {
            return {
              id: "1",
              name: "Admin Seymu",
              email: adminEmail,
            };
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes of inactivity
    updateAge: 0,    // Update token on every request to reset inactivity timer
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // Omit maxAge entirely to make it a session cookie (expires when browser/window closes)
      },
    },
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/seymu-gestion");
      
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
});

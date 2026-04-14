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

        console.log("-----------------------------------------");
        console.log("[AUTH DEBUG] EMAIL:", credentials.email);
        console.log("[AUTH DEBUG] ENV EMAIL:", adminEmail);
        console.log("[AUTH DEBUG] HASH LENGTH:", adminPasswordHash?.length);
        
        if (credentials.email === adminEmail) {
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            adminPasswordHash as string
          );

          console.log("[AUTH DEBUG] MATCH:", isPasswordCorrect);
          console.log("-----------------------------------------");

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
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
});

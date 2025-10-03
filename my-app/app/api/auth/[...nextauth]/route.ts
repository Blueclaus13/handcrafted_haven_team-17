import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/prisma/lib/prisma";

// --- TypeScript type extensions ---
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      is_seller: boolean;
    };
  }

  interface JWT {
    id: string;
    is_seller: boolean;
  }
}

// --- NextAuth handler ---
export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials:", credentials);
        if (!credentials?.email || !credentials.password) return null;
        console.log("Connecting to database...");
        console.log("email:", credentials.email);
        console.log("password:", credentials.password);

        // Lookup user (case-insensitive email)
        const user = await prisma.users.findFirst({
          where: { email: { equals: credentials.email, mode: "insensitive" } },
        });

        if (!user) return null;

        // Validate password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
        console.log("User authenticated:", user);

        // Return user object for NextAuth
        return {
          id: user.id,
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          is_seller: user.is_seller,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.is_seller = user.is_seller as boolean;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.is_seller = token.is_seller;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };


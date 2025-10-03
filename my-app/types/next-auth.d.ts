// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  // extend the built-in User (from adapters or .authorize return)
  interface User extends DefaultUser {
    id: string;
    is_seller: boolean;
  }

  // extend the session.user
  interface Session {
    user: {
      id: string;
      is_seller: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    is_seller: boolean;
  }
}

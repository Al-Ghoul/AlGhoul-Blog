import { authOptions } from "@/helpers";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      is_admin: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    is_admin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    is_admin: boolean;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

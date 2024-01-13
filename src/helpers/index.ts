import { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/helpers/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export * from "./utils";

export const authOptions: NextAuthOptions = {
  events: {
    createUser: async (data) => {
      if (data.user.email === "abdo.alghouul@gmail.com") {
        await prisma.user.update({
          data: { is_admin: true },
          where: { id: data.user.id },
        });
      }
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    signIn({ user }) {
      const isAllowedToSignIn = user.is_admin === true ||
        user.email === "abdo.alghouul@gmail.com";
      if (isAllowedToSignIn) return true;

      return false;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.is_admin = user.is_admin;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.is_admin = token.is_admin;
      return session;
    },
  },
};

import NextAuth, {
    type NextAuthOptions,
    type DefaultSession,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/helpers/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter"


declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string,
            is_admin: boolean
        } & DefaultSession["user"];
    }

    interface User {
        id: string,
        is_admin: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        is_admin: boolean,
    }
}

export const authOptions: NextAuthOptions = {
    events: {
        createUser: async (data) => {
            if (data.user.email === "abdo.alghouul@gmail.com")
                await prisma.user.update({ data: { is_admin: true }, where: { id: data.user.id } });
        },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        })
    ],
    session: {
        strategy: 'jwt'
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 7,
    },
    callbacks: {
        async signIn({ user, }) {
            const isAllowedToSignIn = (user.is_admin === true || user.email === 'abdo.alghouul@gmail.com');
            if (isAllowedToSignIn)
                return true;

            return false;
        },
        async jwt({ token, user }) {
            if (user){
                token.id = user.id
                token.is_admin = user.is_admin
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            session.user.is_admin = token.is_admin
            return session
        }
    }
}

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
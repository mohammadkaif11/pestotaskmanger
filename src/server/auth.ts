import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { db } from "~/server/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECERET ?? "",
    }),
  ],
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", // Error code passed in query string as ?error=
  },
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const userId = token.sub;
      const userExists =
        (await db.user.findUnique({ where: { id: userId } })) ?? {};
      session.user = {
        ...session.user,
        ...userExists,
      };

      return session;
    },
  },
};

export interface UserSessionInterface {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  } | null;
  expires: string;
}

// Assuming `getServerAuthSession` returns a Promise of SessionInterface
export const getServerAuthSession = (): Promise<UserSessionInterface | null> =>
  getServerSession(authOptions);

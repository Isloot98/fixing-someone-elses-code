import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import PostgresAdapter from "@auth/pg-adapter";
import { sql } from "@vercel/postgres";

const secret = process.env.AUTH_SECRET;

export const { auth, handlers, signOut, signIn } = NextAuth({
  adapter: PostgresAdapter(sql),
  providers: [GitHub],
  secret: secret,
  trustHost: true,
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
  },
});

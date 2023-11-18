import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { ErrorBoundaryHandler } from "next/dist/client/components/error-boundary";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/SignIn",
    error: "/ErrorPage",
  },
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("authorized", credentials);
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        console.log("email", credentials.email);
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!existingUser) {
          return null;
        }
        if (credentials.password !== existingUser?.password) {
          return null;
        }
        return {
          id: `${existingUser?.id}`,
          userName: existingUser?.userName,
          email: existingUser?.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {},
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile, user }) {
      if (!profile) {
        return false;
      }
      console.log(profile);
      console.log(user);
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.email },
      });

      if (existingUser) {
        throw new Error(
          "It Seems you Have Already Signed Up Using Google Account"
        );
      }
      var json = [
        { email: profile.email, userName: profile.name, image: user.image },
      ] as Prisma.JsonArray;
      await prisma.authData.create({
        data: {
          authData: json,
        },
      });

      return true;
    },
  },
};

export default NextAuth(authOptions);

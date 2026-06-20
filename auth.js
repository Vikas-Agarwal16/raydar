// auth.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) return null;

  await dbConnect();

  const user = await User.findOne({ email: credentials.email.toLowerCase() }).select("+password");

  if (!user || !user.password) return null;

  const isValid = await bcrypt.compare(credentials.password, user.password);
  if (!isValid) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
},
    }),
  ],

  debug: true, // Remove this line after everything works

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        await dbConnect();
        const existingUser = await User.findOne({ email: profile.email.toLowerCase() });

        if (!existingUser) {
          await User.create({
            name: profile.name,
            email: profile.email.toLowerCase(),
            // no password field — this is a Google-only account
          });
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // Only runs with `user`/`account` present on initial sign-in
      if (user) {
        if (account?.provider === "google") {
          await dbConnect();
          const dbUser = await User.findOne({ email: user.email.toLowerCase() });
          if (dbUser) token.id = dbUser._id.toString();
        } else {
          token.id = user.id; // already the Mongo _id from authorize()
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      return session;
    },
  },
});
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/mongodb";

async function getUserRoleFromDb(email: string): Promise<string | null> {
  try {
    const client = await connectToDatabase();
    const db = client.db("codenest");
    const user = await db.collection("users").findOne(
      { email },
      { projection: { userId: 1, role: 1 } }
    );
    if (user) {
      return user.role ?? "user";
    }
    return null;
  } catch {
    return null;
  }
}

async function createUser(email: string, name?: string | null): Promise<{ userId: string; role: string } | null> {
  try {
    const client = await connectToDatabase();
    const db = client.db("codenest");
    const newUser = {
      userId: crypto.randomUUID(),
      email,
      name: name ?? email.split("@")[0],
      role: "user",
      createdAt: new Date(),
    };
    await db.collection("users").insertOne(newUser);
    return { userId: newUser.userId, role: "user" };
  } catch {
    return null;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const client = await connectToDatabase();
        const db = client.db("codenest");
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) return null;

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!valid) return null;

        return {
          id: user.userId,
          email: user.email,
          name: user.name,
          role: user.role ?? "user",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as unknown as Record<string, unknown>).role as string ?? "user";
      }
      if (token.email && (!token.role || !token.id)) {
        const role = await getUserRoleFromDb(token.email);
        if (role) {
          token.role = role;
        } else {
          const created = await createUser(token.email, token.name);
          if (created) {
            token.id = created.userId;
            token.role = created.role;
          } else {
            token.role ??= "user";
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "user";
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

// src/auth.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { AuthResponse, JwtPayload } from "./types/authResponse.type";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );

          const data: AuthResponse = await res.json();

          if ("token" in data) {
            const { id } = jwtDecode<JwtPayload>(data.token);

            return {
              id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              token: data.token,
            };
          }

          throw new Error(data.message || "Invalid credentials");
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
      };
      return session;
    },
  },
};
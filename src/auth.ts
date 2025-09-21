import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        const payload = await response.json()
        console.log("Payload:", payload)

        if (!response.ok) {
          throw new Error(payload.message || "Login failed")
        }

        if (payload.message === "success") {
          return {
            id: payload.user._id,
            name: payload.user.name,
            email: payload.user.email,
            token: payload.token,
          }
        }

        throw new Error(payload.message || "Failed to login")
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.token = user.token
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
        }
        ;(session as any).accessToken = token.token
      }
      return session
    },
  },
}
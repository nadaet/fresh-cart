import NextAuth from "next-auth"
import { authOptions } from "@/auth"   // أو المسار اللي فيه الكود بتاعك

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

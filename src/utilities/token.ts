"use server"

import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"

export async function getMyToken() {
  const cookieStore = await cookies()

  const rawToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    null

  if (!rawToken) return null

  const decoded = await decode({
    token: rawToken,
    secret: process.env.NEXTAUTH_SECRET!,
  })

  console.log("Decoded JWT:", decoded) // 👈 هيبينلك لو فيها accessToken ولا لأ
  return (decoded as any)?.accessToken || null // 👈 هنرجع الـ accessToken
}

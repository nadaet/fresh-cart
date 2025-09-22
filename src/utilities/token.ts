"use server"

import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"

export async function getMyToken() {
  const cookieStore = await cookies()

  const tkn =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!tkn) return null

  const decoded = await decode({
    token: tkn,
    secret: process.env.NEXTAUTH_SECRET!,
  })

  console.log("Decoded JWT:", decoded) // هتشوفي الحقول اللي موجودة
  return (decoded as any)?.accessToken || null // خليها accessToken أو أي اسم موجود فعليًا
}


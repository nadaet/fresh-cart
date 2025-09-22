"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/authOptions"

export async function getMyToken(): Promise<string | null> {
  const session = await getServerSession(authOptions)

  if (!session) {
    console.log("⚠️ No session found, user not logged in")
    return null
  }

  // هنا التوكن اللي ضفناه في session callback
  return (session as any).accessToken || null
}

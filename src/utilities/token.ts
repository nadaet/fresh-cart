"use server"
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getMyToken() {
  const cookieStore = await cookies();

  const rawToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    null;

  if (!rawToken) return null;

  const token = await decode({
    token: rawToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.token;
}

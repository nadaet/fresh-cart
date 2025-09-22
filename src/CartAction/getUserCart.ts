"use server"
import { getMyToken } from "@/utilities/token"
import { Cart } from "@/types/cart.type"

export async function getUserCartAction(): Promise<Cart | null> {
  const token = await getMyToken()
  if (!token) return null

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",   // 👈 واضح وصريح
    headers: {
      token: token,
    },
    cache: "no-store", // 👈 علشان دايمًا يجيب آخر بيانات
  })

  if (!response.ok) {
    console.error("Error fetching cart:", await response.text())
    throw new Error("Unexpected response from server")
  }

  const data: Cart = await response.json()
  return data
}

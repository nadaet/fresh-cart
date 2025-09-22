"use server"
import { getMyToken } from "@/utilities/token"
import { Cart } from "@/types/cart.type"

export async function getUserCartAction(): Promise<Cart | null> {
  const token = await getMyToken()
  if (!token) return null

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: token,
    },
  })

  if (!response.ok) {
    throw new Error("Unexpected response from server")
  }

  const data: Cart = await response.json()
  return data
}

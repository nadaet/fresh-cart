import { getMyToken } from "@/utilities/token"
import { Cart } from "@/types/cart.type"

export async function getUserCartAction(): Promise<Cart> {
  const token = await getMyToken()
  if (!token) throw new Error("No token found")

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: { token }
  })
  const data: Cart = await response.json()
  return data
}

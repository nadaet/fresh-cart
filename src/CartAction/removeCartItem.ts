import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { Cart } from "@/types/cart.type"

export async function removeCartItemAction(id: string): Promise<Cart> {
  const token = await getMyToken()
  if (!token) throw new Error("No token found")

  const { data } = await axios.delete<Cart>(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { headers: { token: String(token) } }
  )
  return data
}

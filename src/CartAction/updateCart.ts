import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { Cart } from "@/types/cart.type"

export async function updateCartAction(id: string, count: number): Promise<Cart> {
  const token = await getMyToken()
  if (!token) throw new Error("No token found")

  const { data } = await axios.put<Cart>(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { count },
    { headers: { token: String(token) } }
  )
  return data
}
import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { Cart } from "@/types/cart.type"

export async function AddToCartAction(id: string): Promise<Cart | null> {
  const token = await getMyToken()
  if (!token) {
    return null
  }

  try {
    const { data } = await axios.post<Cart>(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: id },
      { headers: { token: String(token) } }
    )
    return data
  } catch (error) {
    console.error("Error adding to cart:", error)
    return null // fallback لو حصل error في الـ API
  }
}

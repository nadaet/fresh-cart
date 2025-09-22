import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function getUserCartAction() {
  try {
    const token = await getMyToken()
    if (!token) throw new Error("No token found, user not logged in")

    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers: { token: String(token) } }
    )

    console.log("🛒 UserCart Response:", data)
    return data
  } catch (error: any) {
    console.error("❌ getUserCart Error:", error.response?.data || error.message)
    throw error
  }
}

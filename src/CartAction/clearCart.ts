import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function clearCartAction(): Promise<void> {
  const token = await getMyToken()
  if (!token) throw new Error("No token found")

  await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: { token: String(token) }
  })
}

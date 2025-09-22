"use server"
import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { Orders } from "@/types/order.type"

export async function getUserOrder(): Promise<Orders> {
  try {
    const token = await getMyToken()
    if (!token) {
      console.error("No token found in cookies")
      return []
    }

    // 📌 هنا هنجيب الـ userId من التوكن المفكوك
    const decoded: any = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    )
    const userId = decoded?.id || decoded?._id
    if (!userId) {
      console.error("No userId in decoded token")
      return []
    }

    // 📌 الأوردرات الخاصة باليوزر
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        headers: {
          token: token,
        },
      }
    )

    return res.data || []
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}

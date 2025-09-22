"use server"
import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function cashPaymentAction(id: string, values: object) {
  const token = await getMyToken()
  if (!token) {
    throw new Error("Login First")
  }

  const response = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
    values,
    {
      headers: {
        token: token,
      },
    }
  )

  return response.data
}

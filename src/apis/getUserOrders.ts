"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  id: string
}

export async function getUserOrder() {
  const token = await getMyToken()

  if (!token) {
return null  }

  const { id } = jwtDecode<JwtPayload>(token as string)

  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
  )

  return data
}

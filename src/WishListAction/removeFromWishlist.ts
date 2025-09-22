"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function removeFromWishlist(id: string) {
  const token = await getMyToken()
  if (!token) {
    throw Error("Login First")
  }

  console.log(" User Token (remove):", token)
  console.log(" Removing product with ID:", id)

  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, 
    {
      headers: {
        token: token as string,
      },
    }
  )

  return data
}
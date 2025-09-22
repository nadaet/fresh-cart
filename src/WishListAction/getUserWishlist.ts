"use server"
import { getMyToken } from "@/utilities/token"

export async function getUserWishlistAction() {
  const token = await getMyToken()
  if (!token) {
    // 👇 رجّع structure متوقع فيه data = [] بدل null
    return { data: [] }
  }

  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: token as string,
      },
      cache: "no-store", // يضمن أحدث بيانات
    })

    if (!response.ok) {
      console.error("Wishlist fetch failed:", response.statusText)
      return { data: [] }
    }

    const data = await response.json()
    return data // لازم يكون فيه data array جوا
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    return { data: [] }
  }
}

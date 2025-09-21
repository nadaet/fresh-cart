import axios from "axios"

const API = "https://ecommerce.routemisr.com/api/v1/wishlist"

// ⬅️ إضافة برودكت للويش ليست
export const addToWishlist = async (productId: string, token: string) => {
  try {
    const res = await axios.post(
      API,
      { productId }, // البودي
      {
        headers: {
          token, // التوكن بتاع اليوزر
        },
      }
    )
    return res.data
  } catch (error: any) {
    console.error(
      "Error adding to wishlist:",
      error.response?.data || error.message
    )
    throw error
  }
}

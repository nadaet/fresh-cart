import axios from "axios"

const API = "https://ecommerce.routemisr.com/api/v1/wishlist"


export const addToWishlist = async (productId: string, token: string) => {
  try {
    const res = await axios.post(
      API,
      { productId }, 
      {
        headers: {
          token, 
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

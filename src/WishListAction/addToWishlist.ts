"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function AddToWishlistAction(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found, user not logged in");
    }

    const values = {
      productId: id,
    };

    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      values,
      {
        headers: {
          token: token as string, }
      }
    );

    return data;
  } catch (error: any) {
    console.error("AddToWishlist error:", error.response?.data || error.message);
    throw error;
  }
}
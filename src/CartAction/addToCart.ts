"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function AddToCartAction(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("No token found, user not logged in");
    }

    const values = {
      productId: id,
    };

    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      values,
      {
        headers: {
          token: token, }
      }
    );

    return data;
  } catch (error: any) {
    console.error("AddToCart error:", error.response?.data || error.message);
    throw error;
  }
}

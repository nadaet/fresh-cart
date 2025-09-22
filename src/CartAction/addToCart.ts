import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function AddToCartAction(id: string) {
  try {
    const token = await getMyToken();
    if (!token) throw new Error("No token found, user not logged in");

    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: id },
      { headers: { token: String(token) } }
    );

    console.log("✅ AddToCart Response:", data); // هنا نعرف السيرفر بيرجع إيه
    return data;
  } catch (error: any) {
    console.error("❌ AddToCart Error:", error.response?.data || error.message);
    throw error;
  }
}

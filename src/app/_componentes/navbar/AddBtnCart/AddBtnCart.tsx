"use client"

import { AddToCartAction } from "@/CartAction/addToCart"
import { getUserCartAction } from "@/CartAction/getUserCart"
import { useContext } from "react"
import { cartContext } from "@/Context/CartContext"
import { toast } from "sonner"

export default function AddBtnCart({ productId }: { productId: string }) {
  const { setCart } = useContext(cartContext)

  const handleAdd = async () => {
    try {
      await AddToCartAction(productId)
      toast.success("✅ المنتج اتضاف للكارت")

      // ⬅️ بعد الإضافة هنعمل refresh للـ cart من السيرفر
      const newCart = await getUserCartAction()
      setCart(newCart)
    } catch (err: any) {
      toast.error("❌ حصل خطأ أثناء الإضافة")
      console.error(err)
    }
  }

  return (
    <button
      onClick={handleAdd}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      Add to Cart
    </button>
  )
}

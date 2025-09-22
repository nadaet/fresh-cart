"use client"

import React, { useContext } from "react"
import { cartContext } from "@/Context/CartContext"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AddBtnCart({ productId }: { productId: string }) {
  const { addProductToCart } = useContext(cartContext) 

  const handleAdd = async () => {
    try {
      await addProductToCart(productId)
      toast.success("Product added to cart", { duration: 1000, position: "top-center" })
    } catch (error) {
      console.error(error)
      toast.error("Failed to add product", { duration: 1000, position: "top-center" })
    }
  }

  return (
    <Button onClick={handleAdd} className="bg-green-600 text-white hover:bg-green-700">
      Add to Cart
    </Button>
  )
}

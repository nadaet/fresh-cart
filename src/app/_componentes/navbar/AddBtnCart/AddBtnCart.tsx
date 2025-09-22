"use client"

import React, { useContext } from "react"
import { cartContext } from "@/Context/CartContext"
import { Button } from "@/components/ui/button"

export default function AddBtnCart({ productId }: { productId: string }) {
  const { addProductToCart } = useContext(cartContext) 

  const handleAdd = async () => {
    try {
      await addProductToCart(productId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button onClick={handleAdd} className="bg-green-600 text-white hover:bg-green-700">
      Add to Cart
    </Button>
  )
}

"use client"
import { Button } from '@/components/ui/button'
import { cartContext } from '@/Context/CartContext'
import React, { useContext } from 'react'
import { toast } from 'sonner'

const AddBtnCart = ({ id }: { id: string }) => {
  const { addProductToCart } = useContext(cartContext)

  async function handleAddCart() {
    try {
      const data = await addProductToCart(id)
      console.log("cart response:", data) // 👈 عشان تتأكدي من شكل الريسبونس

      if (data?.status === "success") {
        toast.success(data.message, {
          duration: 1000,
          position: "top-center",
        })
      } else {
        toast.error("failed to add in cart", {
          duration: 1000,
          position: "top-center",
        })
      }
    } catch (error) {
      toast.error("something went wrong", {
        duration: 1000,
        position: "top-center",
      })
      console.error(error)
    }
  }

  return (
    <div>
      <Button
        className="w-full bg-green-500 text-white hover:bg-green-600 shadow-md"
        variant="default"
        onClick={handleAddCart}
      >
        Add to Cart
      </Button>
    </div>
  )
}

export default AddBtnCart

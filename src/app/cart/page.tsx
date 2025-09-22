"use client"

import { cartContext } from "@/Context/CartContext"
import React, { useContext } from "react"
import Loading from "../loading"
import { ProductCart } from "@/types/cart.type"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"

const Cart = () => {
  const { 
    isLoading, 
    products, 
    totalCartPrice, 
    removeCartItem, 
    updateCart, 
    clearCart 
  } = useContext(cartContext)

  // 🗑️ حذف منتج
  async function handleRemove(id: string) {
    try {
      const data = await removeCartItem(id)
      if (data?.status === "success") {
        toast.success("Product removed from cart", { duration: 1000, position: "top-center" })
      } else {
        toast.error("Failed to remove product", { duration: 1000, position: "top-center" })
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 1000 })
      console.error(error)
    }
  }

  // 🔄 تحديث عدد القطع
  async function handleUpdate(id: string, count: number) {
    if (count < 1) {
      toast.error("Count must be at least 1", { duration: 1000 })
      return
    }
    try {
      const data = await updateCart(id, count)
      if (data?.status === "success") {
        toast.success("Cart updated", { duration: 1000, position: "top-center" })
      } else {
        toast.error("Failed to update cart", { duration: 1000, position: "top-center" })
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 1000 })
      console.error(error)
    }
  }

  // 🌀 تحميل البيانات
  if (isLoading) return <Loading />

  // 🛒 لو الكارت فاضي
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <Card className="w-3xl mt-6 p-6 text-center">
          <CardHeader>
            <CardTitle className="text-3xl text-green-600">Cart</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-gray-600 mb-4">Cart is empty, try to add products</p>
            <Link href="/products">
              <Button className="bg-green-600 text-white">Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ✅ لو فيه منتجات
  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100 rounded-xl shadow-sm">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-3">Cart Shop</h1>
        <p className="text-lg font-medium mb-5">
          Total price:{" "}
          <span className="text-green-600 font-mono">{totalCartPrice}</span> EGP
        </p>
        
        {/* Checkout */}
        <Button className="mb-10 ms-5 bg-green-600 hover:bg-green-700">
          <Link href="/payment">CheckOut</Link>
        </Button>

        {/* Products */}
        <div className="space-y-4">
          {products.map((product: ProductCart) => (
            <div key={product.product._id} className="flex items-center justify-between border-b py-3">
              
              {/* product details */}
              <div className="flex items-center gap-4">
                <Image
                  alt={product.product.title}
                  src={product.product.imageCover}
                  height={100}
                  width={100}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h1 className="font-medium text-lg">{product.product.title}</h1>
                  <p className="font-medium text-gray-700">{product.price} EGP</p>

                  <Button
                    onClick={() => handleRemove(product.product._id)}
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                  >
                    <i className="fa-solid fa-trash"></i> Remove
                  </Button>
                </div>
              </div>

              {/* controls */}
              <div className="flex items-center gap-2">
                <Button onClick={() => handleUpdate(product.product._id, product.count + 1)}> + </Button>
                <span className="font-bold">{product.count}</span>
                <Button onClick={() => handleUpdate(product.product._id, product.count - 1)}> - </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Clear cart */}
        <div className="flex justify-center mt-5">
          <Button
            onClick={clearCart}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            Clear Your Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart

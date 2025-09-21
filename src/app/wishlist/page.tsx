"use client"

import React, { useContext } from "react"
import { wishlistContext } from "@/Context/WishlistContext"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Loading from "../loading"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const Wishlist = () => {
  const { isLoading, products, removeProductFromWishlist } = useContext(wishlistContext)

  const handleRemove = async (id: string) => {
    try {
      await removeProductFromWishlist(id)
      toast.success("Removed from wishlist", { duration: 1000, position: "top-center" })
    } catch (error) {
      toast.error("Something went wrong", { duration: 1000, position: "top-center" })
      console.error(error)
    }
  }

  if (isLoading) return <Loading />

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <Card className="w-3xl mt-6">
          <CardHeader>
            <CardTitle className="text-3xl text-green-600">Wishlist</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">Wishlist is empty, try to add products</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col md:flex-row items-center md:items-start gap-4 border-b pb-4"
          >
            <div className="flex-shrink-0">
              <Image
                src={product.imageCover || "/placeholder.png"}
                alt={product.title || "Product image"}
                width={150}
                height={150}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-medium text-xl md:text-2xl">{product.title}</h2>
                <p className="font-medium text-green-700">{product.price} EGP</p>
              </div>
              <Button
                onClick={() => handleRemove(product._id)}
                variant="ghost"
                className="text-red-600 mt-2 md:mt-auto"
              >
                <i className="fa-solid fa-trash mr-2"></i> Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist

"use client"

import React, { useContext } from "react"
import Loading from "../loading"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { WishlistContext } from "@/Context/WishlistContext"

const Wishlist = () => {
  const { isLoading, wishlist, removeFromWishlist } = useContext(WishlistContext)


  async function handleRemove(productId: string) {
    try {
      const data = await removeFromWishlist(productId)
      if (data?.status === "success") {
        toast.success("Removed from wishlist", {
          duration: 1000,
          position: "top-center",
        })
      } else {
        toast.error("Failed to remove", {
          duration: 1000,
          position: "top-center",
        })
      }
    } catch (err) {
      toast.error("Something went wrong", {
        duration: 1000,
        position: "top-center",
      })
    }
  }

  // ⏳ حالة اللودينج
  if (isLoading) {
    return <Loading />
  }

  // ❌ حالة الويش ليست فاضية
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Card className="w-3xl">
          <CardHeader>
            <CardTitle className="text-3xl text-green-600">Wishlist</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">
              Wishlist is empty, try adding some products
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

        <div className="allProducts">
          {wishlist.map((product: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b py-3"
            >
           
              <div className="flex items-center gap-4 mb-2">
                <div>
                  <Image
                    alt={product.title}
                    src={product.imageCover || "/placeholder.png"}
                    height={150}
                    width={150}
                  />
                </div>
                <div>
                  <h1 className="font-medium text-2xl">{product.title}</h1>
                  <p className="font-medium">{product.price} EGP</p>

                  <Button
                    onClick={() => handleRemove(product._id)}
                    variant="ghost"
                    className="text-red-600"
                  >
                    <i className="fa-solid fa-trash"></i> Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist

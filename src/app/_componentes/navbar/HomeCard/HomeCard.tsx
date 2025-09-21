"use client"

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import React, { useContext } from "react"
import Image from "next/image"
import { Product } from "@/types/product.type"   // 👈 بدل Daum خليناه Product
import AddBtnCart from "../AddBtnCart/AddBtnCart"
import { wishlistContext } from "@/Context/WishlistContext"
import { cartContext } from "@/Context/CartContext"
import { toast } from "sonner"

const HomeCard = ({ product }: { product: Product }) => {
  const { products: wishlistProducts, addProductToWishlist, removeProductFromWishlist } =
    useContext(wishlistContext)
  const { addProductToCart } = useContext(cartContext)

  const isInWishlist = wishlistProducts.some((item) => item._id === product._id)

  const toggleWishlist = async () => {
    try {
      if (isInWishlist) {
        await removeProductFromWishlist(product._id)
        toast.info("Removed from wishlist", { duration: 1000, position: "top-center" })
      } else {
        await addProductToWishlist(product._id)
        toast.success("Added to wishlist", { duration: 1000, position: "top-center" })
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 1000, position: "top-center" })
      console.error(error)
    }
  }

  const handleAddToCart = async () => {
    try {
      await addProductToCart(product._id)
      toast.success("Added to cart", { duration: 1000, position: "top-center" })
    } catch (error) {
      toast.error("Failed to add to cart", { duration: 1000, position: "top-center" })
      console.error(error)
    }
  }

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3">
      <Card className="group p-2 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_20px_rgba(34,197,94,0.5)] hover:-translate-y-1">
      
        <CardHeader className="p-0">
          <Link href={`/productDetails/${product._id}`}>
            <Image
              width={500}
              height={500}
              src={product.imageCover || "/placeholder.png"}
              alt={product.title || "Product image"}
              className="rounded-md object-cover"
            />
          </Link>
        </CardHeader>

        <CardContent className="p-0 mt-2">
          <p className="font-bold text-green-500 mb-1">{product.category?.name}</p>
          <p className="text-black line-clamp-1">{product.title}</p>
        </CardContent>

        <CardFooter className="p-0 mt-3 flex flex-col gap-3">
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold">{product.price} EGP</p>

            <button onClick={toggleWishlist} className="text-xl">
              <i
                className={`fa-solid fa-heart transition-colors duration-300 ${
                  isInWishlist ? "text-red-600" : "text-gray-400 hover:text-red-500"
                }`}
              ></i>
            </button>

            <div className="flex items-center gap-1">
              <span>{product.ratingsAverage}</span>
              <i className="fa-solid fa-star text-yellow-400"></i>
            </div>
          </div>

          <div className="w-full transition-all duration-300 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default HomeCard

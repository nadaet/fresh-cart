"use client"

import React, { useEffect, useState, useContext } from "react"
import getAllProducts from "@/apis/allProducts"
import { Input } from "@/components/ui/input"
import { Product } from "@/types/product.type"
import { toast } from "sonner"
import { wishlistContext } from "@/Context/WishlistContext"
import { cartContext } from "@/Context/CartContext"

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")

  const { products: wishlistProducts, addProductToWishlist, removeProductFromWishlist } =
    useContext(wishlistContext)
  const { addProductToCart } = useContext(cartContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await getAllProducts()
        setProducts(data)
      } catch (error) {
        console.error(error)
        toast.error("Failed to fetch products", { duration: 1000, position: "top-center" })
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  // Toggle wishlist
  const handleToggleWishlist = async (product: Product) => {
    const isInWishlist = wishlistProducts.some((item) => item._id === product._id)
    try {
      if (isInWishlist) {
        await removeProductFromWishlist(product._id)
        toast.info("Removed from wishlist", { duration: 1000, position: "top-center" })
      } else {
        await addProductToWishlist(product._id)
        toast.success("Added to wishlist", { duration: 1000, position: "top-center" })
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong", { duration: 1000, position: "top-center" })
    }
  }

  // Add to cart
  const handleAddToCart = async (product: Product) => {
    try {
      await addProductToCart(product._id)
      toast.success("Added to cart", { duration: 1000, position: "top-center" })
    } catch (error) {
      console.error(error)
      toast.error("Failed to add to cart", { duration: 1000, position: "top-center" })
    }
  }

  return (
    <div className="w-[80%] mx-auto py-10">
      <Input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 hover:shadow-blue-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {filteredProducts.map((product) => {
          const isInWishlist = wishlistProducts.some((item) => item._id === product._id)

          return (
            <div
              key={product._id}
              className="relative border rounded-lg p-4 flex flex-col justify-between hover:shadow-lg hover:shadow-green-400/50 transition group"
            >
              <img
                src={product.imageCover || "/placeholder.png"}
                alt={product.title || "Product image"}
                className="w-full h-52 object-cover rounded-md"
              />

              <h2 className="font-medium mt-3 text-left">{product.category?.name || "Uncategorized"}</h2>
              <h2 className="font-medium mt-1 text-left line-clamp-1">{product.title}</h2>

              <div className="flex items-center justify-between mt-2">
                <p className="text-green-600 font-bold">{product.price} EGP</p>
                <button
                  onClick={() => handleToggleWishlist(product)}
                  className="text-xl transition"
                >
                  <i
                    className={`fa-solid fa-heart ${
                      isInWishlist ? "text-red-600" : "text-gray-400 hover:text-red-500"
                    }`}
                  ></i>
                </button>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

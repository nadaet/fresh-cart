"use client"

import React, { useEffect, useState, useContext } from "react"
import getAllProducts from "@/apis/allProducts"
import { Input } from "@/components/ui/input"
import { WishlistContext } from "@/Context/WishlistContext"

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState("")

  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext)

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  // 🔄 toggle wishlist
  function toggleWishlist(product: any) {
    const isInWishlist = wishlist.some((item: any) => item._id === product._id)
    if (isInWishlist) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="w-[80%] mx-auto py-10">
      {/* البحث */}
      <Input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 hover:shadow-blue-500"
      />

      {/* المنتجات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {filteredProducts.map((product: any) => {
          const isInWishlist = wishlist.some((item: any) => item._id === product._id)

          return (
            <div
              key={product._id}
              className="relative border rounded-lg p-4 flex flex-col justify-between hover:shadow-lg hover:shadow-green-400/50 transition group"
            >
              {/* صورة المنتج */}
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-52 object-cover rounded-md"
              />

              {/* اسم الكاتيجوري */}
              <h2 className="font-medium mt-3 text-left">{product.category.name}</h2>
              {/* عنوان المنتج */}
              <h2 className="font-medium mt-1 text-left line-clamp-1">{product.title}</h2>

              {/* السعر + الأيقونة */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-green-600 font-bold">{product.price} EGP</p>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="text-xl transition"
                >
                  <i
                    className={`fa-solid fa-heart ${
                      isInWishlist ? "text-red-600" : "text-gray-400 hover:text-red-500"
                    }`}
                  ></i>
                </button>
              </div>

              {/* زرار الكارت */}
              <div className="mt-4">
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition duration-300">
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

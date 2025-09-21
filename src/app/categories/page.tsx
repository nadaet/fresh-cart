import React from "react"
import { Category } from "./../../types/category.type"
import getAllCategories from "@/apis/allcategories"

export default async function CategoryPage() {
  const categories: Category[] = await getAllCategories()

  return (
    <div className="w-[80%] mx-auto py-10">
     

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
        {categories.map((category: Category) => (
          <div
            key={category._id}
            className="relative border rounded-lg overflow-hidden hover:shadow-lg hover:shadow-green-400/50 transition group"
          >
           
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-70 object-cover"
            />

          
            <div className="p-4">
              <h2 className="text-2xl font-bold text-center text-green-700">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

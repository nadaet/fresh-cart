import React from "react"
import  getAllBrands  from "@/apis/allbrands" 

export default async function BrandsPage() {
  const brands = await getAllBrands()

  return (
    <div className="w-[80%] mx-auto py-10">
      <h1 className="text-4xl mb-6 text-green-600 text-center">
        All Brands
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10">
        {brands.map((brand: any) => (
          <div
            key={brand._id}
            className="border rounded-lg shadow p-4 flex flex-row lg:flex-col items-center gap-4 hover:scale-105 transition"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-40 object-contain" 
            />

            <h2 className="font-medium text-center lg:mt-2">
              {brand.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

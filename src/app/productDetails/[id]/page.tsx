import getSingleProduct from '@/apis/singleProduct'
import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import AddBtnCart from '@/app/_componentes/navbar/AddBtnCart/AddBtnCart'

const ProductDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params   // ✅ لازم await
  const data = await getSingleProduct(id)

  return (
    <div className="w-full px-5 md:w-[80%] md:px-0 mx-auto my-10 flex items-center flex-col md:flex-row">
      
      {/* صورة المنتج */}
      <div className="w-full md:w-1/3">
        <Image
          width={500}
          height={500}
          src={data.imageCover}
          className="w-full rounded-md"
          alt={data.title}
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="w-full md:w-2/3 m-10 md:m-0 ps-10">
        <h2 className="text-4xl font-bold">{data.title}</h2>
        <p className="mt-5">{data.description}</p>
        <p className="text-green-600 font-medium">{data.category.name}</p>

        <div className="w-full my-5 flex justify-between items-center">
          <p className="text-lg font-semibold">{data.price} EGP</p>
          <div className="flex items-center gap-1">
            <span className="text-lg font-medium">{data.ratingsAverage}</span>
            <i className="fa-solid fa-star text-yellow-400"></i>
          </div>
        </div>

        {/* زر إضافة الكارت */}
        <AddBtnCart productId={data._id} />
      </div>
    </div>
  )
}

export default ProductDetails

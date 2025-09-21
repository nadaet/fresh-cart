"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Image from 'next/image'
import { Category } from '@/types/category.type'

const SwiperCategory = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="w-[95%] mx-auto">
      <Swiper
        spaceBetween={0}
        slidesPerView={2} 
        breakpoints={{

          768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 }, 

        }}
      >
        {categories.map((category, idx) => (
          <SwiperSlide key={idx} className="text-center w-auto h-auto">
            <Image
              width={500}
              height={500}
              src={category.image}
              alt={category.name}
              className="h-[200px] sm:h-[150px] md:h-[150px] w-full object-cover "
            />
            <p className="my-2 text-base sm:text-lg md:text-xl font-medium">
              {category.name}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperCategory

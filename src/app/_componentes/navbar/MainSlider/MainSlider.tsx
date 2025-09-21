"use client"
import React from 'react'
import banner1 from "./../../../../../public/screens/slider/slider (5).jpg"
import banner2 from "./../../../../../public/screens/slider/slider (4).jpg"
import slider1 from "./../../../../../public/screens/slider/slider (1).jpg"
import slider2 from "./../../../../../public/screens/slider/slider (2).jpg"
import slider3 from "./../../../../../public/screens/slider/slider (3).jpg"
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const MainSlider = () => {
  return (
    <div className="mb-10 flex flex-col md:flex-row justify-center gap-4">
    
      <div className="w-[90%] sm:w-[85%] md:w-[250px] mx-auto md:mx-0">
        <Swiper spaceBetween={0} slidesPerView={1}>
          <SwiperSlide>
            <Image
              className="w-full h-auto md:h-[400px] object-contain "
              src={slider1}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              className="w-full h-auto md:h-[400px] object-contain"
              src={slider2}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              className="w-full h-auto md:h-[200px] object-contain bg-black"
              src={slider3}
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* الصور الثابتة */}
      <div className="w-[90%] sm:w-[85%] md:w-[250px] flex flex-col mx-auto md:mx-0">
        <Image
          className="w-full h-auto md:h-[200px] object-contain bg-black"
          src={banner2}
          alt=""
        />
        <Image
          className="w-full h-auto md:h-[200px] object-contain bg-black"
          src={banner1}
          alt=""
        />
      </div>
    </div>
  )
}

export default MainSlider

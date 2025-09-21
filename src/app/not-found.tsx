import Image from 'next/image'
import React from 'react'
import errorImage from "./../../public/screens/404.jpg"

const ErrorPage= () => {
  return (
    <div className='w-full md:w-[80%] mx-auto px-5 my-5 md:p-0'>
   <Image alt=""    src={errorImage}/>
    </div>
  )
}

export default ErrorPage


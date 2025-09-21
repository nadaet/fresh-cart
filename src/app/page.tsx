import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/auth"  // مكان ملف authOptions بتاعك
import getAllProducts from "@/apis/allProducts"
import { Product } from "@/types/product.type"
import HomeCard from "./_componentes/navbar/HomeCard/HomeCard"
import MainSlider from "./_componentes/navbar/MainSlider/MainSlider"
import CategorySlide from "./_componentes/navbar/CategorySlide/CategorySlide"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

const data = await getAllProducts()

  return (
    <section className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto">
      <MainSlider />
      <CategorySlide />
      <div className="flex flex-wrap">
        {data.map((product: Product, idx: number) => (
          <HomeCard key={idx} product={product} />
        ))}
      </div>
    </section>
  )
}

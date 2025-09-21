import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/auth"  // مكان ملف authOptions بتاعك
import getAllProducts from "@/apis/allProducts"
import { Product } from "@/types/product.type"
import HomeCard from "./_componentes/navbar/HomeCard/HomeCard"
import MainSlider from "./_componentes/navbar/MainSlider/MainSlider"
import CategorySlide from "./_componentes/navbar/CategorySlide/CategorySlide"

export default async function HomePage() {
  //  نجيب السيشن
  const session = await getServerSession(authOptions)

  //  لو مفيش سيشن → redirect على /login
  if (!session) {
    redirect("/login")
  }

  //  لو في سيشن → نجيب المنتجات
  const data: Product[] = await getAllProducts()

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

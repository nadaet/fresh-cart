import { Product } from "@/types/product.type"

export default async function getAllProducts(): Promise<Product[]> {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/products")
  const { data } = await response.json()
  return data as Product[]
}

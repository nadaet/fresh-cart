// ملف أنواع الكارت
export type ProductCart = {
  count: number
  price: number
  product: {
    _id: string        // مهم جداً يكون _id
    title: string
    imageCover: string
    category: {
      name: string
    }
  }
}

export type Cart = {
  status: string
  numOfCartItems: number
  cartId: string
  data: {
    products: ProductCart[]
    totalCartPrice: number
  }
}

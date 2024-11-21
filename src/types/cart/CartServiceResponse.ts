import { Product } from "../products/Product"

export type CartServiceResponse = {
  userId: string
  products: {
    productId: Product
    quantity: number
    totalPriceProduct: number
  }[]
  totalAmount: number
  status: 'PENDIENTE' | 'COMPLETO' | 'FALLIDO'
  createdAt: string
}
import { Product } from "../products/Product"
import { Provider } from "../providers/Provider"

export interface Purchase {
    __id: string
    idProduct: Product
    idProvider: Provider
    linkProvider: string
    priceProduct: string
    statusPurchases: boolean
    __v: number
}

export interface CreationPurchase {
    idProduct: string
    idProvider: string
    linkProvider: string
    priceProduct: number
}
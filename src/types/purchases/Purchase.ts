import { Provider } from "../providers/Provider"

export interface Purchase {
    _id: string
    idProduct: string
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
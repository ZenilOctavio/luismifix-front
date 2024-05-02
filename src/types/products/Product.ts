import { ProductType } from "./ProductType"

export interface Product {
    _id: string
    idTypeProduct: ProductType
    nameProduct: string
    amountProduct: number
    priceProduct: number
    descriptionProduct: string
    statusProduct: boolean
    creationDateProduct: Date
    __v: number
}

export interface CreationProduct {
    idTypeProduct: string
    nameProduct: string
    amountProduct: number
    priceProduct: number
    descriptionProduct: string
}
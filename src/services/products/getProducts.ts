import axios from "axios"
import { BACKEND_URL, API_PRODUCTS_PATHNAME, API_PRODUCTS_BY_ID_PATHNAME, API_PRODUCTS_BY_NAME_PATHNAME } from "@/config/constants";
import { Product } from "@/types/products/Product";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

export async function getProducts() {
    url.pathname = API_PRODUCTS_PATHNAME

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<Product>
}

async function getProduct(pathname: string, value: string){
    url.pathname = `${pathname}/${value}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data
}

export async function getProductById(id: string){
    const data = await getProduct(API_PRODUCTS_BY_ID_PATHNAME, id) as Product
    return data 
}

export async function getProductByName(name: string){
    const data = await getProduct(API_PRODUCTS_BY_NAME_PATHNAME, name) as Array<Product>
    return data  
}


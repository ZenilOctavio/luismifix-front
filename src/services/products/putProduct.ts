import { BACKEND_URL, API_PRODUCTS_ENABLE_PATHNAME, API_PRODUCTS_DISABLE_PATHNAME, API_PRODUCTS_PATHNAME  } from "@/config/constants";
import { CreationProduct } from "@/types/products/Product";
import axios from "axios";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

export async function updateProduct(id:string , newProductData: CreationProduct){
    url.pathname = `${API_PRODUCTS_PATHNAME}/${id}`

    const response = await axios.put(url.toString(), newProductData)

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {message: string}
}

export async function enableProduct(id: string){
    
    url.pathname = `${API_PRODUCTS_ENABLE_PATHNAME}/${id}`

    const response = await axios.put(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {message: string}
}

export async function disableProduct(id: string){
    
    url.pathname = `${API_PRODUCTS_DISABLE_PATHNAME}/${id}`

    const response = await axios.put(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {message: string}
}
import { CreationProduct } from "@/types/products/Product";
import { BACKEND_URL, API_PRODUCTS_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import axios from "axios";

const url = new URL(BACKEND_URL)

export async function createProduct(newProduct: CreationProduct){
    url.pathname = API_PRODUCTS_PATHNAME

    const response = await axios.post(url.toString(), newProduct)

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {message: string}
}
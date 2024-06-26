import axios from "axios"
import { BACKEND_URL, API_TYPES_PRODUCT_PATHNAME } from "@/config/constants";
import { ProductType } from "@/types/products/ProductType";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

export async function getTypesProduct() {
    url.pathname = API_TYPES_PRODUCT_PATHNAME

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<ProductType>
}
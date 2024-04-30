import axios from "axios"
import { BACKEND_URL, API_PURCHASES_FOR_PRODUCT_PATHNAME, API_PURCHASES_FOR_PROVIDER_PATHNAME } from "@/config/constants";
import { Purchase } from "@/types/purchases/Purchase";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

export async function getPurchasesForProvider(providerId: string) {
    url.pathname = `${API_PURCHASES_FOR_PROVIDER_PATHNAME}/${providerId}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<Purchase>
}


export async function getPurchasesForProduct(productId: string) {
    url.pathname = `${API_PURCHASES_FOR_PRODUCT_PATHNAME}/${productId}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<Purchase>
}

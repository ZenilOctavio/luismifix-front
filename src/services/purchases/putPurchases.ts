import { CreationPurchase } from "@/types/purchases/Purchase";
import axios from "axios";
import { BACKEND_URL, API_PURCHASES_PATHNAME, API_PURCHASES_ENABLE_PATHNAME, API_PURCHASES_DISABLE_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

export async function updatePurchase(purchaseId: string, newPurchaseData: CreationPurchase) {
    console.log(arguments)

    url.pathname = `${API_PURCHASES_PATHNAME}/${purchaseId}`

    console.log(url)

    const response = await axios.put(url.toString(), newPurchaseData)

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }
    
}

export async function enablePurchase(purchaseId: string) {

    url.pathname = `${API_PURCHASES_ENABLE_PATHNAME}/${purchaseId}`

    const response = await axios.put(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }
    
}

export async function disablePurchase(purchaseId: string) {

    url.pathname = `${API_PURCHASES_DISABLE_PATHNAME}/${purchaseId}`

    const response = await axios.put(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }
    
}
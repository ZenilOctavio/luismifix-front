import { CreationPurchase } from "@/types/purchases/Purchase";
import axios from "axios";
import { BACKEND_URL, API_PURCHASES_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

export async function postPurchase(newPurchase: CreationPurchase){

    url.pathname = API_PURCHASES_PATHNAME

    const response = await axios.post(url.toString(), newPurchase)

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {message: string}
    
}
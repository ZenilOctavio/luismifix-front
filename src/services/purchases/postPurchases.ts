import { CreationPurchase } from "@/types/purchases/Purchase";
import axios from "axios";
import { BACKEND_URL, API_PURCHASES_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

/**
 * Posts a new purchase to the API.
 *
 * This function sends a POST request to the backend API to create a new purchase.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {CreationPurchase} newPurchase - The data for the new purchase.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * postPurchase(newPurchaseData)
 *   .then(response => console.log("Purchase created:", response.message))
 *   .catch(error => console.error("Error creating purchase:", error));
 */
export async function postPurchase(newPurchase: CreationPurchase) {

    url.pathname = API_PURCHASES_PATHNAME

    const response = await axios.post(url.toString(), newPurchase)

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }

}
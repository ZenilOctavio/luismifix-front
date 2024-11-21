import { CreationPurchase } from "@/types/purchases/Purchase";
import axios from "axios";
import { BACKEND_URL, API_PURCHASES_PATHNAME, API_PURCHASES_ENABLE_PATHNAME, API_PURCHASES_DISABLE_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

/**
 * Updates an existing purchase in the API.
 *
 * This function sends a PUT request to the backend API to update a purchase's data.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {string} purchaseId - The ID of the purchase to update.
 * @param {CreationPurchase} newPurchaseData - The new data for the purchase.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * updatePurchase(purchaseId, newPurchaseData)
 *   .then(response => console.log("Purchase updated:", response.message))
 *   .catch(error => console.error("Error updating purchase:", error));
 */
export async function updatePurchase(purchaseId: string, newPurchaseData: CreationPurchase) {
    console.log(arguments)

    url.pathname = `${API_PURCHASES_PATHNAME}/${purchaseId}`

    console.log(url)

    const response = await axios.put(url.toString(), newPurchaseData)

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }

}

/**
 * Enables a purchase in the API.
 *
 * This function sends a PUT request to the backend API to enable a purchase.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {string} purchaseId - The ID of the purchase to enable.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * enablePurchase(purchaseId)
 *   .then(response => console.log("Purchase enabled:", response.message))
 *   .catch(error => console.error("Error enabling purchase:", error));
 */
export async function enablePurchase(purchaseId: string) {

    url.pathname = `${API_PURCHASES_ENABLE_PATHNAME}/${purchaseId}`

    const response = await axios.put(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }

}

/**
 * Disables a purchase in the API.
 *
 * This function sends a PUT request to the backend API to disable a purchase.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {string} purchaseId - The ID of the purchase to disable.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * disablePurchase(purchaseId)
 *   .then(response => console.log("Purchase disabled:", response.message))
 *   .catch(error => console.error("Error disabling purchase:", error));
 */
export async function disablePurchase(purchaseId: string) {

    url.pathname = `${API_PURCHASES_DISABLE_PATHNAME}/${purchaseId}`

    const response = await axios.put(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }

}
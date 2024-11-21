import axios from "axios"
import { BACKEND_URL, API_PURCHASES_FOR_PRODUCT_PATHNAME, API_PURCHASES_FOR_PROVIDER_PATHNAME } from "@/config/constants";
import { Purchase } from "@/types/purchases/Purchase";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

/**
 * Retrieves a list of purchases for a specific provider from the API.
 *
 * This function sends a GET request to the backend API to fetch purchases associated with a provider.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {string} providerId - The ID of the provider whose purchases to retrieve.
 * @returns {Promise<Array<Purchase>>} A promise that resolves to an array of purchases.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * getPurchasesForProvider(providerId)
 *   .then(purchases => console.log("Purchases for provider:", purchases))
 *   .catch(error => console.error("Error fetching purchases for provider:", error));
 */
export async function getPurchasesForProvider(providerId: string) {
    url.pathname = `${API_PURCHASES_FOR_PROVIDER_PATHNAME}/${providerId}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<Purchase>
}

/**
 * Retrieves a list of purchases for a specific product from the API.
 *
 * This function sends a GET request to the backend API to fetch purchases associated with a product.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {string} productId - The ID of the product whose purchases to retrieve.
 * @returns {Promise<Array<Purchase>>} A promise that resolves to an array of purchases.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * getPurchasesForProduct(productId)
 *   .then(purchases => console.log("Purchases for product:", purchases))
 *   .catch(error => console.error("Error fetching purchases for product:", error));
 */
export async function getPurchasesForProduct(productId: string) {
    url.pathname = `${API_PURCHASES_FOR_PRODUCT_PATHNAME}/${productId}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<Purchase>
}

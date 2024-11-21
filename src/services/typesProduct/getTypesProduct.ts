import axios from "axios"
import { BACKEND_URL, API_TYPES_PRODUCT_PATHNAME } from "@/config/constants";
import { ProductType } from "@/types/products/ProductType";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

/**
 * Fetches the list of product types from the backend API.
 *
 * This function sends a GET request to retrieve product types.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @returns {Promise<ProductType[]>} A promise that resolves to an array of product types.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * getTypesProduct()
 *   .then(productTypes => console.log("Product types:", productTypes))
 *   .catch(error => console.error("Error fetching product types:", error));
 */
export async function getTypesProduct() {
    url.pathname = API_TYPES_PRODUCT_PATHNAME

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<ProductType>
}
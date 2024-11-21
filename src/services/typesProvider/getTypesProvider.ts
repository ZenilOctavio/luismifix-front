import axios from "axios"
import { BACKEND_URL, API_TYPES_PROVIDER_PATHNAME } from "@/config/constants";
import { TypeProvider } from "@/types/providers/typeProvider";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

/**
 * Fetches the list of provider types from the backend API.
 *
 * This function sends a GET request to retrieve provider types.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @returns {Promise<TypeProvider[]>} A promise that resolves to an array of provider types.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * getTypesProviders()
 *   .then(providerTypes => console.log("Provider types:", providerTypes))
 *   .catch(error => console.error("Error fetching provider types:", error));
 */
export async function getTypesProviders() {
    url.pathname = API_TYPES_PROVIDER_PATHNAME

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<TypeProvider>
}
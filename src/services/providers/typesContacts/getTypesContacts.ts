import axios from "axios"
import { BACKEND_URL, API_TYPES_PROVIDER_CONTACT_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { TypeContact } from "@/types/providers/TypeContact";

const url = new URL(BACKEND_URL)

/**
 * Fetches the types of provider contacts from the API.
 *
 * This function sends a GET request to the backend API to retrieve a list of
 * contact types. If the request fails, it throws an error with a message from
 * the server response.
 *
 * @returns {Promise<TypeContact[]>} A promise that resolves to an array of contact types.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * getTypesContacts()
 *   .then(types => console.log("Contact Types:", types))
 *   .catch(error => console.error("Error fetching contact types:", error));
 */
export async function getTypesContacts() {
    url.pathname = API_TYPES_PROVIDER_CONTACT_PATHNAME

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<TypeContact>
}
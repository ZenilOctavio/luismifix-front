import axios from "axios";
import { BACKEND_URL, API_PROVIDERS_PATHNAME, API_PROVIDER_POST_CONTACTS_PATHNAME } from "@/config/constants";
import { CreationProvider } from "@/types/providers/Provider";
import { ErrorResponse } from "@/types/ErrorResponse";
import { CreationProvidersContact } from "@/types/providers/Contact";

const url = new URL(BACKEND_URL)

/**
 * Creates a new provider in the API.
 *
 * This function sends a POST request to the backend API to create a new provider.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {CreationProvider} newProvider - The provider data to create.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * createProvider(newProviderData)
 *   .then(response => console.log("Provider created:", response.message))
 *   .catch(error => console.error("Error creating provider:", error));
 */
export async function createProvider(newProvider: CreationProvider) {
    url.pathname = API_PROVIDERS_PATHNAME

    const response = await axios.post(url.toString(), newProvider)

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }
}

/**
 * Creates a new provider contact in the API.
 *
 * This function sends a POST request to the backend API to create a new provider contact.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {CreationProvidersContact} newProviderContact - The provider contact data to create.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * createProviderContact(newProviderContactData)
 *   .then(response => console.log("Provider contact created:", response.message))
 *   .catch(error => console.error("Error creating provider contact:", error));
 */
export async function createProviderContact(newProviderContact: CreationProvidersContact) {
    url.pathname = API_PROVIDER_POST_CONTACTS_PATHNAME

    const response = await axios.post(url.toString(), newProviderContact)

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }
}
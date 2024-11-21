import axios from "axios";
import { BACKEND_URL, API_PROVIDERS_PATHNAME, API_PROVIDER_CONTACTS_PATHNAME, API_PROVIDER_POST_CONTACTS_PATHNAME } from "@/config/constants";
import { CreationProvider } from "@/types/providers/Provider";
import { ErrorResponse } from "@/types/ErrorResponse";
import { CreationProvidersContact, EditProvidersContact } from "@/types/providers/Contact";

const url = new URL(BACKEND_URL)

/**
 * Updates an existing provider in the API.
 *
 * This function sends a PUT request to the backend API to update a provider's data.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {string} id - The ID of the provider to update.
 * @param {CreationProvider} newProviderData - The new provider data.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * updateProvider(providerId, newProviderData)
 *   .then(response => console.log("Provider updated:", response.message))
 *   .catch(error => console.error("Error updating provider:", error));
 */
export async function updateProvider(id: string, newProviderData: CreationProvider) {
    url.pathname = `${API_PROVIDERS_PATHNAME}/${id}`

    const response = await axios.put(url.toString(), newProviderData)

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }
}

/**
 * Updates an existing provider contact in the API.
 *
 * This function sends a PUT request to the backend API to update a provider contact's data.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {string} id - The ID of the provider contact to update.
 * @param {CreationProvidersContact} newProviderContactData - The new provider contact data.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * updateProviderContact(contactId, newProviderContactData)
 *   .then(response => console.log("Provider contact updated:", response.message))
 *   .catch(error => console.error("Error updating provider contact:", error));
 */
export async function updateProviderContact(id: string, newProviderContactData: CreationProvidersContact) {
    url.pathname = `${API_PROVIDER_CONTACTS_PATHNAME}/${id}`

    const response = await axios.put(url.toString(), newProviderContactData)

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }
}

/**
 * Enables a provider in the API.
 *
 * This function sends a PUT request to the backend API to enable a provider.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {string} id - The ID of the provider to enable.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * enableProvider(providerId)
 *   .then(response => console.log("Provider enabled:", response.message))
 *   .catch(error => console.error("Error enabling provider:", error));
 */
export async function enableProvider(id: string) {
    url.pathname = `${API_PROVIDERS_PATHNAME}/enable/${id}`

    const response = await axios.put(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }
}

/**
 * Disables a provider in the API.
 *
 * This function sends a PUT request to the backend API to disable a provider.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {string} id - The ID of the provider to disable.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * disableProvider(providerId)
 *   .then(response => console.log("Provider disabled:", response.message))
 *   .catch(error => console.error("Error disabling provider:", error));
 */
export async function disableProvider(id: string) {
    url.pathname = `${API_PROVIDERS_PATHNAME}/disable/${id}`

    const response = await axios.put(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { message: string }
}

/**
 * Updates an existing provider contact in the API.
 *
 * This function sends a PUT request to the backend API to update a provider contact's data.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {string} id - The ID of the provider contact to update.
 * @param {EditProvidersContact} values - The new provider contact data.
 * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * updateContact(contactId, newValues)
 *   .then(response => console.log("Contact updated:", response.message))
 *   .catch(error => console.error("Error updating contact:", error));
 */
export async function updateContact(id: string, values: EditProvidersContact) {
    url.pathname = `${API_PROVIDER_POST_CONTACTS_PATHNAME}/${id}`

    const response = await axios.put(url.toString(), values)

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as { mesage: string }
}

/**
 * Disables a provider contact in the API.
 *
 * This function sends a PUT request to the backend API to disable a provider contact.
 * If the request fails, it catches the error and returns the error response data.
 *
 * @param {string} id - The ID of the provider contact to disable.
 * @returns {Promise<any>} A promise that resolves to the response data or an error object.
 * 
 * @example
 * 
 * disableContact(contactId)
 *   .then(response => console.log("Contact disabled:", response))
 *   .catch(error => console.error("Error disabling contact:", error));
 */
export async function disableContact(id: string) {
    url.pathname = `${API_PROVIDER_POST_CONTACTS_PATHNAME}/disable/${id}`

    try {
        const response = await axios.put(url.toString())
        return response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data
        }
    }
}
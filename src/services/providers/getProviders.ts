import axios from "axios"
import { BACKEND_URL } from "@/config/constants";
import { API_PROVIDERS_PATHNAME, API_PROVIDER_BY_NAME_PATHNAME, API_PROVIDER_CONTACTS_PATHNAME, API_PROVIDER_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { Provider } from "@/types/providers/Provider";
import { ProvidersContact } from "@/types/providers/Contact";

const url = new URL(BACKEND_URL)

/**
 * Fetches all providers from the API.
 *
 * This function sends a GET request to the backend API to retrieve a list of providers.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @returns {Promise<Provider[]>} A promise that resolves to an array of providers.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * getProviders()
 *   .then(providers => console.log("Providers:", providers))
 *   .catch(error => console.error("Error fetching providers:", error));
 */
export async function getProviders(): Promise<Provider[]> {
    url.pathname = API_PROVIDERS_PATHNAME

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    const providers = response.data as Array<Provider>

    return providers
}

/**
 * Fetches a provider from the API based on a specific pathname and value.
 *
 * @param {string} pathname - The pathname for the API endpoint.
 * @param {string} value - The value to search for (e.g., provider ID or name).
 * @returns {Promise<Provider | Provider[]>} A promise that resolves to the provider data.
 * 
 * @throws {Error} Throws an error if the request fails.
 */
async function getProvider(pathname: string, value: string) {
    url.pathname = `${pathname}/${value}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Provider | Array<Provider>
}

/**
 * Fetches providers by their name.
 *
 * @param {string} name - The name of the provider to fetch.
 * @returns {Promise<Provider[]>} A promise that resolves to an array of providers.
 * 
 * @throws {Error} Throws an error if the request fails.
 */
export async function getProvidersByName(name: string) {
    const providers = await getProvider(API_PROVIDER_BY_NAME_PATHNAME, name) as Array<Provider>
    return providers
}

/**
 * Fetches a single provider by their name.
 *
 * @param {string} name - The name of the provider to fetch.
 * @returns {Promise<Provider | undefined>} A promise that resolves to the first provider found or undefined if none found.
 * 
 * @throws {Error} Throws an error if the request fails.
 */
export async function getProviderByName(name: string) {
    const providers = await getProvidersByName(name) as Array<Provider>
    return providers[0]
}

/**
 * Fetches a provider by their ID.
 *
 * @param {string} id - The ID of the provider to fetch.
 * @returns {Promise<Provider>} A promise that resolves to the provider data.
 * 
 * @throws {Error} Throws an error if the request fails.
 */
export async function getProviderById(id: string) {
    return await getProvider(API_PROVIDER_PATHNAME, id) as Provider
}

/**
 * Fetches contacts for a specific provider by their ID.
 *
 * @param {string} id - The ID of the provider to fetch contacts for.
 * @returns {Promise<ProvidersContact[]>} A promise that resolves to an array of provider contacts.
 * 
 * @throws {Error} Throws an error if the request fails.
 */
export async function getProviderContacts(id: string) {
    url.pathname = `${API_PROVIDER_CONTACTS_PATHNAME}/${id}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<ProvidersContact>
}

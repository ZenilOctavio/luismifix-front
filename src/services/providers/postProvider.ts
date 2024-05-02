import axios from "axios";
import { BACKEND_URL, API_PROVIDERS_PATHNAME, API_PROVIDER_POST_CONTACTS_PATHNAME } from "@/config/constants";
import { CreationProvider } from "@/types/providers/Provider";
import { ErrorResponse } from "@/types/ErrorResponse";
import { CreationProvidersContact } from "@/types/providers/Contact";

const url = new URL(BACKEND_URL)

export async function createProvider(newProvider: CreationProvider){
    url.pathname = API_PROVIDERS_PATHNAME

    const response = await axios.post(url.toString(),newProvider)

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {message: string}
}

export async function createProviderContact(newProviderContact: CreationProvidersContact){
    url.pathname = API_PROVIDER_POST_CONTACTS_PATHNAME

    const response = await axios.post(url.toString(),newProviderContact)

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {message: string}
}
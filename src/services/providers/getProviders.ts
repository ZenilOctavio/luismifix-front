import axios from "axios"
import { BACKEND_URL } from "@/config/constants";
import { API_PROVIDERS_PATHNAME, API_PROVIDER_BY_NAME_PATHNAME, API_PROVIDER_CONTACTS_PATHNAME, API_PROVIDER_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { Provider } from "@/types/providers/Provider";

const url = new URL(BACKEND_URL)

export async function getProviders() {
    url.pathname = API_PROVIDERS_PATHNAME

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<Provider>
}

async function getProvider(pathname: string, value: string){
    url.pathname = `${pathname}/${value}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Provider | Array<Provider>
}

export async function getProvidersByName(name: string) {
    const providers = await getProvider(API_PROVIDER_BY_NAME_PATHNAME, name) as Array<Provider>
    return providers
}

export async function getProviderByName(name: string) {
    const providers = await getProvidersByName(name) as Array<Provider>
    return providers[0]
}

export async function getProviderById(id: string){
    return await getProvider(API_PROVIDER_PATHNAME, id)
}

export async function getProviderContacts(id: string){
    url.pathname = `${API_PROVIDER_CONTACTS_PATHNAME}/${id}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data
}
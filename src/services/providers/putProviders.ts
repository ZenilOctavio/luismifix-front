import axios from "axios";
import { BACKEND_URL, API_PROVIDERS_PATHNAME, API_PROVIDER_CONTACTS_PATHNAME, API_PROVIDER_POST_CONTACTS_PATHNAME } from "@/config/constants";
import { CreationProvider } from "@/types/providers/Provider";
import { ErrorResponse } from "@/types/ErrorResponse";
import { CreationProvidersContact, EditProvidersContact } from "@/types/providers/Contact";

const url = new URL(BACKEND_URL)

export async function updateProvider(id: string ,newProviderData: CreationProvider){
    url.pathname = `${API_PROVIDERS_PATHNAME}/${id}`

    const response = await axios.put(url.toString(), newProviderData)

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {message: string}
}

export async function updateProviderContact(id: string, newProviderContactData: CreationProvidersContact){
    url.pathname = `${API_PROVIDER_CONTACTS_PATHNAME}/${id}`

    const response = await axios.put(url.toString(), newProviderContactData)

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {message: string}
}

export async function enableProvider(id: string){
    url.pathname = `${API_PROVIDERS_PATHNAME}/enable/${id}`

    const response = await axios.put(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {message: string}
}

export async function disableProvider(id: string){
    url.pathname = `${API_PROVIDERS_PATHNAME}/disable/${id}`

    const response = await axios.put(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {message: string}
}

export async function updateContact(id: string, values: EditProvidersContact){
    url.pathname = `${API_PROVIDER_POST_CONTACTS_PATHNAME}/${id}`

    const response = await axios.put(url.toString(), values)

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as {mesage: string}
}

export async function disableContact(id: string){
    url.pathname = `${API_PROVIDER_POST_CONTACTS_PATHNAME}/disable/${id}`

    try{
        const response = await axios.put(url.toString())
        return response.data
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.data
        }
    }
}
import axios from "axios";
import { BACKEND_URL, API_PROVIDERS_PATHNAME } from "@/config/constants";
import { CreationProvider } from "@/types/providers/Provider";
import { ErrorResponse } from "@/types/ErrorResponse";

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
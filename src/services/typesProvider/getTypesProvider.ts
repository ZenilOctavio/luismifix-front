import axios from "axios"
import { BACKEND_URL, API_TYPES_PROVIDER_PATHNAME } from "@/config/constants";
import { TypeProvider } from "@/types/providers/typeProvider";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

export async function getTypesProviders() {
    url.pathname = API_TYPES_PROVIDER_PATHNAME

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<TypeProvider>
}
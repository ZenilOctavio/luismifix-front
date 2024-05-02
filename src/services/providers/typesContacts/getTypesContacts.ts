import axios from "axios"
import { BACKEND_URL, API_TYPES_PROVIDER_CONTACT_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { TypeContact } from "@/types/providers/TypeContact";

const url = new URL(BACKEND_URL)

export async function getTypesContacts() {
    url.pathname = API_TYPES_PROVIDER_CONTACT_PATHNAME

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<TypeContact>
}
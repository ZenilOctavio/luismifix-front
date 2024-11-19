import { BACKEND_URL, API_TYPES_USER_PATHNAME } from "@/config/constants";
import axios from "axios";
import { ErrorResponse } from "@/types/ErrorResponse";


const url = new URL(BACKEND_URL)

export async function getTypesOfUser() {

    url.pathname = API_TYPES_USER_PATHNAME

    const response = await axios.get(url.toString())


    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    const typesOfUser = response.data as Array<string>

    return typesOfUser
}
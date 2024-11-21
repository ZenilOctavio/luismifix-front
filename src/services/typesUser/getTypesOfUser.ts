import { BACKEND_URL, API_TYPES_USER_PATHNAME } from "@/config/constants";
import axios from "axios";
import { ErrorResponse } from "@/types/ErrorResponse";


const url = new URL(BACKEND_URL)

/**
 * Fetches the list of user types from the backend API.
 *
 * This function sends a GET request to retrieve user types.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of user types.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * getTypesOfUser ()
 *   .then(userTypes => console.log("User  types:", userTypes))
 *   .catch(error => console.error("Error fetching user types:", error));
 */
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
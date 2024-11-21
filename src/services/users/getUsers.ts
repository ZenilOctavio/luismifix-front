import axios from "axios";
import { BACKEND_URL, API_USERS_PATHNAME } from "@/config/constants";
import { User } from "@/types/users/User";
import { ErrorResponse } from '@/types/ErrorResponse';

axios.defaults.withCredentials = true
const url = new URL(BACKEND_URL)

/**
 * Fetches a list of users from the backend API.
 *
 * This function sends a GET request to retrieve all users. If the request fails,
 * it throws an error with a message from the server response.
 *
 * @returns {Promise<Array<User>>} A promise that resolves to an array of User objects.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * getUsers()
 *   .then(users => console.log("Users:", users))
 *   .catch(error => console.error("Error fetching users:", error));
 */
export async function getUsers(): Promise<Array<User>> {
    url.pathname = API_USERS_PATHNAME

    const response = await axios.get(url.toString())


    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    const users = response.data as Array<User>


    // console.log(users)
    return users
}

import axios from "axios";
import { User } from "@/types/users/User"
import { BACKEND_URL, API_USERS_PATHNAME, API_USERS_BY_USERNAME_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

/**
 * Fetches a user or an array of users from the backend API based on the provided pathname and value.
 *
 * This function sends a GET request to retrieve user data. If the request fails,
 * it throws an error with a message from the server response.
 *
 * @param {string} pathname - The API pathname to fetch the user from.
 * @param {string} value - The identifier (e.g., ID or username) to specify which user to fetch.
 * @returns {Promise<User | Array<User>>} A promise that resolves to a User object or an array of User objects.
 * 
 * @throws {Error} Throws an error if the request fails.
 */
async function getUser(pathname: string, value: string): Promise<User | Array<User>> {
    url.pathname = pathname + `/${value}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    const user = response.data as User

    return user
}

/**
 * Fetches a user by their ID from the backend API.
 *
 * This function calls the `getUser ` function with the appropriate pathname to fetch a user by ID.
 *
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<User>} A promise that resolves to the User object.
 * 
 * @throws {Error} Throws an error if the request fails or if the user is not found.
 * 
 * @example
 * 
 * getUser ById("12345")
 *   .then(user => console.log("User :", user))
 *   .catch(error => console.error("Error fetching user:", error));
 */
export async function getUserById(id: string): Promise<User> {

    const user = await getUser(API_USERS_PATHNAME, id) as User
    return user
}

/**
 * Fetches a user by their username from the backend API.
 *
 * This function calls the `getUser ` function with the appropriate pathname to fetch a user by username.
 *
 * @param {string} username - The username of the user to fetch.
 * @returns {Promise<User>} A promise that resolves to the User object.
 * 
 * @throws {Error} Throws an error if the request fails or if the user is not found.
 * 
 * @example
 * 
 * getUser ByUsername("john_doe")
 *   .then(user => console.log("User :", user))
 *   .catch(error => console.error("Error fetching user:", error));
 */
export async function getUserByUsername(username: string): Promise<User> {

    const user = await getUser(API_USERS_BY_USERNAME_PATHNAME, username) as Array<User>

    return user[0]
}


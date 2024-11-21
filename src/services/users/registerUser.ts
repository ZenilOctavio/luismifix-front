import { RegisterUser } from "@/types/users/RegisterUser";
import axios from "axios";
import { BACKEND_URL, API_REGISTER_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { SessionResponse } from "@/types/session/SessionResponse";

const url = new URL(BACKEND_URL)

/**
 * Registers a new user by sending their information to the backend API.
 *
 * This function sends a POST request with the new user's data. If the request fails,
 * it throws an error with a message from the server response.
 *
 * @param {RegisterUser } newUser  - The user information to register, conforming to the RegisterUser  interface.
 * @returns {Promise<SessionResponse>} A promise that resolves to a SessionResponse object upon successful registration.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * const newUser  = {
 *     username: "john_doe",
 *     password: "securePassword123",
 *     email: "john@example.com"
 * };
 * 
 * registerUser (newUser )
 *   .then(response => console.log("Registration successful:", response))
 *   .catch(error => console.error("Error registering user:", error));
 */
export async function registerUser(newUser: RegisterUser): Promise<SessionResponse> {
    url.pathname = API_REGISTER_PATHNAME

    const response = await axios.post(url.toString(), newUser)

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse
        throw new Error(error.message)
    }

    const successMessage = response.data as SessionResponse

    return successMessage
}
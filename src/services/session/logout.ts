import { API_LOGOUT_PATHNAME, BACKEND_URL } from "@/config/constants";
import { SessionResponse } from "@/types/session/SessionResponse";
import axios from 'axios'

/**
 * Logs out the currently authenticated user.
 *
 * This function sends a POST request to the backend API to log out the user.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @returns {Promise<SessionResponse>} A promise that resolves to the session response confirming the logout.
 * 
 * @throws {Error} Throws an error if the logout fails.
 * 
 * @example
 * 
 * logout()
 *   .then(response => console.log("Logged out successfully:", response))
 *   .catch(error => console.error("Logout error:", error));
 */
export async function logout(): Promise<SessionResponse> {

    const url = new URL(BACKEND_URL)
    url.pathname = API_LOGOUT_PATHNAME

    const response = await axios.post(url.toString(), {}, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = response.data as SessionResponse

    if (response.status > 299 && response.status < 200)
        throw new Error(data.message)

    return data
}
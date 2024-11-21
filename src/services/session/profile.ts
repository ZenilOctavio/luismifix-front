import { API_PROFILE_PATHNAME, BACKEND_URL } from "@/config/constants";
import { ProfileResponse, SessionResponse } from "@/types/session/SessionResponse";
import axios from 'axios'

/**
 * Fetches the profile of the currently authenticated user.
 *
 * This function sends a GET request to the backend API to retrieve the user's profile.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @returns {Promise<ProfileResponse>} A promise that resolves to the user's profile data.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * profile()
 *   .then(profileData => console.log("Profile data:", profileData))
 *   .catch(error => console.error("Profile fetch error:", error));
 */
export async function profile(): Promise<ProfileResponse> {

    const url = new URL(BACKEND_URL)
    url.pathname = API_PROFILE_PATHNAME

    const response = await axios.get(url.toString(), {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = response.data as ProfileResponse
    console.log(data)

    if (response.status > 299 || response.status < 200) {
        const error = response.data as SessionResponse
        throw new Error(error.message)
    }

    return data
}
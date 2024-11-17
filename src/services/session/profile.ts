import { API_PROFILE_PATHNAME, BACKEND_URL } from "@/config/constants";
import { ProfileResponse, SessionResponse } from "@/types/session/SessionResponse";
import axios from 'axios'

export async function profile(): Promise<ProfileResponse> {

    const url = new URL(BACKEND_URL)
    url.pathname = API_PROFILE_PATHNAME

    const response = await axios.get(url.toString(), {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = response.data as ProfileResponse
    if (response.status > 299 || response.status < 200) {
        const error = response.data as SessionResponse
        throw new Error(error.message)
    }

    return data
}
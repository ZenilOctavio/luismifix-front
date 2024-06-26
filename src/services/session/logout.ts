import { API_LOGOUT_PATHNAME, BACKEND_URL } from "@/config/constants";
import { SessionResponse } from "@/types/session/SessionResponse";
import axios from 'axios'

export async function logout(): Promise<SessionResponse> {

    const url = new URL(BACKEND_URL)
    url.pathname = API_LOGOUT_PATHNAME
    
    const response = await axios.post(url.toString(),{}, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = response.data as SessionResponse
    
    if (response.status > 299 && response.status < 200)
        throw new Error(data.message)
    
    return data
}
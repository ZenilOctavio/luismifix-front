import { RegisterUser } from "@/types/users/RegisterUser";
import axios from "axios";
import { BACKEND_URL, API_REGISTER_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { SessionResponse } from "@/types/session/SessionResponse";

const url = new URL(BACKEND_URL)

export async function registerUser(newUser: RegisterUser): Promise<SessionResponse>{
    url.pathname = API_REGISTER_PATHNAME

    const response = await axios.post(url.toString(), newUser)
    
    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse
        throw new Error(error.message)
    }

    const successMessage = response.data as SessionResponse

    return successMessage



}
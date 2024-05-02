import axios from "axios";
import { BACKEND_URL, API_USERS_PATHNAME } from "@/config/constants";
import { User } from "@/types/users/User";
import { ErrorResponse } from '@/types/ErrorResponse';

axios.defaults.withCredentials = true
const url = new URL(BACKEND_URL)

export async function getUsers(): Promise<Array<User>> {
    url.pathname = API_USERS_PATHNAME
    
    const response = await axios.get(url.toString())


    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }
    
    const users = response.data as Array<User>
    
    
    // console.log(users)
    return users
}

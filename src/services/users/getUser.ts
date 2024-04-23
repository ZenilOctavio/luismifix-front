import axios from "axios";
import { User } from "@/types/users/User"
import { BACKEND_URL, API_USERS_PATHNAME, API_USERS_BY_USERNAME_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

async function getUser(pathname: string, value: string): Promise<User | Array<User>>{
    url.pathname = pathname + `/${value}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299){
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    const user = response.data as User

    return user
}

export async function getUserById(id: string): Promise<User> {

    const user = await getUser(API_USERS_PATHNAME, id) as User
    return user
}

export async function getUserByUsername(username: string): Promise<User> {

    const user = await getUser(API_USERS_BY_USERNAME_PATHNAME, username) as Array<User>

    return user[0]
}


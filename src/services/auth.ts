import { BACKEND_URL, API_LOGIN_PATHNAME } from "@/config/constants";

export interface ResponseLoginJson{
    message: string
}

export async function authenticate(username: string, password: string): Promise<ResponseLoginJson> {

    const url = new URL(BACKEND_URL)
    url.pathname = API_LOGIN_PATHNAME
    
    const request = new Request(url,{
        body: JSON.stringify({username, password}),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const response = await fetch(request)

    if (response.ok){
        return await response.json()
    }
    
    const error = await response.json()
    throw new Error(error.message)
}
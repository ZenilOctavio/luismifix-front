import { BACKEND_URL, API_LOGIN_PATHNAME } from "@/config/constants";
import { SessionResponse } from "@/types/session/SessionResponse";
import axios from "axios";

axios.defaults.withCredentials = true;

export async function authenticate(username: string, password: string): Promise<SessionResponse> {

  const url = new URL(BACKEND_URL)
  url.pathname = API_LOGIN_PATHNAME

  const response = await axios.post(url.toString(), { username, password }, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    }
  });
  const data = response.data as SessionResponse
  console.log(response.headers['set-cookie'])

  if (response.status > 299 || response.status < 200)
    throw new Error(data.message)

  return data
}
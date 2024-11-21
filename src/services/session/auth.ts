import { BACKEND_URL, API_LOGIN_PATHNAME } from "@/config/constants";
import { SessionResponse } from "@/types/session/SessionResponse";
import axios from "axios";

axios.defaults.withCredentials = true;

/**
 * Authenticates a user with the given username and password.
 *
 * This function sends a POST request to the backend API to authenticate the user.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<SessionResponse>} A promise that resolves to the session response containing authentication details.
 * 
 * @throws {Error} Throws an error if the authentication fails.
 * 
 * @example
 * 
 * authenticate(username, password)
 *   .then(session => console.log("Authenticated successfully:", session))
 *   .catch(error => console.error("Authentication error:", error));
 */
export async function authenticate(username: string, password: string): Promise<SessionResponse> {

  const url = new URL(BACKEND_URL)
  url.pathname = API_LOGIN_PATHNAME
  console.log(url)

  const response = await axios.post(url.toString(), { username, password }, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    }
  });
  const data = response.data as SessionResponse
  console.log(response)
  console.log(response.headers['set-cookie'])

  if (response.status > 299 && response.status < 200)
    throw new Error(data.message)

  return data
}
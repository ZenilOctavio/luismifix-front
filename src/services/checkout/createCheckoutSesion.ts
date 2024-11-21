import { BACKEND_URL, API_CHECKOUT_SESSION_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import axios from "axios";

const url = new URL(BACKEND_URL)

/**
 * Initiates the creation of a checkout session for a specified user.
 *
 * This function constructs a request to the backend API to create a checkout session
 * for the user identified by the provided user ID. If the request is unsuccessful, it
 * throws an error with the message returned from the backend.
 *
 * @param {string} userId - The ID of the user for whom the checkout session is to be created.
 * 
 * @returns {Promise<any>} A promise that resolves to the response data containing
 * the checkout session details if the request is successful.
 * 
 * @throws {Error} Throws an error if the request fails or if the response status
 * indicates an error.
 * 
 * @example
 * 
 * const userId = "123";
 * createCheckoutSessionService(userId)
 *   .then(response => console.log("Checkout session created:", response))
 *   .catch(error => console.error("Error creating checkout session:", error.message));
 */
export async function createCheckoutSessionService(userId: string) {
  url.pathname = API_CHECKOUT_SESSION_PATHNAME

  const response = await axios.post(url.toString(), { userId })

  if (response.status < 200 || response.status > 299) {
    const error = response.data as ErrorResponse

    throw new Error(error.message)
  }

  return response
}
import axios from "axios"
import { API_GET_CART_PATHNAME, BACKEND_URL } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { CartServiceResponse } from "@/types/cart/CartServiceResponse";

const url = new URL(BACKEND_URL)

/**
 * Retrieves the shopping cart for a specified user.
 *
 * This function constructs a request to the backend API to fetch the cart details
 * for a given user ID. If the request is unsuccessful, it throws an error with the 
 * message returned from the backend.
 *
 * @param {string} userId - The ID of the user whose cart is to be retrieved.
 * 
 * @returns {Promise<CartServiceResponse>} A promise that resolves to the cart details
 * if the request is successful.
 * 
 * @throws {Error} Throws an error if the request fails or if the response status
 * indicates an error.
 * 
 * @example
 * 
 * const userId = "123";
 * getCartService(userId)
 *   .then(cart => console.log("Cart details:", cart))
 *   .catch(error => console.error("Error retrieving cart:", error.message));
 */
export async function getCartService(userId: string) {
  url.pathname = API_GET_CART_PATHNAME.replace(':userId', userId)

  const response = await axios.get(url.toString())

  if (response.status < 200 || response.status > 299) {
    const error = response.data as ErrorResponse

    throw new Error(error.message)
  }

  return response.data as CartServiceResponse
}

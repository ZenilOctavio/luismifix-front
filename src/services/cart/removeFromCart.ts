import axios from "axios"
import { API_REMOVE_FROM_CART_PATHNAME, BACKEND_URL } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { CartServiceResponse } from "@/types/cart/CartServiceResponse";

const url = new URL(BACKEND_URL)

/**
 * Sends a request to remove an item from the shopping cart.
 *
 * This function constructs a request to the backend API to remove a specified item
 * from the user's cart. It expects the item details including user ID and product ID.
 * If the request is unsuccessful, it throws an error with the message returned from the backend.
 *
 * @param {Object} item - The item to be removed from the cart.
 * @param {string} item.userId - The ID of the user removing the item from the cart.
 * @param {string} item.productId - The ID of the product to be removed.
 * 
 * @returns {Promise<CartServiceResponse>} A promise that resolves to the response data
 * containing updated cart details if the request is successful.
 * 
 * @throws {Error} Throws an error if the request fails or if the response status
 * indicates an error.
 * 
 * @example
 * 
 * const itemToRemove = { userId: "123", productId: "456" };
 * removeFromCartService(itemToRemove)
 *   .then(response => console.log("Item removed from cart:", response))
 *   .catch(error => console.error("Error removing item from cart:", error.message));
 */
export async function removeFromCartService(item: { userId: string, productId: string }) {
  url.pathname = API_REMOVE_FROM_CART_PATHNAME

  const response = await axios.request({
    method: 'DELETE',
    url: url.toString(),
    data: item
  })

  if (response.status < 200 || response.status > 299) {
    const error = response.data as ErrorResponse

    throw new Error(error.message)
  }

  return response.data as CartServiceResponse

}
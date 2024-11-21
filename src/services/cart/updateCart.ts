import axios from "axios"
import { API_UPDATE_CART_PATHNAME, BACKEND_URL } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { CartServiceResponse } from "@/types/cart/CartServiceResponse";

const url = new URL(BACKEND_URL)

/**
 * Sends a request to update the quantity of an item in the shopping cart.
 *
 * This function constructs a request to the backend API to update the quantity
 * of a specified item in the user's cart. It expects the item details including
 * user ID, product ID, and the new quantity. If the request is unsuccessful, it
 * throws an error with the message returned from the backend.
 *
 * @param {Object} item - The item to be updated in the cart.
 * @param {string} item.userId - The ID of the user updating the item in the cart.
 * @param {string} item.productId - The ID of the product to be updated.
 * @param {number} item.quantity - The new quantity of the product.
 * 
 * @returns {Promise<CartServiceResponse>} A promise that resolves to the response data
 * containing updated cart details if the request is successful.
 * 
 * @throws {Error} Throws an error if the request fails or if the response status
 * indicates an error.
 * 
 * @example
 * 
 * const itemToUpdate = { userId: "123", productId: "456", quantity: 3 };
 * updateCartService(itemToUpdate)
 *   .then(response => console.log("Cart updated:", response))
 *   .catch(error => console.error("Error updating cart:", error.message));
 */
export async function updateCartService(item: { userId: string, productId: string, quantity: number }) {
  url.pathname = API_UPDATE_CART_PATHNAME

  const response = await axios.put(url.toString(), item)

  if (response.status < 200 || response.status > 299) {
    const error = response.data as ErrorResponse

    throw new Error(error.message)
  }

  return response.data as CartServiceResponse

}
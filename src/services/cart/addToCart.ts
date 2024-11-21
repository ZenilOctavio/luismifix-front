import axios from "axios"
import { API_ADD_TO_CART_PATHNAME, BACKEND_URL } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { CartServiceResponse } from "@/types/cart/CartServiceResponse";

const url = new URL(BACKEND_URL)

/**
 * Sends a request to add an item to the shopping cart.
 *
 * This function constructs a request to the backend API to add a specified item
 * to the user's cart. It expects the item details including user ID, product ID,
 * and quantity. If the request is unsuccessful, it throws an error with the message
 * returned from the backend.
 *
 * @param {Object} item - The item to be added to the cart.
 * @param {string} item.userId - The ID of the user adding the item to the cart.
 * @param {string} item.productId - The ID of the product to be added.
 * @param {number} item.quantity - The quantity of the product to be added.
 * 
 * @returns {Promise<CartServiceResponse>} A promise that resolves to the response data
 * containing cart details if the request is successful.
 * 
 * @throws {Error} Throws an error if the request fails or if the response status
 * indicates an error.
 * 
 * @example
 * 
 * const itemToAdd = { userId: "123", productId: "456", quantity: 2 };
 * addToCartService(itemToAdd)
 *   .then(response => console.log("Item added to cart:", response))
 *   .catch(error => console.error("Error adding item to cart:", error.message));
 */
export async function addToCartService(item: { userId: string, productId: string, quantity: number }) {
  url.pathname = API_ADD_TO_CART_PATHNAME

  const response = await axios.post(url.toString(), item)

  if (response.status < 200 || response.status > 299) {
    const error = response.data as ErrorResponse

    throw new Error(error.message)
  }

  return response.data as CartServiceResponse

}
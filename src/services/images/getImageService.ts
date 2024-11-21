import { API_IMAGES_GET, BACKEND_URL } from "@/config/constants"
import axios from "axios"

const url = new URL(BACKEND_URL)

export interface ImageData {
  date: string
  idProduct: string
  idUser: string
  productImage: { type: 'Buffer', data: Array<number> }
}

/**
 * Fetches image data for a specific product.
 *
 * This function sends a GET request to the backend API to retrieve image data
 * associated with the specified product ID. It returns the data as an array of
 * `ImageData` objects.
 *
 * @param {string} productId - The ID of the product for which to fetch image data.
 * 
 * @returns {Promise<ImageData[]>} A promise that resolves to an array of image data
 * for the specified product if the request is successful.
 * 
 * @example
 * 
 * const productId = "123";
 * getImageService(productId)
 *   .then(images => console.log("Product images:", images))
 *   .catch(error => console.error("Error fetching product images:", error));
 */

export async function getImageService(productId: string) {
  url.pathname = `${API_IMAGES_GET}/${productId}`

  const response = await axios.get(url.toString())



  return response.data as ImageData[]
}
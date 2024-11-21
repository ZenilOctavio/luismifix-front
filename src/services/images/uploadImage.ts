import { API_IMAGES_UPLOAD, BACKEND_URL } from "@/config/constants"
import axios from "axios"

const url = new URL(BACKEND_URL)

/**
 * Uploads an image for a specific product and user.
 *
 * This function sends a POST request to the backend API to upload an image
 * associated with the specified product ID and user ID. The image is sent as
 * multipart/form-data.
 *
 * @param {File} image - The image file to be uploaded.
 * @param {string} idProduct - The ID of the product to which the image is associated.
 * @param {string} idUser  - The ID of the user uploading the image.
 * 
 * @returns {Promise<any>} A promise that resolves to the response data from the upload request.
 * 
 * @throws {Error} Throws an error if the upload fails.
 * 
 * @example
 * 
 * const imageFile = document.getElementById('fileInput').files[0]; // Assuming there's an input element
 * const productId = "123";
 * const userId = "456";
 * uploadImageService(imageFile, productId, userId)
 *   .then(response => console.log("Image uploaded successfully:", response))
 *   .catch(error => console.error("Error uploading image:", error));
 */
export async function uploadImageService(image: File, idProduct: string, idUser: string) {
  url.pathname = API_IMAGES_UPLOAD + '/' + idProduct + '/' + idUser

  const formData = new FormData()
  formData.append('productImage', image)

  const response = await axios.post(url.toString(), Object.fromEntries(formData.entries()), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response
}
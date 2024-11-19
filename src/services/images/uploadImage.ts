import { API_IMAGES_UPLOAD, BACKEND_URL } from "@/config/constants"
import axios from "axios"

const url = new URL(BACKEND_URL)

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
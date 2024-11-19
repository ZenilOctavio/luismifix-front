import { API_IMAGES_GET, BACKEND_URL } from "@/config/constants"
import axios from "axios"

const url = new URL(BACKEND_URL)

export interface ImageData {
  date: string
  idProduct: string
  idUser: string
  productImage: { type: 'Buffer', data: Array<number> }
}

export async function getImageService(productId: string) {
  url.pathname = `${API_IMAGES_GET}/${productId}`

  const response = await axios.get(url.toString())



  return response.data as ImageData[]
}
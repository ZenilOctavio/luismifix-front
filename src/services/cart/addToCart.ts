import axios from "axios"
import { API_ADD_TO_CART_PATHNAME, BACKEND_URL } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { CartServiceResponse } from "@/types/cart/CartServiceResponse";

const url = new URL(BACKEND_URL)

export async function addToCartService(item: { userId: string, productId: string, quantity: number }) {
  url.pathname = API_ADD_TO_CART_PATHNAME

  const response = await axios.post(url.toString(), item)

  if (response.status < 200 || response.status > 299) {
    const error = response.data as ErrorResponse

    throw new Error(error.message)
  }

  return response.data as CartServiceResponse

}
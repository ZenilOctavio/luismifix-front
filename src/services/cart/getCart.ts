import axios from "axios"
import { API_GET_CART_PATHNAME, BACKEND_URL } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { CartServiceResponse } from "@/types/cart/CartServiceResponse";

const url = new URL(BACKEND_URL)

export async function getCartService(userId: string) {
  url.pathname = API_GET_CART_PATHNAME.replace(':userId', userId)

  const response = await axios.get(url.toString())

  if (response.status < 200 || response.status > 299) {
    const error = response.data as ErrorResponse

    throw new Error(error.message)
  }

  return response.data as CartServiceResponse
}

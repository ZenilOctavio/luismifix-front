import axios from "axios"
import { API_REMOVE_FROM_CART_PATHNAME, BACKEND_URL } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import { CartServiceResponse } from "@/types/cart/CartServiceResponse";

const url = new URL(BACKEND_URL)

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
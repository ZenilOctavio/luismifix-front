import axios from "axios"
import { API_PRODUCTS_BY_TYPE_PATHNAME, BACKEND_URL } from "@/config/constants";
import { Product } from "@/types/products/Product";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

export async function getProductsByType(typeId: string) {
  url.pathname = API_PRODUCTS_BY_TYPE_PATHNAME + '/' + typeId

  const response = await axios.get(url.toString())

  if (response.status < 200 || response.status > 299) {
    const error = response.data as ErrorResponse

    throw new Error(error.message)
  }


  return response.data as Array<Product>

}
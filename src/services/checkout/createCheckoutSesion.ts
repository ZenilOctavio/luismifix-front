import { BACKEND_URL, API_CHECKOUT_SESSION_PATHNAME } from "@/config/constants";
import { ErrorResponse } from "@/types/ErrorResponse";
import axios from "axios";

const url = new URL(BACKEND_URL)

export async function createCheckoutSessionService(userId: string) {
  url.pathname = API_CHECKOUT_SESSION_PATHNAME

  const response = await axios.post(url.toString(), { userId })

  if (response.status < 200 || response.status > 299) {
    const error = response.data as ErrorResponse

    throw new Error(error.message)
  }

  return response
}
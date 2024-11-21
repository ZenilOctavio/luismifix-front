import axios from "axios"
import { BACKEND_URL, API_PRODUCTS_PATHNAME, API_PRODUCTS_BY_ID_PATHNAME, API_PRODUCTS_BY_NAME_PATHNAME } from "@/config/constants";
import { Product } from "@/types/products/Product";
import { ErrorResponse } from "@/types/ErrorResponse";

const url = new URL(BACKEND_URL)

/**
 * Fetches all products from the API.
 *
 * This function sends a GET request to the backend API to retrieve a list of products.
 * If the request fails, it throws an error with a message from the server response.
 *
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 * 
 * @throws {Error} Throws an error if the request fails.
 * 
 * @example
 * 
 * getProducts()
 *   .then(products => console.log("Products:", products))
 *   .catch(error => console.error("Error fetching products:", error));
 */
export async function getProducts() {
    url.pathname = API_PRODUCTS_PATHNAME

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data as Array<Product>
}

/**
 * Fetches a product from the API based on a specific pathname and value.
 *
 * @param {string} pathname - The pathname for the API endpoint.
 * @param {string} value - The value to search for (e.g., product ID or name).
 * @returns {Promise<any>} A promise that resolves to the product data.
 * 
 * @throws {Error} Throws an error if the request fails.
 */
async function getProduct(pathname: string, value: string) {
    url.pathname = `${pathname}/${value}`

    const response = await axios.get(url.toString())

    if (response.status < 200 || response.status > 299) {
        const error = response.data as ErrorResponse

        throw new Error(error.message)
    }

    return response.data
}

/**
 * Fetches a product by its ID.
 *
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Product>} A promise that resolves to the product data.
 * 
 * @throws {Error} Throws an error if the request fails.
 */
export async function getProductById(id: string) {
    const data = await getProduct(API_PRODUCTS_BY_ID_PATHNAME, id) as Product
    return data
}

/**
 * Fetches products by their name.
 *
 * @param {string} name - The name of the product to fetch.
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 * 
 * @throws {Error} Throws an error if the request fails.
 */
export async function getProductByName(name: string) {
    const data = await getProduct(API_PRODUCTS_BY_NAME_PATHNAME, name) as Array<Product>
    return data
}


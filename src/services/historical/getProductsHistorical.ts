import { API_PRODUCTS_HISTORICAL_PATHNAME, BACKEND_URL } from "@/config/constants";
import { ProductsHistoricalData } from "@/types/historical/ProductsHistoricalData";
import axios from "axios";

const url = new URL(BACKEND_URL)

/**
 * Fetches all historical data for products.
 *
 * This function sends a GET request to the backend API to retrieve historical data
 * for all products. If the request is successful, it returns the data as an array
 * of `ProductsHistoricalData`. If an error occurs during the request, it logs the error
 * and returns the error response data if available.
 * 
 * @returns {Promise<ProductsHistoricalData[] | undefined>} A promise that resolves to an array
 * of historical product data if the request is successful. Returns undefined if an error occurs.
 * 
 * @example
 * 
 * getAllProductsHistoricalData()
 *   .then(data => console.log("Historical product data:", data))
 *   .catch(error => console.error("Error fetching historical product data:", error));
 */
export async function getAllProductsHistoricalData() {
    url.pathname = API_PRODUCTS_HISTORICAL_PATHNAME

    try {
        const response = await axios.get(url.toString())
        return response.data as ProductsHistoricalData[]
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            console.error(err)
            return err.response?.data
        }
    }


}
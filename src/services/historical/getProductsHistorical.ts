import { API_PRODUCTS_HISTORICAL_PATHNAME, BACKEND_URL } from "@/config/constants";
import { ProductsHistoricalData } from "@/types/historical/ProductsHistoricalData";
import axios from "axios";

const url = new URL(BACKEND_URL)

export async function getAllProductsHistoricalData(){
    url.pathname = API_PRODUCTS_HISTORICAL_PATHNAME

    try{
        const response = await axios.get(url.toString())
        return response.data as ProductsHistoricalData[]
    }
    catch(err){
        if(axios.isAxiosError(err)){
            console.error(err)
            return err.response?.data
        }
    }


}
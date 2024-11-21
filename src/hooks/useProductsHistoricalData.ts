import { getAllProductsHistoricalData } from "@/services/historical/getProductsHistorical";
import { ProductsHistoricalData } from "@/types/historical/ProductsHistoricalData";
import { useQuery } from "@tanstack/react-query";

/**
 * A hook that fetches and manages historical data for products.
 * It uses React Query for efficient data fetching and caching.
 * @returns An object containing the historical data and a flag indicating whether the data is currently being fetched.
 */
export function useProductsHistoricalData() {



    const { data: historicalData, isFetching: isFetchingHistoricalData } = useQuery<ProductsHistoricalData[]>({
        initialData: [],
        queryKey: ['productsHistoricalData'],
        queryFn: getAllProductsHistoricalData,
    })

    return {
        historicalData,
        isFetchingHistoricalData
    }
}
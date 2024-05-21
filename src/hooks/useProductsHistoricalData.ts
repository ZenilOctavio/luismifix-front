import { getAllProductsHistoricalData } from "@/services/historical/getProductsHistorical";
import { ProductsHistoricalData } from "@/types/historical/ProductsHistoricalData";
import { useQuery } from "@tanstack/react-query";

export function useProductsHistoricalData(){

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
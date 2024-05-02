import { Product } from "@/types/products/Product";
import { ProductType } from "@/types/products/ProductType";
import { useContext, createContext, useState, Dispatch } from "react";

interface ProductsContextType{
    products?: Product[]
    setProducts?: Dispatch<Product[]>
    productTypes?: ProductType[]
    setProductTypes?: Dispatch<ProductType[]>
}

export const ProductsContext = createContext<ProductsContextType>({})

export const useProductsContext = (): ProductsContextType => {
    
    const context = useContext(ProductsContext) as ProductsContextType
    if (!context) {
        throw new Error('useProvidersContext must be used within an ProvidersProvider')
    }
    return context 
}

export const ProductsProvider  = ({children}:{children: any}) => {

    const [products, setProducts] = useState<Product[]>([])
    const [productTypes, setProductTypes] = useState<ProductType[]>([])

    return (
        <ProductsContext.Provider value={{products, setProducts, productTypes, setProductTypes}}>
            {children}
        </ProductsContext.Provider>
    )

}
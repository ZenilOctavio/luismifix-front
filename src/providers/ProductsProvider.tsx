import { Product } from "@/types/products/Product";
import { ProductType } from "@/types/products/ProductType";
import { Purchase } from "@/types/purchases/Purchase";
import { useContext, createContext, useState, Dispatch } from "react";

interface ProductsContextType {
    products?: Product[]
    setProducts?: Dispatch<Product[]>
    productTypes?: ProductType[]
    setProductTypes?: Dispatch<ProductType[]>
    purchasesForProducts?: Record<string, Purchase[]>
    setPurchasesForProducts?: Dispatch<Record<string, Purchase[]>>
}

export const ProductsContext = createContext<ProductsContextType>({})

export const useProductsContext = (): ProductsContextType => {

    const context = useContext(ProductsContext) as ProductsContextType
    if (!context) {
        throw new Error('useProvidersContext must be used within an ProvidersProvider')
    }
    return context
}

/**
 * Provides product context to the application.
 * @param children - React children to render within the provider.
 * @returns - A ProductsProvider component.
 */

export const ProductsProvider = ({ children }: { children: any }) => {

    const [products, setProducts] = useState<Product[]>([])
    const [productTypes, setProductTypes] = useState<ProductType[]>([])
    const [purchasesForProducts, setPurchasesForProducts] = useState<Record<string, Purchase[]>>({})


    return (
        <ProductsContext.Provider value={{ products, setProducts, productTypes, setProductTypes, purchasesForProducts, setPurchasesForProducts }}>
            {children}
        </ProductsContext.Provider>
    )

}
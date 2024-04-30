import { CreationProduct, Product } from "@/types/products/Product";
import { useState, useEffect, Dispatch } from "react";
import { useProductsContext } from "@/providers/ProductsProvider";
import { ProductType } from "@/types/products/ProductType";
import { getProducts, getProductById, getProductByName } from "@/services/products/getProducts";
import { getTypesProduct } from "@/services/typesProduct/getTypesProduct";
import { createProduct as createProductService } from "@/services/products/postProducts";
import { updateProduct as updateProductService, disableProduct as disableProductService, enableProduct as enableProductService } from "@/services/products/putProduct";

export default function useProducts(){

    let products: Product[] = []
    let setProducts: Dispatch<Product[]> = () => {}

    let productTypes: ProductType[] = []
    let setProductTypes: Dispatch<ProductType[]> = () => {}

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const refreshProducts = async () => {
        setIsLoading(true)

        const newProducts = await getProducts()
        setProducts(newProducts)
        
        setIsLoading(false)
    }

    const refreshProductTypes = async () => {
        setIsLoading(true)
        
        const newProductTypes = await getTypesProduct()
        setProductTypes(newProductTypes)
        
        setIsLoading(false)
    }

    const getProduct = async (field: 'name' | 'id', value: string): Promise<Product> => {
        setIsLoading(true)
        let product: Product

        if (field == "id") product = await getProductById(value)
        else  product = (await getProductByName(value))[0]
    
        setIsLoading(false)
        return product
    }

    const createProduct = async (newProduct: CreationProduct): Promise<Product | undefined> => {
        setIsLoading(true)

        await createProductService(newProduct)

        const newProductCreated = await getProduct('name', newProduct.nameProduct)

        if(!newProductCreated) return undefined

        setProducts([...products, newProductCreated])

        setIsLoading(false)

        return newProductCreated
    }

    const updateProduct = async (originalProduct: Product, newDataProduct: CreationProduct): Promise<Product | undefined> => {
        setIsLoading(true)

        await updateProductService(originalProduct._id, newDataProduct)
        refreshProducts()

        const newProductUpdated = await getProduct('name', newDataProduct.nameProduct)

        if(!newProductUpdated) return undefined

        setIsLoading(false)

        return newProductUpdated

    }

    const enableProduct = async (product: Product) => {
        setIsLoading(true)

        await enableProductService(product._id)
        refreshProducts()

        setIsLoading(false)
    }

    const disableProduct = async (product: Product) => {
        setIsLoading(true)

        await disableProductService(product._id)
        refreshProducts()

        setIsLoading(false)
    }
    

    try{
        const context = useProductsContext()
        if(Object.keys(context).length == 0) throw new Error('No ProductsContext reached')

        if(context){
            console.log('Using context')
            products = context.products!
            setProducts = context.setProducts!
            productTypes = context.productTypes!
            setProductTypes = context.setProductTypes!
        }
    }
    catch(err){
        console.log(err, 'Using independent state')
        const state = useState<Product[]>([])
        products = state[0]
        setProducts = state[1]
        const typesState = useState<ProductType[]>([])
        productTypes = typesState[0]
        setProductTypes = typesState[1]
    }

    useEffect(() => {
        refreshProducts()
        refreshProductTypes()
    }, [])

    return {
        products,
        refreshProducts,
        refreshProductTypes,
        createProduct,
        updateProduct,
        disableProduct,
        enableProduct,
        productTypes,
        isLoading
    }
}
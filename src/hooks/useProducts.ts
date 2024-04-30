import { CreationProduct, Product } from "@/types/products/Product";
import { useState, useEffect, Dispatch } from "react";
import { useProductsContext } from "@/providers/ProductsProvider";
import { ProductType } from "@/types/products/ProductType";
import { getProducts, getProductById, getProductByName } from "@/services/products/getProducts";
import { getTypesProduct } from "@/services/typesProduct/getTypesProduct";
import { createProduct as createProductService } from "@/services/products/postProducts";
import { updateProduct as updateProductService, disableProduct as disableProductService, enableProduct as enableProductService } from "@/services/products/putProduct";

import { postPurchase as createPurchaseService } from "@/services/purchases/postPurchases";

import { 
    getPurchasesForProduct, 
    getPurchasesForProvider 
} from "@/services/purchases/getPurchases";

import { 
    updatePurchase as updatePurchaseService, 
    enablePurchase as enablePurchaseService ,
    disablePurchase as disablePurchaseService 
} from "@/services/purchases/putPurchases";
import { CreationPurchase, Purchase } from "@/types/purchases/Purchase";
import { Provider } from "@/types/providers/Provider";

export default function useProducts(){

    let products: Product[] = []
    let setProducts: Dispatch<Product[]> = () => {}

    let productTypes: ProductType[] = []
    let setProductTypes: Dispatch<ProductType[]> = () => {}

    const [purchasesForProducts, setPurchaseForProduct] = useState<Record<string, Purchase[]>>({})
    const [purchasesForProvider, setPurchaseForProvider] = useState<Record<string, Purchase[]>>({})
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
    
    const searchPurchasesForProduct = async (product: Product) => {
        setIsLoading(true)

        const purchases = await getPurchasesForProduct(product._id)

        const newPurchases = {...purchasesForProducts}
        newPurchases[product._id] = purchases

        setPurchaseForProduct(newPurchases)

        setIsLoading(false)

        return purchases
    }

    const searchPurchasesForProvider = async (provider: Provider) => {
        setIsLoading(true)

        const purchases = await getPurchasesForProvider(provider._id)

        const newPurchases = {...purchasesForProducts}
        newPurchases[provider._id] = purchases

        setPurchaseForProvider(newPurchases)

        setIsLoading(false)

        return purchases
    }

    const updatePurchase = async (purchase: Purchase, newPurchaseData: CreationPurchase) => {
        setIsLoading(true)
        await updatePurchaseService(purchase.__id, newPurchaseData)
        
        searchPurchasesForProduct(purchase.idProduct)
        searchPurchasesForProvider(purchase.idProvider)

        setIsLoading(false)
    }

    const enablePurchase = async (purchase: Purchase) => {
        setIsLoading(true)
        await enablePurchaseService(purchase.__id)
        setIsLoading(false)
    }

    const disablePurchase = async (purchase: Purchase) => {
        setIsLoading(true)
        await disablePurchaseService(purchase.__id)
        setIsLoading(false)
    }

    const createPurchase = async (purchase: CreationPurchase) => {
        setIsLoading(true)
        
        await createPurchaseService(purchase)

        const product = await getProduct('id', purchase.idProduct)
        if(product){
            searchPurchasesForProduct(product)
        }
        
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
        searchPurchasesForProduct,
        searchPurchasesForProvider,
        purchasesForProducts,
        purchasesForProvider,
        updatePurchase,
        disablePurchase,
        enablePurchase,
        createPurchase,
        isLoading
    }
}
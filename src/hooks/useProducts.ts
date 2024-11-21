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
    enablePurchase as enablePurchaseService,
    disablePurchase as disablePurchaseService
} from "@/services/purchases/putPurchases";
import { CreationPurchase, Purchase } from "@/types/purchases/Purchase";
import { Provider } from "@/types/providers/Provider";
/**
 * A hook that provides functionalities for managing products, including fetching, creating, updating, enabling, disabling, and searching products.
 * It also manages product types and purchases related to products.
 * The hook uses React's useState and useEffect hooks, along with custom services for interacting with the backend API.
 * It leverages React Query for efficient data fetching and caching.
 * @returns An object containing functions and state variables for managing products, product types, and purchases.
 */
export default function useProducts() {

    let products: Product[] = []
    let setProducts: Dispatch<Product[]> = () => { }

    let productTypes: ProductType[] = []
    let setProductTypes: Dispatch<ProductType[]> = () => { }

    let purchasesForProducts: Record<string, Purchase[]>
    let setPurchasesForProducts: Dispatch<Record<string, Purchase[]>>

    let [purchasesForProvider, setPurchaseForProvider] = useState<Record<string, Purchase[]>>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const refreshProducts = async () => {
        setIsLoading(true)

        const newProducts = await getProducts()
        setProducts(newProducts)

        setIsLoading(false)

        return newProducts
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
        else product = (await getProductByName(value))[0]

        setIsLoading(false)
        return product
    }

    const createProduct = async (newProduct: CreationProduct): Promise<Product | undefined> => {
        setIsLoading(true)

        await createProductService(newProduct)

        const newProductCreated = await getProduct('name', newProduct.nameProduct)

        if (!newProductCreated) return undefined

        setProducts([...products, newProductCreated])

        setIsLoading(false)

        return newProductCreated
    }

    const updateProduct = async (originalProduct: Product, newDataProduct: CreationProduct): Promise<Product | undefined> => {
        setIsLoading(true)

        await updateProductService(originalProduct._id, newDataProduct)
        refreshProducts()

        const newProductUpdated = await getProduct('name', newDataProduct.nameProduct)

        if (!newProductUpdated) return undefined

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

    const searchPurchasesForProduct = async (product: Product | string) => {
        console.log('searching purchases for product')

        setIsLoading(true)
        let productId
        if (typeof product == 'string')
            productId = product
        else
            productId = product._id
        const purchases = await getPurchasesForProduct(productId)

        const newPurchases = { ...purchasesForProducts }
        newPurchases[productId] = purchases

        console.log(purchases)

        setPurchasesForProducts(newPurchases)

        setIsLoading(false)

        return purchases
    }

    const searchPurchasesForProvider = async (provider: Provider) => {
        setIsLoading(true)

        const purchases = await getPurchasesForProvider(provider._id)

        const newPurchases = { ...purchasesForProducts }
        newPurchases[provider._id] = purchases

        setPurchaseForProvider(newPurchases)

        setIsLoading(false)

        return purchases
    }

    const updatePurchase = async (purchase: Purchase, newPurchaseData: CreationPurchase) => {
        setIsLoading(true)
        await updatePurchaseService(purchase._id, newPurchaseData)

        console.log(purchase.idProduct)

        searchPurchasesForProduct(purchase.idProduct)
        searchPurchasesForProvider(purchase.idProvider)

        setIsLoading(false)
    }

    const enablePurchase = async (purchase: Purchase) => {
        setIsLoading(true)
        await enablePurchaseService(purchase._id)
        setIsLoading(false)
    }

    const disablePurchase = async (purchase: Purchase) => {
        setIsLoading(true)
        await disablePurchaseService(purchase._id)
        await searchPurchasesForProduct(purchase.idProduct)
        setIsLoading(false)
    }

    const createPurchase = async (purchase: CreationPurchase) => {
        setIsLoading(true)

        await createPurchaseService(purchase)

        const product = await getProduct('id', purchase.idProduct)
        if (product) {
            searchPurchasesForProduct(product)
        }

        setIsLoading(false)

    }


    try {
        const context = useProductsContext()
        if (Object.keys(context).length == 0) throw new Error('No ProductsContext reached')
        if (!context) throw new Error('No ProductsContext reached')


        console.log('Using context')
        products = context.products!
        setProducts = context.setProducts!
        productTypes = context.productTypes!
        setProductTypes = context.setProductTypes!
        purchasesForProducts = context.purchasesForProducts!
        setPurchasesForProducts = context.setPurchasesForProducts!

    }
    catch (err) {
        console.log(err, 'Using independent state')
        const state = useState<Product[]>([])
        products = state[0]
        setProducts = state[1]

        const typesState = useState<ProductType[]>([])
        productTypes = typesState[0]
        setProductTypes = typesState[1]

        const purchasesState = useState<Record<string, Purchase[]>>({})
        purchasesForProducts = purchasesState[0]
        setPurchasesForProducts = purchasesState[1]
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
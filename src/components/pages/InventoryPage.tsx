import useProducts from "@/hooks/useProducts";
import NavBar from "../NavBar";
import { Product } from "@/types/products/Product";
import useProviders from "@/hooks/useProviders";
import { getPurchasesForProduct, getPurchasesForProvider } from "@/services/purchases/getPurchases";
import { Provider } from "@/types/providers/Provider";
import { AxiosError } from "axios";

export default function InventoryPage(){

    const {products} = useProducts()
    const {providers} = useProviders()

    const handleSearchByProduct = (product: Product) => {
        getPurchasesForProduct(product._id).then((data) => console.log(data))
    }

    const handleSearchByProvider = (provider: Provider) => {
        getPurchasesForProvider(provider._id).then((data) => console.log(data)).catch(err => {
            if (err instanceof AxiosError){
                console.log(err)
            }
        })
    }

    return (
        <>
            <NavBar/>
            <div className="min-w-screen w-screen min-h-screen bg-red-50">
                InventoryPage

            <div className="bg-blue-200">
                <h3>Products</h3>
                <ul>
                    {
                        products &&
                        products.map( product => (
                            <li key={product._id}>
                                <p>{product.nameProduct}</p>
                                <button onClick={() => {handleSearchByProduct(product)}}>Search</button>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="bg-green-200">
                <h3>Providers</h3>
                <ul>
                    {
                        providers &&
                        providers.map( provider => (
                            <li key={provider._id}>
                                <p>{provider.nameProvider}</p>
                                <button onClick={() => {handleSearchByProvider(provider)}}>Search</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
               
            </div>

        </>
    )
}
import useProducts from "@/hooks/useProducts";
import NavBar from "../NavBar";
import { Product } from "@/types/products/Product";

export default function InventoryPage(){

    const {products} = useProducts()

    const product: Product = {
        _id: 'someid',
        __v: 1,
        amountProduct: 200,
        creationDateProduct: new Date(),
        idTypeProduct: {_id: 'someidtype', nameTypeProduct: 'table', __v: 2},
        nameProduct: 'mi productito',
        priceProduct: 500,
        statusProduct: true,
        descriptionProduct: 'ouuyea chacarron chacarron'

    }

    return (
        <>
            <NavBar/>
            <div className="min-w-screen w-screen min-h-screen bg-red-50">
                InventoryPage
                <ul>
                    <li>Lista 1</li>
                    {products && products.map(product => <li key={'lista1-'+product._id + Math.random()}>{product.nameProduct}</li>)}
                </ul>
               
            </div>

        </>
    )
}
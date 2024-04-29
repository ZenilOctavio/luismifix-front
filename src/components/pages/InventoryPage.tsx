import { useEffect } from "react";
import NavBar from "../NavBar";
import { getTypesProduct } from "@/services/typesProduct/getTypesProduct";
import { getProductById, getProducts, getProductByName } from "@/services/products/getProducts";
import { enableProduct, updateProduct, disableProduct } from "@/services/products/putProduct";

export default function InventoryPage(){
    useEffect(() => {
        enableProduct('6622bb0581fef81e18eaeada')
        
    }, [])
    
    return (
        <>
            <NavBar/>
            <div className="min-w-screen w-screen min-h-screen bg-red-50">
                InventoryPage
            </div>

        </>
    )
}
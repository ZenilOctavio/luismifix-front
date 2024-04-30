import { ProductsProvider } from "@/providers/ProductsProvider";
import InventoryPage from "../pages/InventoryPage";

export function InventoryProviders(){

    return (
        <ProductsProvider>
            <InventoryPage>
                
            </InventoryPage>
        </ProductsProvider>
    )
}
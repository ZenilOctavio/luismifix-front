import NavBar from "../NavBar";
import { ProductsTable } from "../inventory/ProductsTable";
import { Toaster } from "../ui/toaster";
export default function InventoryPage(){

    return (
        <>
            <NavBar/>
            <div className="min-w-screen w-screen min-h-screen">
            {/* <DataTableDemo/> */}
            <ProductsTable/>
            
            </div>
            <Toaster/>
        </>
    )
}
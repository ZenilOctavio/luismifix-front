import { useState } from "react";
import NavBar from "../NavBar";
import { ProductsTable } from "../inventory/ProductsTable";
import { Toaster } from "../ui/toaster";
import { Product } from "@/types/products/Product";
import EditProductDialog from "../inventory/EditProductDialog";

export default function InventoryPage(){
    const [ editingProduct, setEditingProduct ] = useState<Product | null>(null)

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product)
    }
    const closeProductEdition = () => {
        setEditingProduct(null)
    }

    const editDialog = <EditProductDialog open={editingProduct? true : false} product={editingProduct!} onOpenChange={closeProductEdition}/>


    
    return (
        <>
            <NavBar/>
            <div className="min-w-screen w-screen min-h-screen">
            {/* <DataTableDemo/> */}
            <ProductsTable onEditProduct={handleEditProduct} />
            { editingProduct && editDialog }
            </div>
            <Toaster/>
        </>
    )
}
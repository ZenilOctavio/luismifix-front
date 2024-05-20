import { useState } from "react";
import NavBar from "../NavBar";
import { ProductsTable } from "../inventory/ProductsTable";
import { Toaster } from "../ui/toaster";
import { Product } from "@/types/products/Product";
import EditProductDialog from "../inventory/EditProductDialog";
import { EditLinksDialog } from "../inventory/EditLinksDialog";
import { ProvidersProvider } from "@/providers/ProvidersProvider";
import { ProductsProvider } from "@/providers/ProductsProvider";

export default function InventoryPage(){
    const [ editingProduct, setEditingProduct ] = useState<Product | null>(null)
    const [ editingLinks, setEditingLinks ] = useState<Product | null>(null)

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product)
    }


    const closeProductEdition = () => {
        setEditingProduct(null)
    }

    const handleEditLinks = (product: Product) => {
        setEditingLinks(product)
    }

    const handleCloseEditLinks = () => {
        setEditingLinks(null)
    }


    const editDialog = <EditProductDialog open={editingProduct? true : false} product={editingProduct!} onOpenChange={closeProductEdition}/>

    const editLinksDialog = <EditLinksDialog open={editingLinks? true: false} product={editingLinks!} onOpenChange={handleCloseEditLinks} />
    
    return (
        <>
            <ProductsProvider>
                <ProvidersProvider>
                    <NavBar/>
                    <div className="min-w-screen w-screen min-h-screen">
                    {/* <DataTableDemo/> */}
                    <ProductsTable onEditProduct={handleEditProduct} onEditLinks={handleEditLinks}/>
                    { editingProduct && editDialog }
                    { editingLinks && editLinksDialog }
                    </div>
                    <Toaster/>
                </ProvidersProvider>
            </ProductsProvider>
        </>
    )
}
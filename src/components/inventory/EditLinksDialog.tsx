import { Product } from "@/types/products/Product";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import useProducts from "@/hooks/useProducts";
import { LinkItem } from "./LinkItem";
import { Skeleton } from "../ui/skeleton";

export function EditLinksDialog({product, open, onOpenChange}:{product: Product, open: boolean, onOpenChange: Function}){

    const { purchasesForProducts, isLoading } = useProducts()

    const handleOpenChange = () => {
        if (onOpenChange) onOpenChange()
    }



    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Administrar links</DialogTitle>
                    <DialogDescription>Links de {product.nameProduct}</DialogDescription>
                </DialogHeader>

                <section>
                    <ul className="flex gap-2 flex-col">
                        {
                            isLoading && (
                                <>
                                    <li className="flex gap-2">
                                        <Skeleton className="w-72 h-10"/>
                                        <Skeleton className="w-16 h-10 ml-auto"/>
                                        <Skeleton className="w-16 h-10"/>
                                    </li>
                                    <li className="flex gap-2">
                                        <Skeleton className="w-72 h-10"/>
                                        <Skeleton className="w-16 h-10 ml-auto"/>
                                        <Skeleton className="w-16 h-10"/>
                                    </li>
                                </>
                            )
                        }

                        {
                            purchasesForProducts[product._id]
                            &&
                            purchasesForProducts[product._id]
                            .filter(purchase => purchase.statusPurchase)
                            .map(purchase => {
                                return (
                                    <LinkItem purchase={purchase} key={purchase._id}/>
                                )
                            })
                        }
                    </ul>

                </section>

            </DialogContent>
        </Dialog>
    )
}
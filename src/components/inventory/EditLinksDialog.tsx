import { Product } from "@/types/products/Product";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import useProducts from "@/hooks/useProducts";
import { LinkItem } from "./LinkItem";
import { Skeleton } from "../ui/skeleton";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import useProviders from "@/hooks/useProviders";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { turnFormattedMoneyStringToNumber } from "@/lib/formating";
import { Button } from "../ui/button";
import { CreationPurchase } from "@/types/purchases/Purchase";
import { toast } from "../ui/use-toast";

export function EditLinksDialog({product, open, onOpenChange}:{product: Product, open: boolean, onOpenChange: () => void}){

    const { purchasesForProducts, isLoading, createPurchase } = useProducts()
    const { providers } = useProviders()

    const handleOpenChange = () => {
        if (onOpenChange) onOpenChange()
    }


    const createPurchaseSchema = z.object({
        idProvider: z.string(),
        linkProvider: z.string().url('No tiene el formato de url'),
        priceProduct: z.string().regex(/^\$\d+(\.\d{2})?$/, 'No tiene el formato de precio')
    })

    const form = useForm<z.infer<typeof createPurchaseSchema>>({
        defaultValues: {
            idProvider: (providers && providers.length)? providers[0]._id : '',
            linkProvider: '',
            priceProduct: '$0.00'
        },
        resolver: zodResolver(createPurchaseSchema)
    })

    const handleSubmitPurchase = (data: z.infer<typeof createPurchaseSchema>) => {
        const createPurchaseData: CreationPurchase = {
            idProduct: product._id,
            idProvider: data.idProvider,
            linkProvider: data.linkProvider,
            priceProduct: turnFormattedMoneyStringToNumber(data.priceProduct)
        }

        createPurchase(createPurchaseData)
        .then(() => {
            toast({
                title: 'Opcion de compra añadida'
            })
            form.reset()
        })
        .catch(() => {
            toast({
                title: 'Error al añadir opcion de compra',
                variant: 'destructive'
            })
        })

    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Administrar links</DialogTitle>
                    <DialogDescription>Links de {product.nameProduct}</DialogDescription>
                </DialogHeader>
                <section>
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(handleSubmitPurchase)}
                            className="flex flex-col gap-4"
                        >
                            <header>
                                {/* <h2 className="text-xl font-bold">Registrar nueva opcion de compra</h2> */}
                            </header>
                            <main className="flex flex-col gap-4">
                                <div className="flex gap-6 justify-evenly">
                                    <FormField
                                        control={form.control}
                                        name="idProvider"
                                        render={
                                            ({field}) => {
                                                return (
                                                    <FormItem className="w-1/2">
                                                        <FormLabel>Proveedor</FormLabel>
                                                        <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecciona a un proveedor"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    providers &&
                                                                    providers.map((provider) => {
                                                                        return (
                                                                            <SelectItem value={provider._id}>{provider.nameProvider}</SelectItem>
                                                                        )
                                                                    })
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                        </FormControl>
                                                    </FormItem>
                                                )
                                            }
                                        }
                                    />
                                  
                                    <FormField
                                        control={form.control}
                                        name="priceProduct"
                                        render={
                                            ({field}) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel>Precio</FormLabel>
                                                        <FormControl>
                                                            <Input {...field}/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )
                                            }
                                        }
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="linkProvider"
                                        render={
                                            ({field}) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel>Link</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="https://link-example.com" {...field}/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )
                                            }
                                        }
                                    />
                                </div>
                            </main>
                            <Button type="submit">Agregar</Button>
                        </form>
                    </Form>
                </section>
                
                <Separator className="mt-4"/>
                
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
                            !isLoading &&
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
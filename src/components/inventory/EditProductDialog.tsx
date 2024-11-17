import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import useProducts from "@/hooks/useProducts";
import { Product, CreationProduct } from "@/types/products/Product";
import { ProductFormSchema } from "@/schemas/product.schema";
import { numbersMiddleware } from "@/lib/numberState.middleware";


interface EditProductDialogProps {
    product: Product
    open: boolean
    onOpenChange: (open: boolean) => void
}



export default function EditProductDialog({ product, open, onOpenChange }: EditProductDialogProps) {

    const { updateProduct, productTypes } = useProducts()

    const form = useForm<z.infer<typeof ProductFormSchema>>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            typeProduct: product.idTypeProduct._id,
            nameProduct: product.nameProduct,
            units: product.amountProduct,
            price: product.priceProduct,
            description: product.descriptionProduct
        }
    })


    const handleSubmitForm = async (data: z.infer<typeof ProductFormSchema>) => {
        try {
            console.log(data)
            const newProductData: CreationProduct = {
                nameProduct: data.nameProduct,
                descriptionProduct: data.description,
                idTypeProduct: data.typeProduct,
                amountProduct: data.units,
                priceProduct: data.price
            }


            const result = await updateProduct(product, newProductData)

            if (!result) throw new Error('No se pudo actualizar al producto')

            toast({
                title: 'Producto actualizado exitosamente'
            })
            onOpenChange(false)
        }
        catch (err) {
            toast({
                title: 'No se pudo actualizar al producto',
                // description: err.message,
                variant: 'destructive'
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-4" >
                <DialogHeader>
                    <DialogTitle>Editar Producto</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form className="flex-col flex gap-4" onSubmit={form.handleSubmit(handleSubmitForm)}>
                        <FormField
                            control={form.control}
                            name="nameProduct"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Escribe el nuevo nombre del proveedor" {...field} maxLength={50} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />

                        <FormField
                            control={form.control}
                            name="typeProduct"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de producto</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona el tipo de proveedor"></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        productTypes ?
                                                            productTypes.map(typeProduct => (
                                                                <SelectItem key={typeProduct._id} value={typeProduct._id}>{typeProduct.nameTypeProduct}</SelectItem>
                                                            ))
                                                            :
                                                            <SelectItem value="0">No hay tipos de producto</SelectItem>
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            ))}
                        />
                        <FormField
                            control={form.control}
                            name="units"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Cantidad</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            {...numbersMiddleware(1_000_000, false,)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            {...numbersMiddleware(1_000_000, false, true)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripcion</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} maxLength={500} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />
                        <Button type="submit">Guardar cambios</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
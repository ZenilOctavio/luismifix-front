import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormItem, FormLabel, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import useProducts from "@/hooks/useProducts";
import { Product, CreationProduct } from "@/types/products/Product";


interface EditProductDialogProps {
    product: Product
    open: boolean
    onOpenChange: (open: boolean) => void
}

const EditProductFormSchema = z.object({
    idTypeProduct: z.string(),
    nameProduct: z.string(),
    amountProduct: z.string(),
    priceProduct: z.string(),
    descriptionProduct: z.string()
})

export default function EditProductDialog({product, open, onOpenChange}: EditProductDialogProps) {

   const { updateProduct, productTypes } = useProducts()

    const form = useForm<z.infer<typeof EditProductFormSchema>>({
        resolver: zodResolver(EditProductFormSchema),
        defaultValues: {
            idTypeProduct: product.idTypeProduct._id,
            nameProduct: product.nameProduct,
            amountProduct: String(product.amountProduct),
            priceProduct: String(product.priceProduct),
            descriptionProduct: product.descriptionProduct
        }
    })


    const handleSubmitForm = async (data: z.infer<typeof EditProductFormSchema>) => {
        try{
            console.log(data)
            const newProductData: CreationProduct = {
                nameProduct: data.nameProduct,
                descriptionProduct: data.descriptionProduct,
                idTypeProduct: data.idTypeProduct,
                amountProduct: Number(data.amountProduct),
                priceProduct: Number(data.priceProduct)
            }


            await updateProduct(product, newProductData)
            toast({
                title: 'Producto actualizado exitosamente'
            })
            onOpenChange(false)
        }
        catch(err){
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
                        render={(({field}) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Escribe el nuevo nombre del proveedor" {...field}/>
                                </FormControl>
                            </FormItem>
                        ))}
                    />
                    
                    <FormField
                        control={form.control}
                        name="idTypeProduct"
                        render={(({field}) => (
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
                                                    productTypes?
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
                        name="amountProduct"
                        render={(({field}) => (
                            <FormItem>
                                <FormLabel>Cantidad</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field}/>
                                </FormControl>
                            </FormItem>
                        ))}
                    />
                    <FormField
                        control={form.control}
                        name="priceProduct"
                        render={(({field}) => (
                            <FormItem>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field}/>
                                </FormControl>
                            </FormItem>
                        ))}
                    />
                    <FormField
                        control={form.control}
                        name="descriptionProduct"
                        render={(({field}) => (
                            <FormItem>
                                <FormLabel>Descripcion</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
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
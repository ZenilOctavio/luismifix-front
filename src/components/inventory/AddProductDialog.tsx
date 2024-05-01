import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { CirclePlus } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { DialogClose } from "@radix-ui/react-dialog"
import useProducts from "@/hooks/useProducts"
import { CreationProduct } from "@/types/products/Product"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,  } from "../ui/select"
import { toast } from "../ui/use-toast"
import { AxiosError } from "axios"
import { ErrorResponse } from "@/types/ErrorResponse"

export function AddProductDialog(){

    const { createProduct, productTypes } = useProducts()

    const AddProductFormSchema = z.object({
        nameProduct: z.string().min(4, "El nombre es requerido"),
        description: z.string().min(10, "La descripción es requerida"),
        link: z.string().url("El link debe ser una url"),
        units: z.string().regex(/[0-9]/),
        price: z.string().regex(/[0-9]/),
        typeProduct: z.string()

    })


    const form = useForm<z.infer<typeof AddProductFormSchema>>({
        resolver: zodResolver(AddProductFormSchema),
        defaultValues: {
            nameProduct: "",
            description: "",
            link: "",
            units: "0",
            price: "0",
            typeProduct: "0"
        }
    })

    const handleSubmit = (data: z.infer<typeof AddProductFormSchema>) => {

        const newProduct: CreationProduct = {
            nameProduct: data.nameProduct,
            descriptionProduct: data.description,
            amountProduct: Number(data.units),
            idTypeProduct: productTypes[Number(data.typeProduct)]._id,
            priceProduct: Number(data.price)
        }

        createProduct(newProduct).then( () => {
            toast({
                title: "Producto creado",
                description: "El producto se ha creado correctamente",
            })
    
        }).catch((err : AxiosError) => {
            if (err.response?.data){
                const errorResponse = err.response.data as ErrorResponse
                const responseMessage = errorResponse.message
    
                toast({
                    title: 'Hubo un error al crear el producto',
                    description: responseMessage? responseMessage : "No se pudo crear el producto",
                    variant: 'destructive'
                })
            }
        })

        console.log(newProduct)
    }
    
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" className="text-slate-800 rounded border-dotted flex gap-4 items-center justify-center">
                <CirclePlus className=""/>
                Añadir producto
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
           <DialogHeader>
                <DialogTitle>Añadir producto</DialogTitle>
           </DialogHeader>
           
           <Form {...form}>
                <form className="p-2 mt-5" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                        name="nameProduct"
                        control={form.control}
                        render={({field}) => {
                            return (
                                <FormItem className="mb-4">
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input className="rounded" placeholder="Nombre del producto" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        name="description"
                        control={form.control}
                        render={({field}) => {
                            return (
                                <FormItem className="mb-4">
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Input className="rounded" placeholder="Añade una descripción" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        name="link"
                        control={form.control}
                        render={({field}) => {
                            return (
                                <FormItem className="mb-4">
                                    <FormLabel>Link de compra</FormLabel>
                                    <FormControl>
                                        <Input className="rounded" placeholder="http://example.com/link" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        name="units"
                        control={form.control}
                        render={({field}) => {
                            return (
                                <FormItem className="mb-4">
                                    <FormLabel>Unidades disponibles</FormLabel>
                                    <FormControl>
                                        <Input className="rounded" type="number" placeholder="Número de unidades en almacén" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}
                    />
                    <FormField
                        name="price"
                        control={form.control}
                        render={({field}) => {
                            return (
                                <FormItem className="mb-4">
                                    <FormLabel>Precio de unidad</FormLabel>
                                    <FormControl>
                                        <Input className="rounded" type="number" placeholder="Número de unidades en almacén" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}
                    />
                    <FormField
                        name="typeProduct"
                        control={form.control}
                        render={({field}) => {
                            return (
                                <FormItem className="mb-4">
                                    <FormLabel>Tipo de producto</FormLabel>
                                    <FormControl>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un tipo"></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Tipos de producto</SelectLabel>
                                                    {
                                                        productTypes &&
                                                        productTypes.map((productType, index) => {
                                                            return (
                                                                <SelectItem key={index} value={String(index)}>{productType.nameTypeProduct}</SelectItem>
                                                            )
                                                        })
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}
                    />
                    <div className="flex mt-6 justify-between">
                        <DialogClose asChild>
                            <Button className="rounded" variant='outline'>Cancelar</Button>
                        </DialogClose>
                        <Button variant='ghost' className="text-white rounded">Guardar</Button>
                    </div>
                </form>
           </Form>

        </DialogContent>
        </Dialog>
    )
}
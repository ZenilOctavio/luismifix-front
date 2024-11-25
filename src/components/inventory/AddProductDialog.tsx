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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "../ui/select"
import { toast } from "../ui/use-toast"
import { AxiosError } from "axios"
import { ErrorResponse } from "@/types/ErrorResponse"
import { numbersMiddleware } from "@/lib/numberState.middleware"
import { ProductFormSchema } from "@/schemas/product.schema"

export function AddProductDialog() {

    const { createProduct, productTypes } = useProducts()



    const form = useForm<z.infer<typeof ProductFormSchema>>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            nameProduct: "",
            description: "",
            units: 0,
            price: 0,
            typeProduct: "0"
        },
        mode: 'onChange'
    })

    const handleSubmit = (data: z.infer<typeof ProductFormSchema>) => {

        const newProduct: CreationProduct = {
            nameProduct: data.nameProduct,
            descriptionProduct: data.description,
            amountProduct: Number(data.units),
            idTypeProduct: productTypes[Number(data.typeProduct)]._id,
            priceProduct: Number(data.price)
        }

        createProduct(newProduct).then(() => {
            toast({
                title: "Producto creado",
                description: "El producto se ha creado correctamente",
            })

            form.reset()

        }).catch((err: AxiosError) => {
            if (err.response?.data) {
                const errorResponse = err.response.data as ErrorResponse
                const responseMessage = errorResponse.message

                toast({
                    title: 'Hubo un error al crear el producto',
                    description: responseMessage ? responseMessage : "No se pudo crear el producto",
                    variant: 'destructive'
                })
            }
        })

        console.log(newProduct)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-foreground rounded border-dotted flex gap-4 items-center justify-center">
                    <CirclePlus />
                    <span className="hidden sm:inline">Añadir producto</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Añadir producto</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form className="p-2 mt-5 " onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            name="nameProduct"
                            control={form.control}

                            render={({ field }) => {
                                return (
                                    <FormItem >
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input className="rounded" placeholder="Nombre del producto" maxLength={51} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem >
                                        <FormLabel>Descripción</FormLabel>
                                        <FormControl>
                                            <Input className="rounded" placeholder="Añade una descripción" maxLength={501} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        {/* <FormField
                            name="link"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem >
                                        <FormLabel>Link de compra</FormLabel>
                                        <FormControl>
                                            <Input className="rounded" placeholder="http://example.com/link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        /> */}

                        <FormField
                            name="units"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem >
                                        <FormLabel>Unidades disponibles</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="rounded"
                                                type="number"
                                                placeholder="Número de unidades en almacén"
                                                {...field}
                                                {...numbersMiddleware(1_000_000, false,)}
                                                maxLength={7}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            name="price"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem >
                                        <FormLabel>Precio de unidad</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="rounded"
                                                type="number"
                                                placeholder="Número de unidades en almacén"
                                                {...numbersMiddleware(1_000_000, false, true)}
                                                {...field}
                                                maxLength={7}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            name="typeProduct"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem >
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
                                        <FormMessage />
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
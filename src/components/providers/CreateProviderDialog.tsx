import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useProviders from "@/hooks/useProviders";
import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { ProviderSchema } from "@/schemas/provider.schema";
import { isAxiosError } from "axios";


interface CreateProviderDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function CreateProviderDialog({ open, onOpenChange }: CreateProviderDialogProps) {

    const { createProvider, typesProviders } = useProviders()



    const form = useForm<z.infer<typeof ProviderSchema>>({
        resolver: zodResolver(ProviderSchema),
        defaultValues: {
            typeProvider: typesProviders[0] ? typesProviders[0]._id : '',
            name: '',
            note: ''
        },
        mode: 'onChange'
    })


    const handleSubmitForm = async (data: z.infer<typeof ProviderSchema>) => {
        createProvider({ idTypeProvider: data.typeProvider, nameProvider: data.name, noteProvider: data.note }, {
            onError: (err) => {
                if (isAxiosError(err)) {
                    toast({ title: 'No se pudo crear al proveedor', description: err.response?.data.message, variant: 'destructive', })
                }
            },
            onSuccess: () => {
                toast({ title: 'Proveedor creado exitosamente' })
                onOpenChange(false)
                form.reset()
            }
        })

    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-4" >
                <DialogHeader>
                    <DialogTitle>Crear Proveedor</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form className="flex-col flex gap-4" onSubmit={form.handleSubmit(handleSubmitForm)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Escribe el nombre" {...field} maxLength={51} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />

                        <FormField
                            control={form.control}
                            name="typeProvider"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de provedor</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona el tipo de proveedor"></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        typesProviders ?
                                                            typesProviders.map(typeProvider => (
                                                                <SelectItem key={typeProvider._id} value={typeProvider._id}>{typeProvider.nameTypeProvider}</SelectItem>
                                                            ))
                                                            :
                                                            <SelectItem value="0">No hay tipos para el proveedor</SelectItem>
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
                            name="note"
                            render={(({ field }) => (
                                <FormItem>
                                    <FormLabel>Nota</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} maxLength={256} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ))}
                        />
                        <Button type="submit">Guardar</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
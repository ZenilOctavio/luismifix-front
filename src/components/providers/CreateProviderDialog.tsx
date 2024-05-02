import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useProviders from "@/hooks/useProviders";
import { Form, FormControl, FormItem, FormLabel, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";


interface CreateProviderDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const CreateProviderFormSchema = z.object({
    idTypeProvider: z.string(),
    nameProvider: z.string(),
    noteProvider: z.string()
})

export default function CreateProviderDialog({open, onOpenChange}: CreateProviderDialogProps) {

    const { createProvider, typesProviders } = useProviders()

    const form = useForm<z.infer<typeof CreateProviderFormSchema>>({
        resolver: zodResolver(CreateProviderFormSchema),
        defaultValues: {
            idTypeProvider: '',
            nameProvider: '',
            noteProvider: ''
        }
    })

    const handleSubmitForm = async (data: z.infer<typeof CreateProviderFormSchema>) => {
        try{
            await createProvider(data)
            toast({
                title: 'Proveedor creado con éxito'
            })
            onOpenChange(false)
        }
        catch(err){
            toast({
                title: 'Couldn`t update the provider',
                // description: err.message,
                variant: 'destructive'
            })
        }
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
                        name="nameProvider"
                        render={(({field}) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Escribe el nombre" {...field}/>
                                </FormControl>
                            </FormItem>
                        ))}
                    />
                    
                    <FormField
                        control={form.control}
                        name="idTypeProvider"
                        render={(({field}) => (
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
                                                    typesProviders?
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
                        name="noteProvider"
                        render={(({field}) => (
                            <FormItem>
                                <FormLabel>Nota</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
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
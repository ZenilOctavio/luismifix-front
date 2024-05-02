import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Provider } from "@/types/providers/Provider";
import useProviders from "@/hooks/useProviders";
import { Form, FormControl, FormItem, FormLabel, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";


interface EditProviderDialogProps {
    provider: Provider
    open: boolean
    onOpenChange: (open: boolean) => void
}

const EditProviderFormSchema = z.object({
    idTypeProvider: z.string(),
    nameProvider: z.string(),
    noteProvider: z.string()
})

export default function EditProviderDialog({provider, open, onOpenChange}: EditProviderDialogProps) {

    const { updateProvider, typesProviders } = useProviders()

    const form = useForm<z.infer<typeof EditProviderFormSchema>>({
        resolver: zodResolver(EditProviderFormSchema),
        defaultValues: {
            idTypeProvider: provider.idTypeProvider._id,
            nameProvider: provider.nameProvider,
            noteProvider: provider.noteProvider
        }
    })

    const currentValues = form.getValues()
    const idTypeProviderChanged = provider.idTypeProvider._id !== currentValues.idTypeProvider
    const nameProviderChanged = provider.nameProvider !== currentValues.nameProvider
    const noteProviderChanged = provider.noteProvider !== currentValues.noteProvider

    const nameProviderNotEmpty = currentValues.nameProvider.length > 0
    const noteProviderNotEmpty = currentValues.noteProvider.length > 0

    const submitable = (idTypeProviderChanged || nameProviderChanged || noteProviderChanged) && nameProviderNotEmpty && noteProviderNotEmpty


    const handleSubmitForm = async (data: z.infer<typeof EditProviderFormSchema>) => {
        try{
            await updateProvider(provider, data)
            toast({
                title: 'Proveedor actualizado exitosamente'
            })
            onOpenChange(false)
        }
        catch(err){
            toast({
                title: 'No se pudo actualizar al proveedor',
                // description: err.message,
                variant: 'destructive'
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] p-4" >
          <DialogHeader>
            <DialogTitle>Editar Proveedor</DialogTitle>
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
                                    <Input placeholder="Escribe el nuevo nombre del proveedor" {...field}/>
                                </FormControl>
                            </FormItem>
                        ))}
                    />
                    
                    <FormField
                        control={form.control}
                        name="idTypeProvider"
                        render={(({field}) => (
                            <FormItem>
                                <FormLabel>Tipo de proveedor</FormLabel>
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
                                                        <SelectItem value="0">No hay tipos de proveedor</SelectItem>
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
                    <Button type="submit" disabled={!submitable}>Guardar cambios</Button>
                </form>
            </Form>
        </DialogContent>
      </Dialog>
    )
}
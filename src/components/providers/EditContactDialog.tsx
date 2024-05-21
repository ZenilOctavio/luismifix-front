import { ProvidersContact } from "@/types/providers/Contact";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import useProviders from "@/hooks/useProviders";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export function EditContactDialog({contact, onCloseEditing}: {contact: ProvidersContact | null, onCloseEditing: (bool: boolean) => void}){

    if (!contact || !onCloseEditing) return <></>
    const isOpen = contact?  true : false;

    const { typeContacts, updateContact } = useProviders()

    const editContactSchema = z.object({
        idTypeContact: z.string(),
        data: z.string()
    })

    const form = useForm<z.infer<typeof editContactSchema>>({
        defaultValues: {
            idTypeContact: contact.idTypeContact._id,
            data: contact.data
        },
        resolver: zodResolver(editContactSchema)
    })

    const handleSubmitEdition = (data: z.infer<typeof editContactSchema>) => {
        console.log(data)

        updateContact(contact, data)
            .then(() => {
                toast({
                    title: 'Contacto actualizado exitosamente'
                })
                onCloseEditing(true)
            })
            .catch(() => {
                toast({
                    title: 'Error al actualizar el contacto',
                    variant: 'destructive'
                })
                form.reset()
            })
        
    }

    const isDataDifferent = () => {
        const values = form.getValues()
        const isTypeContactDifferent = values.idTypeContact != contact.idTypeContact._id
        console.log(values.idTypeContact, contact.idTypeContact._id)

        const isDataDifferent = values.data != contact.data
        console.log(values.data, contact.data)

        return isTypeContactDifferent || isDataDifferent
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onCloseEditing}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Contacto</DialogTitle>
                </DialogHeader>

                <Form
                    {...form}
                >
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={form.handleSubmit(handleSubmitEdition)}
                    >
                       <FormField
                            control={form.control}
                            name="idTypeContact"
                            render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Id del tipo de contacto</FormLabel>
                                        <FormControl>
                                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un tipo de contacto"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        typeContacts &&
                                                        typeContacts.map((typeContact) => {
                                                            return (
                                                                <SelectItem key={typeContact._id} value={typeContact._id}>{typeContact.nameTypeContact}</SelectItem>
                                                            )
                                                        })
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                       />
                        <FormField
                            control={form.control}
                            name="data"
                            render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Dato de contacto</FormLabel>
                                        <FormControl>
                                            <Input {...field}/>
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                        <Button disabled={!isDataDifferent()} type="submit">Guardar cambios</Button>
                    </form>

                </Form>
                
            </DialogContent>
        </Dialog>
    )
}
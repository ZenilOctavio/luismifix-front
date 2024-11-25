import { ProvidersContact } from "@/types/providers/Contact";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import useProviders from "@/hooks/useProviders";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { contactEvaluatorResolver } from "@/lib/contactEvaluator";

export function EditContactDialog({ contact, onCloseEditing }: { contact: ProvidersContact, onCloseEditing: (bool: boolean) => void }) {


    const isOpen = contact ? true : false;

    const { typeContacts, updateContact, disableProviderContact } = useProviders()

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


        const contactType = typeContacts.find((currentTypeContact) => currentTypeContact._id == data.idTypeContact)!
        const evaluator = contactEvaluatorResolver(contactType.nameTypeContact.toLowerCase())
        const evaluation = evaluator.evaluate(data.data)
        if (!evaluation.isValid) {
            form.setError('data', { message: evaluation.message })

            return
        }

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
        const isDataDifferent = values.data != contact.data
        return isTypeContactDifferent || isDataDifferent
    }

    const handleDisableContact = () => {
        disableProviderContact(contact)
            .then(() => {
                toast({
                    title: 'El contacto se eliminó correctamente',
                })
                onCloseEditing(true)
            })
            .catch(() => {
                toast({
                    title: 'El contacto no se pudo eliminar',
                    variant: 'destructive'
                })
            })

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
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Tipo de contacto</FormLabel>
                                        <FormControl>
                                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un tipo de contacto" />
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
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Dato de contacto</FormLabel>
                                        <FormControl>
                                            <Input {...field} maxLength={100} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <Button disabled={!isDataDifferent()} type="submit">Guardar cambios</Button>
                        <Button variant="destructive" type="button" onClick={handleDisableContact}>Eliminar contacto</Button>
                    </form>

                </Form>

            </DialogContent>
        </Dialog>
    )
}
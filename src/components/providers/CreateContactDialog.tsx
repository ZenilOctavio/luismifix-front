import { Provider } from "@/types/providers/Provider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormField, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import useProviders from "@/hooks/useProviders";
import { Input } from "../ui/input";
import { CreationProvidersContact } from "@/types/providers/Contact";
import { toast } from "../ui/use-toast";
import { contactEvaluatorResolver } from "@/lib/contactEvaluator";



export default function CreateContactDialog({ provider, onCreateContact }: { provider: Provider, onCreateContact: () => void }) {

    const { typeContacts, createProviderContact, refreshProvidersContacts } = useProviders()

    const CreateConctactFormSchema = z.object({
        idTypeContact: z.string(),
        data: z.string().min(5, 'El contacto debe tener al menos 5 caracteres')
    })

    const form = useForm<z.infer<typeof CreateConctactFormSchema>>({
        resolver: zodResolver(CreateConctactFormSchema),
        defaultValues: {
            idTypeContact: (typeContacts && typeContacts.length) ? typeContacts[0]._id : '',
            data: ''
        }
    })

    const handleSubmit = (data: z.infer<typeof CreateConctactFormSchema>) => {

        const contactType = typeContacts.find((currentTypeContact) => currentTypeContact._id == data.idTypeContact)!
        const evaluator = contactEvaluatorResolver(contactType.nameTypeContact.toLowerCase())
        const evaluation = evaluator.evaluate(data.data)
        if (!evaluation.isValid) {
            form.setError('data', { message: evaluation.message })
            return
        }

        if (provider) {
            const newProviderContact: CreationProvidersContact = { ...data, idProvider: provider._id }
            console.log(newProviderContact)
            createProviderContact(newProviderContact).then(() => {
                form.reset()

                const typeContact = typeContacts.find((currentTypeContact) => currentTypeContact._id == newProviderContact.idTypeContact)!
                toast({
                    title: 'Contacto creado con exito',
                    description: `${typeContact?.nameTypeContact} ${newProviderContact.data} creado para ${provider?.nameProvider}`
                })
                refreshProvidersContacts(provider)

                form.reset()
                onCreateContact()
            })
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="self-end flex gap-2" variant="outline">
                    <CirclePlus />
                    <span className="hidden xl:inline text-xs">Agregar nuevo contacto</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Agregar nuevo contacto
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
                        <FormField
                            name="idTypeContact"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Tipo de contacto</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione un tipo de contacto" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>

                                                        {
                                                            typeContacts && typeContacts.length ?
                                                                typeContacts.map(typeContact => {
                                                                    return (
                                                                        <SelectItem key={typeContact._id} value={typeContact._id}>{typeContact.nameTypeContact}</SelectItem>
                                                                    )
                                                                })
                                                                :
                                                                <SelectValue placeholder="No se pudo encontrar ningun tipo"></SelectValue>
                                                        }

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            name="data"
                            control={form.control}
                            render={({ field }) => {
                                const currentValues = form.getValues()
                                const typeContact = typeContacts.find((type) => type._id == currentValues.idTypeContact)!

                                if (!typeContact) return <></>

                                const inputsType: Record<string, string> = {
                                    'WhatsApp': 'tel',
                                    'Teléfono': 'tel',
                                    'Correo': 'email'
                                }

                                const inputType = inputsType[typeContact.nameTypeContact]

                                return (
                                    <FormItem>
                                        <FormLabel>{currentValues.idTypeContact ? `Ingresa la información del contacto` : 'Primero elige un tipo de contacto'}</FormLabel>
                                        <FormControl>
                                            <Input type={inputType ? inputType : 'text'}  {...field} maxLength={100} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <div className="flex">
                            <Button
                                className="bg-foreground text-background ml-auto"
                                disabled={form.formState.errors.data != undefined || form.formState.errors.idTypeContact != undefined}
                                type="submit"
                            >
                                Guardar contacto
                            </Button>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )

}
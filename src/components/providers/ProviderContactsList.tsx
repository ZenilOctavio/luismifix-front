import useProviders from "@/hooks/useProviders"
import { ProvidersContact } from "@/types/providers/Contact"
import { Provider } from "@/types/providers/Provider"
import { Phone, Instagram, Mail, Facebook, MessageCircle, Users, Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "../ui/use-toast"
import CreateContactDialog from "./CreateContactDialog"
import { EditContactDialog } from "./EditContactDialog"

export function ProviderContactsList({provider = null}: {provider: Provider | null}){

    const { providersContacts, refreshProvidersContacts } = useProviders()
    const [editingContact, setEditingContact] = useState<ProvidersContact | null>(null)

    const BrandIcons: Record<string, JSX.Element> = {
        'WhatsApp': <Phone/>,
        'Teléfono': <Phone/>,
        'Instagram': <Instagram/>,
        'Correo': <Mail/>,
        'Facebook': <Facebook/>,
        'Messenger': <MessageCircle/>,
        'Tiktok': <Users/>

    }

    useEffect(() => {
        if(provider){
            refreshProvidersContacts(provider)
        }
    }, [provider])

    if(!provider){
        return (
            <div className=" self-start flex flex-col items-center gap-8">
                <h2 className="text-lg font-semibold">Contactos</h2>
                <p className="opacity-80">No hay proveedor activo</p>
            </div>
        )
    }

    const handleCloseEditContact = (bool: boolean) => {
        setEditingContact(null)
    }

    return (
        <>
            <div className=" self-start flex flex-col items-center gap-2 w-full">
                {
                    providersContacts && provider && providersContacts[provider._id] &&
                    providersContacts[provider._id].length?
                    <>
                    <header className="flex gap-4">
                    <div className="flex flex-col self-start">
                        <h2 className="text-lg font-semibold">Contactos</h2>
                        <p>{provider.nameProvider}</p>
                    </div>
                        <CreateContactDialog provider={provider}/>
                    </header>
                        <ul className="flex flex-col gap-4 mt-5 items-stretch w-full">
                            {
                                providersContacts[provider._id].map((contact: ProvidersContact, index) => {
                                    const Icon = BrandIcons[contact.idTypeContact.nameTypeContact]
                                    console.log(Icon)
                                    return (
                                        <li 
                                            key={index} 
                                            className="flex  items-center gap-3 hover:scale-105 transition-transform cursor-pointer border-b-2 pb-2 overflow-hidden  shadow p-2"
                                            onClick={() => { navigator.clipboard.writeText(contact.data).then(
                                                () => {
                                                    toast({
                                                        title: `${contact.idTypeContact.nameTypeContact} copiado al portapapeles`,
                                                        description: contact.data
                                                    })
                                                }
                                            ) }}
                                        >
                                                <figure className="group">
                                                    <span className="group-hover:hidden block">
                                                        {Icon ? Icon : ''}
                                                    </span>
                                                    <span 
                                                        className="group-hover:block hidden"
                                                        onClick={() => {setEditingContact(contact)}}
                                                    >
                                                        <Pencil></Pencil>
                                                    </span>
                                                </figure>
                                            <span className="font-semibold text-sm lg:inline hidden">
                                                {contact.idTypeContact.nameTypeContact}
                                            </span>
                                            <span className="ml-auto text-sm text-ellipsis overflow-hidden">
                                                {
                                                    contact.idTypeContact.nameTypeContact === 'Correo'?
                                                    <a href={`mailto:${contact.data}`}>{contact.data}</a> :
                                                    <>{contact.data}</>
                                                }
                                            </span>
                                        </li>
                                    )
                                })
                                
                            }
                        </ul>
                    </>
                    :
                    <div className=" self-start flex flex-col items-center gap-8">
                        <header className="flex items-center gap-10">
                        <h2 className="text-lg font-semibold">Contactos</h2>
                        <CreateContactDialog provider={provider}/>
                        </header>
                        <p className="opacity-80">No hay contactos para {provider.nameProvider}</p>
                    </div>
                }
                
            </div>
            <EditContactDialog 
                contact={editingContact}
                onCloseEditing={handleCloseEditContact}
            />
        </>
    )
}
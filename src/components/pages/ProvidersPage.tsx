import { ProvidersProvider } from "@/providers/ProvidersProvider"
import ProvidersTable from "../providers/ProvidersTable"
import { Toaster } from "../ui/toaster"
import NavBar from "../NavBar"
import EditProviderDialog from "../providers/EditProviderDialog"
import { useState } from "react"
import { Provider } from "@/types/providers/Provider"
import { ProviderContactsList } from "../providers/ProviderContactsList"
import CreateProviderDialog from "../providers/CreateProviderDialog"
import { Button } from "../ui/button"
import { CirclePlus } from "lucide-react"

export default function ProvidersPage(){

    const [providerEditing, setProviderEditing] = useState<Provider | null>(null)
    const [providerCreating, setProviderCreating] = useState<boolean>(false)
    const [providerContactsShowing, setProviderContactsShowing] = useState<Provider | null>(null)

    const closeProviderEdition = () => {
        setProviderEditing(null)
    }
    const handleProviderEdition = (provider: Provider) => {
        setProviderEditing(provider)
    }

    const handleProviderRowSelection = (provider: Provider) => {
        setProviderContactsShowing(provider)
    }

    const editDialog = <EditProviderDialog open={providerEditing? true : false} provider={providerEditing!} onOpenChange={closeProviderEdition}/>



    return (
        <ProvidersProvider>
            <div className="w-screen min-h-screen">
                <NavBar/>
                <main className="p-4 flex flex-col md:grid grid-flow-col grid-cols-4 grid-rows-5 min-h-screen gap-4">
                    <section className="border rounded p-3 col-start-1 col-end-4 row-start-1 row-end-3">
                        <CreateProviderDialog open={providerCreating} onOpenChange={() => {setProviderCreating(!providerCreating)}}/>
                        <Button 
                            variant="outline" 
                            className="rounded flex gap-4"
                            onClick={() => setProviderCreating(!providerCreating)}
                        >
                            <CirclePlus/>
                            <span>Crear proveedor</span>
                        </Button>
                        <ProvidersTable onEditProvider={handleProviderEdition} onProviderRowSelection={handleProviderRowSelection}/>
                        {providerEditing && editDialog}
                    </section>
                        <div className="col-start-4 border rounded p-2 flex items-center justify-center">
                            <ProviderContactsList provider={providerContactsShowing}/>
                        </div>

                </main>
            <Toaster/>
            </div>
        </ProvidersProvider>
    )
}
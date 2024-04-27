import { ProvidersProvider } from "@/providers/ProvidersProvider"
import ProvidersTable from "../ProvidersTable"
import { Toaster } from "../ui/toaster"
import NavBar from "../NavBar"
import EditProviderDialog from "../providers/EditProviderDialog"
import { useState } from "react"
import { Provider } from "@/types/providers/Provider"

export default function ProvidersPage(){

    const [providerEditing, setProviderEditing] = useState<Provider | null>(null)

    const closeProviderEdition = () => {
        setProviderEditing(null)
    }
    const handleProviderEdition = (provider: Provider) => {
        setProviderEditing(provider)
    }

    const editDialog = <EditProviderDialog open={providerEditing? true : false} provider={providerEditing!} onOpenChange={closeProviderEdition}/>



    return (
        <ProvidersProvider>
            <div className="w-screen min-h-screen">
                <NavBar/>
                <main className="p-4 grid grid-flow-col grid-cols-4 grid-rows-5 min-h-screen">
                    <h1 className="row-start-1 col-start 1">Providers</h1>
                    <section className="border rounded p-3 col-start-1 col-end-3 row-start-2 row-end-3">
                        <h3>Providers</h3>
                        <ProvidersTable onEditProvider={handleProviderEdition}/>
                        {providerEditing && editDialog}

                    </section>

                </main>
            <Toaster/>
            </div>
        </ProvidersProvider>
    )
}
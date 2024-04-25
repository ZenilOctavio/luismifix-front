import { Toaster } from "../ui/toaster"
import NavBar from "../NavBar"
import UsersQuickView from "../home/UsersQuickView"
import useProviders from "@/hooks/useProviders"
import { getTypesProviders } from "@/services/typesProvider/getTypesProvider"
import { useForm } from "react-hook-form"
import { FormEvent, useEffect, useState } from "react"
import { TypeProvider } from "@/types/providers/TypeProvider"
import { Provider } from "@/types/providers/Provider"

function HomePage(){

    const { providers, updateProvider, disableProvider, enableProvider } = useProviders()
    const [typesProvider, setTypeProvider] = useState<TypeProvider[]>([])
    const [currentProvider, setCurrentProvider] = useState<Provider | undefined>()

    const formHook = useForm({
        defaultValues: {
            nameProvider: currentProvider? currentProvider.nameProvider : "",
            noteProvider: currentProvider? currentProvider.noteProvider : "",
            idTypeProvider: currentProvider? currentProvider.idTypeProvider.nameTypeProvider : "",
        }
    })

    useEffect(() => {
        getTypesProviders(). then((data) => {setTypeProvider(data)})
    }, [])

    const handleEdit = (provider: Provider) => {
        setCurrentProvider(provider)
    }
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        const data = formHook.getValues()
        updateProvider(currentProvider!, data)
    }

    const formElement = (provider: Provider) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h3>Editing <strong>{provider.nameProvider}</strong></h3>
        <label className="block">
            Name
        </label>
            <input type="text" {...formHook.register("nameProvider")} placeholder={provider.nameProvider}/>
        <label className="block">
            Note
        </label>
            <input type="text" {...formHook.register("noteProvider")}  placeholder={provider.noteProvider}/>
        <select className="block" {...formHook.register("idTypeProvider")}>
            {
                typesProvider?
                    typesProvider.map(typeProvider => (
                        <option key={typeProvider._id} value={typeProvider._id}>{typeProvider.nameTypeProvider}</option>
                    ))
                    :
                    <option>No types to show</option>
            }
        </select>
        <button type="submit">Enviar</button>
    </form>
    )
    
    
    return (
        <div className="min-w-screen min-h-screen">
            <NavBar></NavBar>
            <main className="grid mt-4 grid-flow-row w-screen grid-cols-4 grid-rows-2 min-h-[80vh] gap-4 px-4 overflow-y-scroll overflow-x-hidden">
                <UsersQuickView/>
                <ul>
                    {providers? 
                        providers.map(provider => (
                            <li key={provider._id} className="p-3">
                                <strong className="block">{provider.nameProvider}</strong>
                                <small >{provider.noteProvider}</small>
                                <small className="opacity-70 block">{provider.statusProvider.toString()}</small>
                                <button className="ml-3" onClick={() => {handleEdit(provider)}}>Edit</button>
                                <button className="ml-3" onClick={() => {enableProvider(provider)}}>Enable</button>
                                <button className="ml-3" onClick={() => {disableProvider(provider)}}>Disable</button>
                            </li>
                    ))
                    :
                    <li>No hay proveedores</li>
                    }
                </ul>
                    {currentProvider && formElement(currentProvider)}
            </main>
        
            <Toaster/>
        </div>
    )
}

export default HomePage
import {getProviders, getProviderByName, getProviderById, getProviderContacts } from "@/services/providers/getProviders";
import { CreationProvider, Provider } from "@/types/providers/Provider";
import { Dispatch, useEffect, useState } from "react";
import { createProvider as createProviderService } from "@/services/providers/postProvider";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/ErrorResponse";
import { updateProvider as updateProviderService, enableProvider as enableProviderService, disableProvider as disableProviderService } from "@/services/providers/putProviders";
import { useProvidersContext } from "@/providers/ProvidersProvider";
import { getTypesProviders } from "@/services/typesProvider/getTypesProvider";
import { TypeProvider } from "@/types/providers/TypeProvider";
import { ProvidersContact } from "@/types/providers/Contact";

function useProviders(){
    let providers: Provider[] = []
    let setProviders: Dispatch<Provider[]> = () => {}
    let typesProviders: TypeProvider[] = []
    let setTypesProviders: Dispatch<TypeProvider[]> = () => {}

    
    try{
        const context = useProvidersContext()

        if(Object.keys(context).length == 0) throw new Error('No ProvidersContext reached')
        
        if(context){
            console.log('Using context')
            providers = context.providers!
            setProviders = context.setProviders!
            typesProviders = context.typesProviders!
            setTypesProviders = context.setTypesProviders!
        }
    }
    catch(err){
        console.log(err, 'Using independent state')
        const providersState = useState<Provider[]>([])
        const typeProvidersState = useState<TypeProvider[]>([])
        providers = providersState[0]
        setProviders = providersState[1]
        typesProviders = typeProvidersState[0]
        setTypesProviders = typeProvidersState[1]
    }

    const [ providersContacts, setProvidersContacts ] = useState<Record<string, ProvidersContact[]>>({}) 
    const [ error, setError ] = useState<string>('')

    const refreshProvidersContacts = async (provider: Provider) => {
        const newContacts = await getProviderContacts(provider._id)

        const newProvidersContacts = {...providersContacts}
        newProvidersContacts[provider._id] = newContacts

        setProvidersContacts(newProvidersContacts)
        
    }

    const refreshProviders = async () => {
        const newProviders = await getProviders()
        const newProvidersTypes = await getTypesProviders()
        if(newProviders)
            setProviders(newProviders)
        if(newProvidersTypes)
            setTypesProviders(newProvidersTypes)
    }

    const getProvider = async (by: 'id' | 'name', value: string) => {
        let provider: Provider | undefined = undefined
        if (by === 'id'){
            provider = await getProviderById(value)
        }
        if (by === 'name') {
            provider = await getProviderByName(value)
        }
        return provider
    }

    const createProvider = async (newProvider: CreationProvider) => {
        try{
            await createProviderService(newProvider)
            const createdProvider = await getProviderByName(newProvider.nameProvider)
            
            const newProviders = [...providers]
            newProviders.push(createdProvider)
            setProviders(newProviders)
            console.log('Nuevos usuarios',newProviders)
            setError('')
            
            return createdProvider
        }
        catch(err){
            const axiosError = err as AxiosError
            const errorMessage = axiosError.response?.data as ErrorResponse
            setError(errorMessage.message)
            
            return 
        }
    }

    const updateProvider = async (originalProvider: Provider, newProviderData: CreationProvider) => {
        await updateProviderService(originalProvider._id, newProviderData)
        const updatedProvider = await getProvider('id', originalProvider._id)            

        refreshProviders()
        
        return updatedProvider
    }

    const enableProvider = async (disabledProvider: Provider) => {
        await enableProviderService(disabledProvider._id)
        refreshProviders()
    }

    const disableProvider = async (enabledProvider: Provider) => {
        await disableProviderService(enabledProvider._id)
        refreshProviders()
    }

    const refreshAllProvidersContacts = () => {
        providers.forEach(provider => {
            refreshProvidersContacts(provider).then(() => {console.log(providersContacts)})
        })
    }

    useEffect(() => {
        refreshProviders()
        refreshAllProvidersContacts()
    }, [])


    return { 
        providers, refreshProviders, createProvider, getProvider, error, updateProvider, enableProvider, disableProvider, typesProviders,
        providersContacts, refreshProvidersContacts, refreshAllProvidersContacts
     }
}

export default useProviders

import {getProviders, getProviderByName, getProviderById } from "@/services/providers/getProviders";
import { CreationProvider, Provider } from "@/types/providers/Provider";
import { useEffect, useState } from "react";
import { createProvider as createProviderService } from "@/services/providers/postProvider";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/ErrorResponse";
import { updateProvider as updateProviderService, enableProvider as enableProviderService, disableProvider as disableProviderService } from "@/services/providers/putProviders";

function useProviders(){
    const [providers, setProviders] = useState<Array<Provider>>([])
    const [ error, setError ] = useState<string>('')

    const refreshProviders = async () => {
        const newProviders = await getProviders()
        if(newProviders)
            setProviders(newProviders)
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

    useEffect(() => {
        refreshProviders()
    }, [])

    return { providers, refreshProviders, createProvider, getProvider, error, updateProvider, enableProvider, disableProvider }
}

export default useProviders
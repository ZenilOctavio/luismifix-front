import { getProviders, getProviderByName, getProviderById, getProviderContacts } from "@/services/providers/getProviders";
import { CreationProvider, Provider } from "@/types/providers/Provider";
import { useEffect, useState } from "react";
import { createProvider as createProviderService } from "@/services/providers/postProvider";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/ErrorResponse";
import { updateProvider as updateProviderService, enableProvider as enableProviderService, disableProvider as disableProviderService, disableContact } from "@/services/providers/putProviders";
import { getTypesProviders } from "@/services/typesProvider/getTypesProvider";
import { CreationProvidersContact, EditProvidersContact, ProvidersContact } from "@/types/providers/Contact";
import { createProviderContact as createProviderContactService } from "@/services/providers/postProvider"
import { TypeContact } from "@/types/providers/TypeContact";
import { getTypesContacts } from "@/services/providers/typesContacts/getTypesContacts";
import { updateContact as updateContactService } from "@/services/providers/putProviders";
import { useMutation, useQuery } from "@tanstack/react-query";

function useProviders() {

    const {
        data: providers,
        isFetching: isFetchingProviders,
        refetch: refetchProviders,
        isLoading: isLoadingProviders,
        error: errorProviders
    } = useQuery({
        queryKey: ['providers'],
        queryFn: getProviders,
        initialData: []
    })

    const {
        data: typesProviders,
        isFetching: isFetchingTypesProviders,
        refetch: refetchTypesProviders,
        isLoading: isLoadingTypesProviders,
        error: errorTypesProviders
    } = useQuery({
        queryKey: ['typesProviders'],
        queryFn: getTypesProviders,
        initialData: []
    })

    const { mutate: createProvider, data: createdProvider, error: createProviderError } = useMutation({
        mutationFn: createProviderService,
        mutationKey: ['createProvider'],
        onSuccess: () => {
            refetchProviders()
        }
    })


    const [providersContacts, setProvidersContacts] = useState<Record<string, ProvidersContact[]>>({})
    const [typeContacts, setTypeContacts] = useState<TypeContact[]>([])
    const [error, setError] = useState<string>('')

    const refreshTypeContacts = async () => {
        const newTypeContacts = await getTypesContacts()
        setTypeContacts(newTypeContacts)
    }


    const refreshProvidersContacts = async (provider: Provider) => {
        const newContacts = await getProviderContacts(provider._id)

        const newProvidersContacts = { ...providersContacts }
        newProvidersContacts[provider._id] = newContacts

        setProvidersContacts(newProvidersContacts)

    }


    const getProvider = async (by: 'id' | 'name', value: string) => {
        let provider: Provider | undefined = undefined
        if (by === 'id') {
            provider = await getProviderById(value)
        }
        if (by === 'name') {
            provider = await getProviderByName(value)
        }
        return provider
    }


    const updateProvider = async (originalProvider: Provider, newProviderData: CreationProvider) => {
        await updateProviderService(originalProvider._id, newProviderData)
        const updatedProvider = await getProvider('id', originalProvider._id)

        refetchProviders()

        return updatedProvider
    }

    const enableProvider = async (disabledProvider: Provider) => {
        await enableProviderService(disabledProvider._id)
        refetchProviders()
    }

    const disableProvider = async (enabledProvider: Provider) => {
        await disableProviderService(enabledProvider._id)
        refetchProviders()
    }

    const refreshAllProvidersContacts = async () => {
        providers.forEach(async (provider) => {
            refreshProvidersContacts(provider)

        })
    }

    const updateContact = async (contact: ProvidersContact, data: EditProvidersContact) => {
        await updateContactService(contact._id, data)

        await refreshProvidersContacts(contact.idProvider)

    }

    const createProviderContact = async (newContact: CreationProvidersContact) => {
        try {
            await createProviderContactService(newContact)
            const newContactCreated = providersContacts[newContact.idProvider].find(contact => (contact.idTypeContact._id == newContact.idTypeContact
                && contact.idProvider._id == newContact.idProvider
                && contact.data == newContact.data))
            const provider = providers.find(provider => provider._id == newContact.idProvider)!

            await refreshProvidersContacts(provider)

            setError('')
            return newContactCreated
        }
        catch (err) {
            const axiosError = err as AxiosError
            const errorMessage = axiosError.response?.data as ErrorResponse
            setError(errorMessage.message)

            return
        }
    }

    const disableProviderContact = async (contact: ProvidersContact) => {

        await disableContact(contact._id)

        const provider = providers.find(provider => provider._id == contact.idProvider._id)!

        await refreshProvidersContacts(provider)
    }

    useEffect(() => {
        refetchProviders()
        refreshTypeContacts()
        refreshAllProvidersContacts()
    }, [])


    return {
        providers, refreshProviders: refetchProviders, createProvider, getProvider, error, updateProvider, enableProvider, disableProvider, typesProviders,
        providersContacts, refreshProvidersContacts, refreshAllProvidersContacts, refreshTypeContacts, typeContacts, createProviderContact, updateContact,
        disableProviderContact, isFetchingTypesProviders, refetchTypesProviders, isLoadingTypesProviders, errorTypesProviders, createdProvider, createProviderError,
        isFetchingProviders, isLoadingProviders, errorProviders
    }
}

export default useProviders

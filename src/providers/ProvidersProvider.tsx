import { Provider } from "@/types/providers/Provider";
import { TypeProvider } from "@/types/providers/typeProvider";
import { createContext, useState, useContext } from "react";


interface ProvidersContextType {
    typesProviders?: TypeProvider[],
    setTypesProviders?: (typesProviders: TypeProvider[]) => void
    providers?: Provider[]
    setProviders?: (providers: Provider[]) => void
}
export const ProvidersContext = createContext<ProvidersContextType>({})

export const useProvidersContext = (): ProvidersContextType => {
    const context = useContext(ProvidersContext) as ProvidersContextType
    if (!context) {
        throw new Error('useProvidersContext must be used within an ProvidersProvider')
    }
    return context 
}

export const ProvidersProvider = ({children}: {children: any}) => {
    const [providers, setProviders] = useState<Provider[]>([])
    const [typesProviders, setTypesProviders] = useState<TypeProvider[]>([])

    return (
        <ProvidersContext.Provider value={{providers, setProviders, typesProviders, setTypesProviders}}>
            {children}
        </ProvidersContext.Provider>
    )
}

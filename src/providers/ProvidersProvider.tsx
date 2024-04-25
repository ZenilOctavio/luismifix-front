import { Provider } from "@/types/providers/Provider";
import { createContext, useState, useContext } from "react";


interface ProvidersContextType {
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

    return (
        <ProvidersContext.Provider value={{providers, setProviders}}>
            {children}
        </ProvidersContext.Provider>
    )
}

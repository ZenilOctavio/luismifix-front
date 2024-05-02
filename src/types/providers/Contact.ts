import { Provider } from "./Provider"
import { TypeContact } from "./TypeContact"

export interface ProvidersContact {
    _id: string
    idTypeContact: TypeContact
    idProvider: Provider
    data: string
    __v: number
}

export interface CreationProvidersContact {
    idTypeContact: string
    idProvider: string
    data: string
}
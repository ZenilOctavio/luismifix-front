import { TypeContact } from "./TypeContact"

export interface ProvidersContact {
    _id: string
    idTypeContact: TypeContact
    idProvider: string
    data: string
    __v: number
}

export interface CreationProvidersContact {
    idTypeContact: TypeContact
    idProvider: string
    data: string
}
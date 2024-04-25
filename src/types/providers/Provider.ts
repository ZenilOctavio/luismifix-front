import { TypeProvider } from "./TypeProvider"

export interface Provider{
    creationDateProvider: Date
    idTypeProvider: TypeProvider
    nameProvider: string
    noteProvider: string
    _id: string
    statusProvider: boolean
    __v: number
}

export interface CreationProvider{
    idTypeProvider: string,
    nameProvider: string,
    noteProvider: string
}
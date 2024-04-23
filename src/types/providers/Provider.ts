import { TypeProvider } from "./typeProvider"

export interface Provider{
    creationDateProvider: Date
    idTypeProvider: TypeProvider
    nameProvider: string
    noteProvider: string
    _id: string
    statusProvider: boolean
    __v: number
}
import { TypeUser } from "../typesUser/TypeUser";

export interface User {
    _id: string,
    idTypeUser: TypeUser,
    username: string,
    email: string,
    password: string,
    status: boolean,
    __v: number
}
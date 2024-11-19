import { TypeUser } from "../typesUser/TypeUser"

export interface SessionResponse {
    message: string
}
export interface ProfileResponse {
    email: string,
    idTypeUser: TypeUser,
    status: boolean,
    username: string,
    _id: string,
    __v: 0
}

import { getUsers } from "@/services/users/getUsers";
import { registerUser } from "@/services/users/registerUser";
import { RegisterUser } from "@/types/users/RegisterUser";
import { User } from "@/types/users/User";
import { useEffect, useState } from "react";
import { getUserById, getUserByUsername } from "@/services/users/getUser";
import { ErrorResponse } from "@/types/ErrorResponse";
import { AxiosError } from "axios";

function useUsers(){
    const [users, setUsers] = useState<Array<User> | Array<never>>([])
    const [error, setError] = useState('')

    const refreshUsers = async () => {
        const newUsers = await getUsers()
        setUsers(newUsers)
    }

    useEffect(() => {
        refreshUsers()
    }, [])

    const getUser = async (by: 'id' | 'username', value: string) => {
        if (by === 'id'){
            const user = await getUserById(value)
            return user
        }
        if (by === 'username') {
            const user = await getUserByUsername(value)
            return user
        }
    }
    
    const registerNewUser = async (newUser: RegisterUser) => {
        try{
            await registerUser(newUser)
            const newUserCreated = await getUser('username', newUser.username)
            
            const newUsers = [...users]
            newUsers.push(newUserCreated!)
            setUsers(newUsers)
            setError('')
            
            return newUserCreated
        }
        catch(err){
            const axiosError = err as AxiosError
            const errorMessage = axiosError.response?.data as ErrorResponse
            setError(errorMessage.message)
            
            return 
        }
    }

    return {users, refreshUsers, getUser, registerNewUser, error}
}

export default useUsers
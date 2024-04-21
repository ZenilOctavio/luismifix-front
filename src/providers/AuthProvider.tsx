import { createContext, useState, useContext  } from "react";
import { authenticate } from "@/services/session/auth";
import { profile } from "@/services/session/profile";
import { ProfileResponse } from "@/types/session/SessionResponse";

export const AuthContext = createContext({});

interface AuthContextType {
    user: any,
    signup: (username: string, password: string) => void
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext) as AuthContextType
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context 
}

export const AuthProvider = ({children}: {children: any}) => {
    const [user, setUser] = useState<ProfileResponse | null>(null);

    const signup = async (username: string, password: string) => {
        try{
            await authenticate(username, password)

            const newUser = await profile()
            
            setUser(newUser)

            return newUser
        }
        catch(err){
            console.log(err)
        }
        return null
    }
    return (
        <AuthContext.Provider value={{user, signup}}>
            {children}
        </AuthContext.Provider>
    )
}
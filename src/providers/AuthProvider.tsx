import { createContext, useState, useContext  } from "react";
import { authenticate } from "@/services/session/auth";
import { profile } from "@/services/session/profile";
import { ProfileResponse, LogInResponse } from "@/types/session/SessionResponse";
import { logout as logoutService } from "@/services/session/logout";

export const AuthContext = createContext({});

interface AuthContextType {
    user: ProfileResponse,
    signup: (username: string, password: string) => {user: ProfileResponse, message: string},
    logout: () => LogInResponse
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
            const loginResponse = await authenticate(username, password)

            const newUser = await profile()
            
            setUser(newUser)

            return {user: newUser, message: loginResponse.message}
        }
        catch(err){
            console.log(err)
            return {user: null, message: 'Something went wrong'}
        }

    }

    const logout = async () => {
            const response = await logoutService()

            console.log(response)
            
            setUser(null)
            return response
    }

    return (
        <AuthContext.Provider value={{user, signup, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
import { createContext, useState, useContext, useEffect } from "react";
import { authenticate } from "@/services/session/auth";
import { profile } from "@/services/session/profile";
import { ProfileResponse, SessionResponse } from "@/types/session/SessionResponse";
import { logout as logoutService } from "@/services/session/logout";

export const AuthContext = createContext({});

interface AuthContextType {
    user: ProfileResponse,
    signup: (username: string, password: string) => {user: ProfileResponse, message: string},
    logout: () => SessionResponse,
    refreshProfile: () => ProfileResponse
    isLoading: boolean
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
    const [isLoading, setIsLoading] = useState(true)


    const refreshProfile = async () => {
        setIsLoading(true)
        const newUser = await profile()

        console.log(newUser)
            
        setUser(newUser)

        setIsLoading(false)
        
        return newUser
    }

    useEffect(() => {
        // Fetch user profile on component mount
        refreshProfile();
    }, []); 
    
    const signup = async (username: string, password: string) => {
        try{
            const loginResponse = await authenticate(username, password)

            const newUser = await refreshProfile()

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
        <AuthContext.Provider value={{user, signup, logout, refreshProfile, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
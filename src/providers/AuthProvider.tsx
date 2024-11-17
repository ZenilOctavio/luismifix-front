import React, { createContext, useState, useContext, useEffect } from "react";
import { authenticate } from "@/services/session/auth";
import { profile } from "@/services/session/profile";
import { ProfileResponse, SessionResponse } from "@/types/session/SessionResponse";
import { logout as logoutService } from "@/services/session/logout";
import { AxiosError } from "axios";

export const AuthContext = createContext({});

interface AuthContextType {
    user: ProfileResponse,
    signup: (username: string, password: string) => { user: ProfileResponse, message: string },
    logout: () => Promise<SessionResponse>,
    refreshProfile: () => ProfileResponse
    isLoading: boolean
    tryToLogIn: () => Promise<boolean>
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext) as AuthContextType
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<ProfileResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true)


    const refreshProfile = async () => {
        setIsLoading(true)
        const newUser = await profile()

        setUser(newUser)

        setIsLoading(false)

        return newUser
    }

    useEffect(() => {
        // Fetch user profile on component mount
        refreshProfile();
    }, []);

    const signup = async (username: string, password: string) => {
        try {
            console.log(username, password)
            const loginResponse = await authenticate(username, password)
            console.log(loginResponse)

            const newUser = await refreshProfile()
            console.log(newUser)

            return { user: newUser, message: loginResponse.message }
        }
        catch (err) {
            console.log(err)

            if (!(err instanceof AxiosError)) return { user: null, message: 'Algo salió mal' }

            if (err.response?.status == 400) return { user: null, message: 'Credenciales inválidas' }

            if (err.code == 'ERR_NETWORK') return { user: null, message: 'No se tiene conexión al servidor' }
        }

    }

    const logout = async () => {
        const response = await logoutService()

        console.log(response)

        setUser(null)
        return response
    }

    const tryToLogIn = async () => {
        const user = await refreshProfile()
        return user ? true : false
    }




    return (
        <AuthContext.Provider value={{ user, signup, logout, refreshProfile, isLoading, tryToLogIn }}>
            {children}
        </AuthContext.Provider>
    )
}
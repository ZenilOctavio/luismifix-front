import { ProfileForm } from "../ProfileForm"
import { Toaster } from "../ui/toaster"
import { useNavigate } from 'react-router-dom'
import { HOME_PAGE_PATHNAME } from "@/config/constants"
import logo from '@/assets/logo_luismifix.png'
import { useEffect } from "react"
import { useAuth } from "@/providers/AuthProvider"

function LoginPage() {
    const navigate = useNavigate()
    const { tryToLogIn, user } = useAuth()

    const handleSubmit = () => {
        setTimeout(() => {
            navigate(HOME_PAGE_PATHNAME)
        }, 500)
    }

    useEffect(() => {
        tryToLogIn().then((profile: boolean) => {
            if (profile) navigate(HOME_PAGE_PATHNAME)
        })

    }, [user])

    return (
        <div className="flex justify-center w-screen h-screen items-center bg-gradient-to-t to-cyan-500 from-blue-500">
            <div className="relative  flex flex-col items-center justify-center rounded-xl overflow-hidden border shadow-lg shadow-slate-600">

                <div className="p-8 flex justify-center items-center h-full bg-white dark:bg-gray-800">
                    <div className="mx-auto flex  flex-col justify-evenly space-y-6 sm:w-[25rem] w-full h-ful">
                        <div className="flex flex-col justify-center items-center space-y-2 text-center">
                            <div className="rounded-full w-40 h-40 overflow-hidden shadow-md shadow-slate-400">
                                <img src={logo} alt="logo" className="w-40 h-40 shadow-md" />
                            </div>
                            <h1 className="sm:text-3xl text-xl font-bold tracking-tight text-foreground">
                                Iniciar Sesión
                            </h1>
                            <p className="text-muted-foreground sm:text-lg text-base">
                                Entra a tu cuenta
                            </p>
                        </div>
                        <ProfileForm onSubmit={handleSubmit} className=" pb-8" />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                        </p>
                    </div>
                </div>
            </div>
            <Toaster key={'toasterkey'} />
        </div>
    )
}

export default LoginPage
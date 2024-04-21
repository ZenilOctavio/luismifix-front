import { ProfileForm } from "../ProfileForm"
import { Toaster } from "../ui/toaster"
import { useNavigate } from 'react-router-dom'
import { HOME_PAGE_PATHNAME } from "@/config/constants"

function LoginPage(){

    const navigate = useNavigate()

    const handleSubmit = () => {
        setTimeout(() => {
            navigate(HOME_PAGE_PATHNAME)
        }, 500)
    }

    return (
        <div className="flex justify-center w-screen h-screen items-center ">
            <div className="relative  h-[600px] flex flex-col items-center justify-center   rounded-3xl overflow-hidden border">

                <div className="lg:p-8 flex justify-center items-center h-full">
                <div className="mx-auto flex w-full flex-col justify-evenly space-y-6 sm:w-[25rem] h-full">
                    <div className="flex flex-col justify-center items-center space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Log In
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Sign in to your account
                    </p>
                    </div>
                    <ProfileForm onSubmit={handleSubmit} className=" h-2/3"/>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                    </p>
                </div>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}

export default LoginPage
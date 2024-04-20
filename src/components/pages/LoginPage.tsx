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
                {/* <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-secondary" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-6 w-6"
                    >
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    Luismifix
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                    <p className="text-lg">
                        &ldquo; Better done than perfect &rdquo;
                    </p>
                    <footer className="text-sm">Christopher Di Armani</footer>
                    </blockquote>
                </div>
                </div> */}
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
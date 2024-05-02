import { Link, useLocation, useNavigate } from "react-router-dom"
import { HOME_PAGE_PATHNAME, INVENTORY_PAGE_PATHNAME, PROVIDERS_PAGE_PATHNAME } from "@/config/constants"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { BadgeAlert, LogOut } from "lucide-react"
import ThemeButton from "./ThemeButton"
import { toast } from "./ui/use-toast"
import { LOGIN_PAGE_PATHNAME } from "@/config/constants"
import { SessionResponse } from "@/types/session/SessionResponse"
import { CheckCheck } from "lucide-react"
import { useAuth } from "@/providers/AuthProvider"
import logo from '@/assets/logo_luismifix.png'
import { useEffect } from "react"

function NavBar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    useEffect(() => {
        if (!user || Object.keys(user).length == 0){
            console.log('Theres no user')
            navigate(LOGIN_PAGE_PATHNAME)
        }
    }, [])

    const handleLogOut = async () => {
        try{
            console.log('trying')
            navigate(LOGIN_PAGE_PATHNAME)
            const response = await logout()
            toast({
                title: 'Log out completed',
                content: response.message,
                description: 
                <span className="flex items-center gap-2">
                    <CheckCheck size={16} />
                    <span>{response.message}</span>
                </span>
            })
        }
        catch(err){
            console.log('catching')

            const response = err as SessionResponse
            toast({
                title: 'Log out failed',
                description:         
                <span className="flex items-center gap-2">
                    <BadgeAlert size={16} />
                    <span>{response.message}</span>
                </span>,
                variant: 'destructive'

            })
        }
    }

    const links = [
        {
            pageName: 'Home',
            pathname: HOME_PAGE_PATHNAME
        },
        {
            pageName: 'Inventario',
            pathname: INVENTORY_PAGE_PATHNAME
        },
        {
            pageName: 'Proveedores',
            pathname: PROVIDERS_PAGE_PATHNAME
        }
        // {
        //     pageName: 'Clientes',
        //     pathname: CLIENTS_PAGE_PATHNAME
        // },
        // {
        //     pageName: 'Tablero',
        //     pathname: BOARD_PAGE_PATHNAME
        // },
        // {
        //     pageName: 'Pendientes',
        //     pathname: TODO_PAGE_PATHNAME
        // },

        // {
        //     pageName: 'Users',
        //     pathname: USERS_PAGE_PATHNAME
        // },

    ]
    
    return (
        <nav className="backdrop-blur-sm z-10 border-b-2 border-b-slate-900 sticky top-0 w-full py-2 flex justify-between items-center px-10">
            <div className="flex items-center gap-4 ">
                <div className="rounded-full w-20 h-20 overflow-hidden">
                    <img src={logo} alt="logo" className="w-full h-full shadow-md"/>
                </div>
                    <h2 className="text-3xl font-semibold">Luismifix</h2>
            </div>
            <ul className="flex space-x-4 justify-between ">

                {links.map((link) => {
                    return (
                    <li key={link.pathname}>
                        <Link to={link.pathname} className={`text-slate-800  text-2xl font-semibold dark:text-white   px-4 py-1 rounded  ${(location.pathname == link.pathname)? "bg-slate-300 dark:bg-slate-800": ""}`}>{link.pageName}</Link>
                    </li>
                    )
                })}
                {/* Add more links as needed */}
            </ul>

            <div className="flex gap-4 ">
                <ThemeButton></ThemeButton>
                <DropdownMenu>
                    {user && <DropdownMenuTrigger asChild className="bg-transparent  px-3  p-1 hover:outline-none hover:border-none">
                        <div className="flex items-center justify-center hover:scale-105 transition-transform hover:outline-none hover:border-none hover:cursor-pointer">
                            <Avatar className="hover:cursor-pointer  transition-transform mr-2">
                                <AvatarFallback className=" min-w-8">{user.username.slice(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar> 
                            <span className="border-l-2 p-2 text-xl">{user.username}</span> 
                        </div>
                    </DropdownMenuTrigger>}
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My account</DropdownMenuLabel>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                        {/* <DropdownMenuItem     
                            onClick={handleSettings}
                            className="flex gap-4 cursor-pointer"
                        >

                            <Settings size={20} />
                            <span>Settings</span>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem     
                            onClick={handleLogOut}
                            className="flex gap-4 cursor-pointer"
                        >

                            <LogOut size={20} />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


        </nav>
        )
}

export default NavBar
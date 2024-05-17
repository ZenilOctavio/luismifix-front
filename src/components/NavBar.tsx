import { Link, useLocation, useNavigate } from "react-router-dom"
import { HOME_PAGE_PATHNAME, INVENTORY_PAGE_PATHNAME, PROVIDERS_PAGE_PATHNAME } from "@/config/constants"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { BadgeAlert, LogOut, Moon, Sun } from "lucide-react"
import ThemeButton from "./ThemeButton"
import { toast } from "./ui/use-toast"
import { LOGIN_PAGE_PATHNAME } from "@/config/constants"
import { SessionResponse } from "@/types/session/SessionResponse"
import { CheckCheck, Menu } from "lucide-react"
import { useAuth } from "@/providers/AuthProvider"
import logo from '@/assets/logo_luismifix.png'
import { useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useTheme } from "@/providers/ThemeProvider"

function NavBar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, logout, isLoading } = useAuth()
    const {setTheme, theme} = useTheme()

    useEffect(() => {
        if ( !isLoading && (!user || Object.keys(user).length == 0)){
            console.log('Theres no user')
            navigate(LOGIN_PAGE_PATHNAME)
        }
    }, [])

    const handleLogOut = async () => {
        try{
            console.log('trying')
            const response = await logout()
            navigate(LOGIN_PAGE_PATHNAME)
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
                <div className="rounded-full lg:w-20 lg:h-20 w-12 h-12 overflow-hidden">
                    <img src={logo} alt="logo" className="w-full h-full shadow-md"/>
                </div>
                    <h2 className="text-lg lg:text-3xl font-semibold">Luismifix</h2>
            </div>
            <Sheet>
                <SheetTrigger asChild className="ml-auto sm:hidden">
                    <Menu/>
                </SheetTrigger>
                <SheetContent>
                    {/* <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader> */}
                        <section className="flex flex-col h-[95vh]">
                            <div className="text-2xl">
                                Navegación
                                <ul className="mt-4 px-2 sm:hidden justify-evenly items-start gap-2 flex flex-col ">

                                    {links.map((link) => {
                                        return (
                                        <li key={link.pathname}>
                                            <Link to={link.pathname} className={`text-slate-800 lg:text-xl text-lg md:text-sm font-semibold dark:text-white   md:px-4 px-2 py-1 rounded  ${(location.pathname == link.pathname)? "bg-slate-300 dark:bg-slate-800": ""}`}>{link.pageName}</Link>
                                        </li>
                                        )
                                    })}
                                    {/* Add more links as needed */}
                                </ul>
                            </div>
                            
                            <div className="flex flex-col mt-auto">
                                <span 
                                    className="flex items-center gap-4 py-3 px-4"
                                    onClick={() => {setTheme((theme === 'light')? 'dark' : 'light')}}
                                >
                                    {
                                        (theme == 'dark')?
                                        <Moon size={20} />
                                        :
                                        <Sun size={20} />
                                    }
                                    <span className="font-bold">Cambiar tema</span>
                                </span>
                                <span 
                                    className="flex items-center gap-4 py-3 px-4"
                                    onClick={handleLogOut}
                                >
                                    <LogOut size={20} />
                                    <span className="font-bold">Cerrar sesión</span>
                                </span>
                            </div>
                        </section>
                    </SheetContent>
            </Sheet>
            <ul className="sm:flex space-x-4 justify-evenly hidden">

                {links.map((link) => {
                    return (
                    <li key={link.pathname}>
                        <Link to={link.pathname} className={`text-slate-800 lg:text-2xl text-xs md:text-sm font-semibold dark:text-white   md:px-4 px-2 py-1 rounded  ${(location.pathname == link.pathname)? "bg-slate-300 dark:bg-slate-800": ""}`}>{link.pageName}</Link>
                    </li>
                    )
                })}
                {/* Add more links as needed */}
            </ul>

            <div className="flex gap-4 ">
                <ThemeButton></ThemeButton>
                <DropdownMenu>
                    {user && <DropdownMenuTrigger asChild className="bg-transparent  px-3  p-1 hover:outline-none hover:border-none hidden sm:flex">
                        <div className="flex items-center justify-center hover:scale-105 transition-transform hover:outline-none hover:border-none hover:cursor-pointer">
                            <Avatar className="hover:cursor-pointer  transition-transform mr-2 flex items-center justify-center">
                                <AvatarFallback className="w-8 h-8 text-sm">{user.username.slice(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar> 
                            <span className="border-l-2 p-2 lg:text-xl text-sm">{user.username}</span> 
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
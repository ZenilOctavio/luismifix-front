import { Link, useLocation, useNavigate } from "react-router-dom"
import { HOME_PAGE_PATHNAME, INVENTORY_PAGE_PATHNAME, USERS_PAGE_PATHNAME } from "@/config/constants"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { LogOut, Settings } from "lucide-react"
import ThemeButton from "./ThemeButton"
import { toast } from "./ui/use-toast"
import { LOGIN_PAGE_PATHNAME } from "@/config/constants"
import { SessionResponse } from "@/types/session/SessionResponse"
import { CheckCheck } from "lucide-react"
import { useAuth } from "@/providers/AuthProvider"

function NavBar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, logout} = useAuth()

    const handleLogOut = async () => {
        try{
            console.log('trying')
            const response = await logout()
            toast({
                title: 'Logout completed',
                content: response.message,
                description: 
                <span className="flex items-center gap-2">
                    <CheckCheck size={16} />
                    <span>{response.message}</span>
                </span>
            })
            setTimeout(() => {
                navigate(LOGIN_PAGE_PATHNAME)
            }, 500)
        }
        catch(err){
            console.log('catching')

            const response = err as SessionResponse
            toast({
                title: 'Logout failed',
                content: response.message,
                variant: 'destructive'

            })
        }
    }
    const handleSettings = () => {

    }

    const links = [
        {
            pageName: 'Home',
            pathname: HOME_PAGE_PATHNAME
        },
        {
            pageName: 'Users',
            pathname: USERS_PAGE_PATHNAME
        },
        {
            pageName: 'Inventory',
            pathname: INVENTORY_PAGE_PATHNAME
        }

    ]
    
    return (
        <nav className="border-b-2 fixed top-0 left-0 w-full py-2 flex justify-between items-center px-72">
            <ul className="flex space-x-4">

                {links.map((link) => {
                    return (
                    <li key={link.pathname}>
                        <Link to={link.pathname} className={`text-primary  font-bold transition-colors  ${(location.pathname == link.pathname)? "underline": ""}`}>{link.pageName}</Link>
                    </li>
                    )
                })}
                {/* Add more links as needed */}
            </ul>

            <div className="flex gap-4">
                <ThemeButton></ThemeButton>
                <DropdownMenu>
                    <DropdownMenuTrigger className="bg-transparent  px-3  p-0 border-primary border">
                        <div className="flex items-center justify-center hover:scale-105 transition-transform">
                            <Avatar className="hover:cursor-pointer  transition-transform mr-2">
                                <AvatarFallback className=" min-w-8">{user.username.slice(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar> 
                            <span className="border-l-2 p-2">{user.username}</span> 
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My account</DropdownMenuLabel>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                        <DropdownMenuItem     
                            onClick={handleSettings}
                            className="flex gap-4 cursor-pointer"
                        >

                            <Settings size={20} />
                            <span>Settings</span>
                        </DropdownMenuItem>
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
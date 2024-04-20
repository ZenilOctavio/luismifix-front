import { Link, useLocation } from "react-router-dom"
import { HOME_PAGE_PATHNAME, INVENTORY_PAGE_PATHNAME, USERS_PAGE_PATHNAME } from "@/config/constants"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { LogOut, Settings } from "lucide-react"
import ThemeButton from "./ThemeButton"

function NavBar() {
    const location = useLocation()

    const handleLogOut = () => {

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
                    <li>
                        <Link to={link.pathname} className={`text-sm font-bold transition-colors hover:text-primary ${(location.pathname == link.pathname)? "underline": ""}`}>{link.pageName}</Link>
                    </li>
                    )
                })}
                {/* Add more links as needed */}
            </ul>

            <div className="flex gap-4">
                <ThemeButton></ThemeButton>
                <DropdownMenu>
                    <DropdownMenuTrigger className="bg-transparent flex items-center px-3 justify-center p-0 border-primary border">
                        <Avatar className="hover:cursor-pointer hover:scale-110 transition-transform mr-2">
                            <AvatarFallback className=" min-w-8">RN</AvatarFallback>
                        </Avatar> 
                        <span className="border-l-2 p-2">Luismifix</span> 
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
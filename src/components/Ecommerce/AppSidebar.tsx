import { BadgeAlert, CheckCheck, ChevronDown, ChevronUp, User2 } from "lucide-react"
import logoLuismifix from "../../assets/logo_luismifix.png"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useAuth } from "@/providers/AuthProvider"
import { ECOMMERCE_PAGE_PATHNAME, LOGIN_PAGE_PATHNAME, PRODUCTS_OF_CATEGORY_PAGE_PATHNAME } from "@/config/constants"
import { useTheme } from "@/providers/ThemeProvider"
import { Switch } from "../ui/switch"
import { toast } from "../ui/use-toast"
import { SessionResponse } from "@/types/session/SessionResponse"
import useProducts from "@/hooks/useProducts"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"



export function AppSidebar() {

  const { logout, user } = useAuth()
  const { setTheme, theme } = useTheme()
  const navigate = useNavigate()
  const { productTypes } = useProducts()


  const handleLogout = async () => {
    try {
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
    catch (err) {
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

  const handleChangeTheme = () => {
    console.log('Changing theme', theme)
    setTheme((theme === 'light') ? 'dark' : 'light')
  }


  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarGroup>
          <Link to={ECOMMERCE_PAGE_PATHNAME}>
            <div className="flex items-center gap-2">
              <figure className="w-10 h-10 md:w-20 md:h-20 rounded-full overflow-hidden">
                <img src={logoLuismifix} alt="logo" className="w-full h-full object-cover" />
              </figure>
              <h1 className="text-xl font-bold">Luismifix</h1>
            </div>
          </Link>
        </SidebarGroup>
      </SidebarHeader>


      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Categorías
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                {productTypes && productTypes.map((productType) => (

                  <SidebarMenuButton asChild key={productType._id}>
                    <Link to={PRODUCTS_OF_CATEGORY_PAGE_PATHNAME.replace(':id', productType._id)}>
                      <span>{productType.nameTypeProduct}</span>
                    </Link>
                  </SidebarMenuButton>

                ))}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <span className="flex w-full justify-between">
              {theme == 'dark' ? 'Modo oscuro' : 'Modo claro'}
              <Switch onClick={handleChangeTheme} checked={theme == 'dark'} />
            </span>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user ? user.username : ''}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span onClick={handleLogout}>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
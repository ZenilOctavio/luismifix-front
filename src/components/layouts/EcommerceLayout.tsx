import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../Ecommerce/AppSidebar";
import { ECNavbar } from "../ECNavbar";
import { ShoppingCartProvider } from "@/providers/ShoppingCartProvider";
import Chatbot from "../chatbot/Chatbot";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { LOGIN_PAGE_PATHNAME } from "@/config/constants";

export function EcommerceLayout() {

  const { isLoading, user } = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
    if (!isLoading && (!user || Object.keys(user).length == 0)) {

      navigate(LOGIN_PAGE_PATHNAME)
    }
  }, [])


  return (
    <>
      <ShoppingCartProvider>
        <SidebarProvider>
          <AppSidebar />
          <div className="min-h-screen w-screen overflow-x-hidden flex flex-col items-stretc">
            <header className="top-0 z-10 left-0  basis-1/12">
              <ECNavbar />
              <SidebarTrigger />
            </header>
            <main className="px-4 basis-11/12">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      </ShoppingCartProvider>
      <Chatbot />
    </>
  )
}
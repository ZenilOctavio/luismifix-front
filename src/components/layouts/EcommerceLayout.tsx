import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../Ecommerce/AppSidebar";
import { ECNavbar } from "../ECNavbar";
import { ShoppingCartProvider } from "@/providers/ShoppingCartProvider";
import Chatbot from "../chatbot/Chatbot";

export function EcommerceLayout() {
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
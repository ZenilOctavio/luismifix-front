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
          <div className="min-h-screen overflow-x-hidden">
            <header className="top-0 z-10 left-0  min-w-[85vw]">
              <ECNavbar />
              <SidebarTrigger />
            </header>
            <main className="px-4">
              <Outlet />
            </main>

          </div>

        </SidebarProvider>
      </ShoppingCartProvider>
      <Chatbot />
    </>
  )
}
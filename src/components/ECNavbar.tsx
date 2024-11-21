import { Button } from "@/components/ui/button";
import { Search, ShoppingCartIcon, X } from "lucide-react";
import { Input } from "./ui/input";
import { useContext, useRef } from "react";
import { ShoppingCartContext } from "@/providers/ShoppingCartProvider";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ShoppingCartContent } from "./Ecommerce/ShoppingCart/ShoppingCartContent";
import { useAuth } from "@/providers/AuthProvider";

export function ECNavbar() {

  const { toggleIsOpen, isOpen, close } = useContext(ShoppingCartContext)
  const { user } = useAuth()

  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const handleOpenShoppingCart = () => {
    if (!triggerRef.current) return
    if (!closeRef.current) return
    toggleIsOpen()
    triggerRef.current.click()
  }

  return (
    <>
      <nav className="flex items-center md:justify-center gap-4 p-4">
        <div className="relative  grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar" className="pl-8" />
        </div>
        <Button variant="outline" onClick={handleOpenShoppingCart}>
          <ShoppingCartIcon />
        </Button>
      </nav>

      <Sheet open={isOpen} modal={false}>
        <SheetTrigger ref={triggerRef}></SheetTrigger>
        <SheetClose ref={closeRef}></SheetClose>
        <SheetContent
          defaultCloseButton={false}
          className="w-[400px] sm:w-[540px]"
        >
          <SheetHeader>
            <SheetTitle>Carrito</SheetTitle>
            <Button
              onClick={close}
              className="absolute right-4 top-4"
              variant='ghost'>
              <X />
            </Button>
            <SheetDescription>
              {user ? user.username : 'Cargando...'}
            </SheetDescription>
          </SheetHeader>
          <ShoppingCartContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
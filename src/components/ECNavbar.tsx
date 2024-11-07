import { Button } from "@/components/ui/button";
import { Search, ShoppingCartIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useContext, useRef } from "react";
import { ShoppingCartContext } from "@/providers/ShoppingCartProvider";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export function ECNavbar() {

  const { toggleIsOpen, isOpen } = useContext(ShoppingCartContext)

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
      <nav className="flex items-center justify-center gap-4 p-4">
        <div className="relative basis-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar" className="pl-8" />
        </div>
        <Button variant="outline" onClick={handleOpenShoppingCart}>
          <ShoppingCartIcon />
        </Button>
      </nav>

      <Sheet open={isOpen} modal={false}>
        <SheetTrigger ref={triggerRef} hidden></SheetTrigger>
        <SheetClose ref={closeRef} hidden></SheetClose>
        <SheetContent defaultCloseButton={false} className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Carrito</SheetTitle>
            <SheetDescription>
              Este es el carrito de compras
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
import { Button } from "@/components/ui/button";
import { Search, ShoppingCartIcon, X } from "lucide-react";
import { Input } from "./ui/input";
import { Suspense, useContext, useDeferredValue, useRef, useState } from "react";
import { ShoppingCartContext } from "@/providers/ShoppingCartProvider";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ShoppingCartContent } from "./Ecommerce/ShoppingCart/ShoppingCartContent";
import { useAuth } from "@/providers/AuthProvider";
import { SearchResult } from "./Ecommerce/SearchResults";

export function ECNavbar() {

  const { toggleIsOpen, isOpen, close, open } = useContext(ShoppingCartContext)
  const { user } = useAuth()
  const [searchInput, setSearchInput] = useState<string>("")
  const searchValue = useDeferredValue(searchInput)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const handleOpenShoppingCart = () => {
    if (!triggerRef.current) return
    if (!closeRef.current) return
    toggleIsOpen()
    triggerRef.current.click()
  }


  const handleSelectResult = () => {
    setSearchInput('')
    open()
  }


  return (
    <>
      <nav className="flex items-center md:justify-center gap-4 p-4">
        <div className="relative  grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Buscar" className="pl-8" />
          <Suspense fallback={<>Loading</>}>
            <SearchResult onSelectResult={handleSelectResult} query={searchValue} />
          </Suspense>
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
import { createContext, ReactNode, useState } from "react"

interface ShoppingCartContextType {
  open: () => void
  close: () => void
  isOpen: boolean
  toggleIsOpen: () => void
}


export const ShoppingCartContext = createContext({} as ShoppingCartContextType)

interface ShoppingCartProviderProps {
  children: ReactNode
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

  const [isOpen, setIsOpen] = useState(false)

  //Generate the context type methods
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)


  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggleIsOpen
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
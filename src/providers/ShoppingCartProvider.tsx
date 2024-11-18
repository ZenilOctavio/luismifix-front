import { createContext, ReactNode, useState } from "react"


interface Item {
  name: string
  imageUrl: string
  price: string
  quantity: number
}
interface ShoppingCartContextType {
  open: () => void
  close: () => void
  isOpen: boolean
  toggleIsOpen: () => void
  items: Item[]
}


export const ShoppingCartContext = createContext({} as ShoppingCartContextType)

interface ShoppingCartProviderProps {
  children: ReactNode
}

const initialItems: Item[] = [
  {
    name: "Producto 1",
    imageUrl: "../../../../public/home/top-10/audifonos.webp",
    price: "$100.00",
    quantity: 1,
  },
  {
    name: "Producto 2",
    imageUrl: "../../../../public/home/top-10/audifonos.webp",
    price: "$100.00",
    quantity: 1,
  },
  {
    name: "Producto 3",
    imageUrl: "../../../../public/home/top-10/audifonos.webp",
    price: "$100.00",
    quantity: 1,
  },
]

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<Item[]>(initialItems)

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
        toggleIsOpen,
        items
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
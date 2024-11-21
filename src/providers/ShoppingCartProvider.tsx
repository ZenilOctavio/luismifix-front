import { getCartService } from "@/services/cart/getCart"
import { createContext, ReactNode, useEffect, useState } from "react"
import { useAuth } from "./AuthProvider"
import { addToCartService } from "@/services/cart/addToCart"
import { CartServiceResponse } from "@/types/cart/CartServiceResponse"
import { getImageService } from "@/services/images/getImageService"
import { loadImageFromBuffer } from "@/lib/loadImageFromBuffer"
import { updateCartService } from "@/services/cart/updateCart"


interface Item {
  id: string
  name: string
  imageUrl: string
  price: number
  quantity: number
}
interface ShoppingCartContextType {
  cart: CartServiceResponse
  open: () => void
  close: () => void
  isOpen: boolean
  toggleIsOpen: () => void
  items: Item[]
  images: Record<string, string>
  addToCart: (item: Item) => void
  removeFromCart: (index: number) => void
  incrementItemQuantity: (index: number) => void
  decrementItemQuantity: (index: number) => void
  clearCart: () => void
}


export const ShoppingCartContext = createContext({} as ShoppingCartContextType)

interface ShoppingCartProviderProps {
  children: ReactNode
}

const initialItems: Item[] = []

const SHOPPING_CART_STORAGE_KEY = "shopping-cart"


export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState<Record<string, string>>({})
  const [cart, setCart] = useState<CartServiceResponse>({
    createdAt: '',
    products: [],
    status: 'PENDIENTE',
    totalPrice: 0,
    userId: '',
    totalAmount: 0
  } as CartServiceResponse)
  const [items, setItems] = useState<Item[]>(initialItems)
  const { user } = useAuth()

  //Generate the context type methods
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)

  const refreshCart = () => {
    getCartService(user._id)
      .then(data => { setCart(data) })
  }

  const addToCart = (item: Item) => {

    addToCartService({
      productId: item.id,
      quantity: item.quantity,
      userId: user._id
    }).then(() => {
      refreshCart()
    })

  }

  useEffect(() => {
    if (!user) return;
    refreshCart()
  }, [user])

  useEffect(() => {
    if (!cart) return;

    cart.products.forEach(product => {

      if (images[product.productId._id]) return;
      getImageService(product.productId._id)
        .then((data) => {

          const url = loadImageFromBuffer(data[data.length - 1].productImage.data)

          setImages({
            ...images,
            [product.productId._id]: url
          })
        })

    })
  }, [cart])


  const removeFromCart = (index: number) => {
    setItems(items.filter((_, itemIndex) => itemIndex !== index))
  }

  const clearCart = () => {
    setItems([])
  }

  const incrementItemQuantity = (index: number) => {
    const item = cart.products[index]

    item.quantity++

    updateCartService({
      productId: item.productId._id,
      quantity: item.quantity,
      userId: user._id
    }).then(() => {
      refreshCart()
    })
  }

  const decrementItemQuantity = (index: number) => {
    const item = cart.products[index]

    if (item.quantity == 1) return

    item.quantity--

    updateCartService({
      productId: item.productId._id,
      quantity: item.quantity,
      userId: user._id
    }).then(() => {
      refreshCart()
    })
  }


  useEffect(() => {
    localStorage.setItem(SHOPPING_CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  return (
    <ShoppingCartContext.Provider
      value={{
        images,
        cart,
        isOpen,
        open,
        close,
        toggleIsOpen,
        items,
        addToCart,
        removeFromCart,
        clearCart,
        incrementItemQuantity,
        decrementItemQuantity
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
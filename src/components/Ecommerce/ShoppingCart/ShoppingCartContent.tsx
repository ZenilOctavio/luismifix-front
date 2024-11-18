import { ShoppingCartContext } from "@/providers/ShoppingCartProvider"
import { useContext } from "react"
import { ShoppingCartItem } from "./ShoppingCartItem"
import { Button } from "@/components/ui/button"


export function ShoppingCartContent() {

  const { items } = useContext(ShoppingCartContext)

  return (
    <main className="h-full flex flex-col gap-4 pb-10">
      <ul className="flex flex-col gap-4 mt-4">

        {
          items.map(item => {
            return (
              <li key={item.name}>
                <ShoppingCartItem
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  imageUrl={item.imageUrl}
                  onIncrement={() => { }}
                  onDecrement={() => { }}
                  onRemove={() => { }}
                  disabled={false}
                />
              </li>
            )
          })
        }
      </ul>
      <Button className="w-full mt-auto">Comprar</Button>
    </main>
  )
}
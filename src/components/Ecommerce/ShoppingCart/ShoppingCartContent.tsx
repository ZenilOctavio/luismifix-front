import { ShoppingCartContext } from "@/providers/ShoppingCartProvider"
import { useContext } from "react"
import { ShoppingCartItem } from "./ShoppingCartItem"
import { Button } from "@/components/ui/button"


export function ShoppingCartContent() {

  const { cart, decrementItemQuantity, incrementItemQuantity, removeFromCart, images } = useContext(ShoppingCartContext)

  return (
    <main className="h-full flex flex-col gap-4 pb-10">
      <ul className="flex flex-col gap-4 mt-4 overflow-y-scroll py-4">

        {
          cart.products.map((item, index) => {
            const url = images[item.productId._id]
            console.log(images)
            return (
              <li key={item.productId.nameProduct}>
                <ShoppingCartItem
                  name={item.productId.nameProduct}
                  price={item.totalPriceProduct.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                  quantity={item.quantity}
                  imageUrl={url ? url : "../../../../public/logo_luismifix.png"}
                  onIncrement={() => { incrementItemQuantity(index) }}
                  onDecrement={() => { decrementItemQuantity(index) }}
                  onRemove={() => { removeFromCart(index) }}

                />
              </li>
            )
          })
        }
      </ul>

      <hr className="mt-auto " />

      <footer className="w-full flex flex-col items-center gap-2">
        <section >
          <span className="text-2xl">Total: <strong>{cart.totalAmount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</strong></span>
        </section>
        <Button className="w-full">Comprar</Button>
      </footer>
    </main>
  )
}
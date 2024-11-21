import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"

interface ShoppingCartItemProps {
  name: string
  price: string
  quantity: number
  imageUrl: string
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
  disabled?: boolean
}

export function ShoppingCartItem({
  name,
  price,
  quantity,
  imageUrl,
  onIncrement,
  onDecrement,
  onRemove,
  disabled = false
}: ShoppingCartItemProps) {

  const incrementQuantity = () => {
    if (quantity == 10) return;
    onIncrement()
  }

  const decrementQuantity = () => {

    if (quantity == 1) return;

    onDecrement()
  }

  const remove = () => {
    onRemove()
  }

  const disabledClass = "cursor-not-allowed"

  return (
    <article className={disabled ? `${disabledClass} flex gap-3 h-full w-full items-stretch relative` : `flex gap-3 h-full w-full items-stretch`}>
      <figure className="basis-1/3 overflow-hidden rounded-sm bg-white ">
        <img src={imageUrl} className="w-full h-full object-contain" />
      </figure>
      <main className="flex flex-col gap-3 basis-2/3 items-stretch ">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl font-semibold">{name}</h3>
          <h4 className="text-green-500 font-semibold text-xl">{price}</h4>
        </div>
        <Button className="z-10" onClick={remove} variant="secondary"><Trash2 /></Button>
        <div className="flex items-center justify-between border rounded-sm gap-2 w-full mt-auto py-1">
          <div role="button" className={disabled ? `cursor-not-allowed opacity-50 px-2` : `hover:cursor-pointer hover:scale-[1.05] px-2`}
            onClick={decrementQuantity}
          ><Minus /></div>
          <span className="select-none">{quantity}</span>
          <div role="button" className={disabled ? `cursor-not-allowed opacity-50 px-2` : `hover:cursor-pointer hover:scale-[1.05] px-2`}
            onClick={incrementQuantity}
          ><Plus /></div>
        </div>
      </main>

      <div className={disabled ? `absolute w-full h-full bg-slate-900 opacity-35 rounded-sm p-10` : 'hidden'}></div>
    </article>
  )
}
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"


export function ProductView() {

  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => {
    if (quantity == 10) return;
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {

    if (quantity == 1) return;

    setQuantity(quantity - 1)
  }


  return (
    <main className="flex gap-10 p-4 flex-col items-center lg:flex-row">
      <figure className="w-full lg:max-w-[50vw] overflow-hidden rounded-sm">
        <img src="../../../../public/home/top-10/macbook.webp" className="w-full h-full" />
      </figure>
      <aside className="basis-1/2 flex flex-col gap-3">
        <sub className="tracking-tighter">Laptops</sub>
        <h1 className="text-3xl font-bold">Macbook Air 13inch M1 Chip 256GB</h1>
        <p className="text-green-500 font-semibold text-3xl">$335.00</p>
        <sub>Impuestos incluidos</sub>
        <p className="text-slate-400 ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque rerum delectus illo dolor illum libero nihil soluta animi voluptatibus minima expedita, numquam distinctio officia esse! Ad dolor officiis quod repellendus?</p>

        <section className="flex gap-2 mt-auto w-full">
          <div className="flex items-center border rounded-sm gap-2">
            <div role="button" className="hover:cursor-pointer hover:scale-[1.05] px-2"
              onClick={decrementQuantity}
            ><Minus /></div>
            <span className="select-none">{quantity}</span>
            <div role="button" className="hover:cursor-pointer hover:scale-[1.05] px-2"
              onClick={incrementQuantity}
            ><Plus /></div>
          </div>
          <Button className="grow">Añadir al carrito</Button>

        </section>

      </aside>

    </main>
  )
}
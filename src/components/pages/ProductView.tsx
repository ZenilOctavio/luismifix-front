import { Button } from "@/components/ui/button"
import { loadImageFromBuffer } from "@/lib/loadImageFromBuffer"
import { ShoppingCartContext } from "@/providers/ShoppingCartProvider"
import { getImageService } from "@/services/images/getImageService"
import { getProductById } from "@/services/products/getProducts"
import { Minus, Plus } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"


export function ProductView() {

  const product = useLoaderData() as Awaited<ReturnType<typeof getProductById>> | null

  const [quantity, setQuantity] = useState(1)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { addToCart } = useContext(ShoppingCartContext)

  useEffect(() => {
    if (!product) return;
    getImageService(product._id)
      .then(data => {

        if (!data.length) return;

        const latestPhotoBuffer = data[data.length - 1].productImage.data

        const url = loadImageFromBuffer(latestPhotoBuffer)

        setImageUrl(url)
      })
  }, [])


  if (!product) return <main><h1>No existe tal producto</h1></main>

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.nameProduct,
      imageUrl: imageUrl || "../../../../public/home/top-10/macbook.webp",
      price: product.priceProduct,
      quantity
    })
  }

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
      <figure className="bg-white overflow-hidden p-3 rounded-sm basis-1/2">
        <img src={imageUrl || "../../../../public/home/top-10/macbook.webp"} className="w-full h-full max-h-[70vh] object-contain" />
      </figure>
      <aside className="basis-1/2 flex flex-col gap-3">
        <sub className="tracking-tighter">{product.idTypeProduct.nameTypeProduct}</sub>
        <h1 className="text-3xl font-bold">{product.nameProduct}</h1>
        <p className="text-green-500 font-semibold text-3xl">{product.priceProduct.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
        <sub>Impuestos incluidos</sub>
        <p className="text-slate-400 ">{product.descriptionProduct}</p>

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
          <Button className="grow" onClick={handleAddToCart}>Añadir al carrito</Button>

        </section>

      </aside>

    </main>
  )
}
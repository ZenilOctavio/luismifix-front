import { Card, CardFooter, CardHeader } from "../ui/card"

interface ProductCardProps {
  name: string
  imageUrl: string
  price: number
  category: string

}

export function ProductCard({ name, imageUrl, price, category }: ProductCardProps) {
  const formattedPrice = "$" + price.toFixed(2)

  return (
    <Card className="cursor-pointer h-full w-full flex flex-col gap-2 justify-start items-start">
      <CardHeader className="h-3/4 w-full">
        <figure className="h-full w-full overflow-hidden rounded-sm bg-white">
          <img src={imageUrl} alt="" className="w-full h-full object-contain" />

        </figure>
      </CardHeader>
      <CardFooter>
        <section className="flex flex-col gap-2">
          <sub className="font-semibold text-muted-foreground">{category}</sub>
          <h4>{name}</h4>
          <p className="text-green-400">{formattedPrice}</p>
        </section>
      </CardFooter>
    </Card>
  )
}
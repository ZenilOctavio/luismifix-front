import { Badge } from "@/components/ui/badge"

interface CategoryCardProps {
  categoryName: string
  pitch: string
  description?: string
  image?: string
}

export function CategoryCard({ categoryName, pitch, description = "", image }: CategoryCardProps) {
  return (
    <article className="relative rounded-sm overflow-hidden h-full w-full hover:scale-[1.02] transition-transform cursor-pointer">
      <figure className="w-full h-full absolute ">
        <img className="w-full h-full object-cover opacity-60 -z-10" src={image} alt="" />
      </figure>
      <main className="flex flex-col items-start relative p-4 h-full text-foreground">
        <Badge className="self-end">{categoryName}</Badge>

        <p className="text-white text-sm ">{description}</p>
        <h3 className="text-white text-xl font-bold mt-auto">{pitch}</h3>
      </main>
    </article>
  )
}
interface CategoryCardProps {
  categoryName: string
  imageSrc?: string
}

export function CategoryCard({ categoryName, imageSrc }: CategoryCardProps) {
  return (
    <article className="">
      <figure className="overflow-hidden rounded-sm">
        <img
          src={imageSrc || "../../../../public/home/categories/grab-phone.jpg"}
          alt=""
          className="w-full h-full"
        />
      </figure>
      <main className="flex mt-4 justify-center">
        <h2 className="text-lg font-semibold">{categoryName}</h2>
      </main>
    </article>
  )
}
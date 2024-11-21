import { PRODUCT_PAGE_PATHNAME } from "@/config/constants"
import { getProductByName } from "@/services/products/getProducts"
import { Product } from "@/types/products/Product"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "../ui/badge"

interface SearchResultProps {
  query: string
  onSelectResult: () => void
}

export function SearchResult({ query, onSelectResult }: SearchResultProps) {

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    (async () => {
      const newProducts = await getProductByName(query)
      console.log(newProducts)
      setProducts(newProducts)
    })()

  }, [query])

  const handleClick = () => {
    onSelectResult()
  }

  if (query == "") return <></>
  console.log(products)
  return (
    <ul className="absolute bg-background w-full rounded-sm rounded-t-none flex flex-col gap-2 border-2 border-t-0">
      {products.map((product) => (
        <li key={product._id} className="hover:bg-primary-foreground">
          <Link
            className="flex w-full h-full py-2 px-4"
            to={PRODUCT_PAGE_PATHNAME.replace(':id', product._id)}
            onClick={handleClick}
          >
            <span>{product.nameProduct}</span><Badge className="ml-auto">{product.idTypeProduct.nameTypeProduct}</Badge>
          </Link>
        </li>
      ))}
    </ul>
  )
}
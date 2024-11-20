import useProducts from "@/hooks/useProducts"
import { Product } from "@/types/products/Product"
import { Link, useLoaderData, useParams } from "react-router-dom"
import { ProductCard } from "../Ecommerce/ProductCard"
import { useEffect, useState } from "react"
import { getImageService } from "@/services/images/getImageService"
import { loadImageFromBuffer } from "@/lib/loadImageFromBuffer"
import { PRODUCT_PAGE_PATHNAME } from "@/config/constants"


type ProductCategoryParams = {
  id: string
}

export function ProductsOfCategoryView() {
  const products = useLoaderData() as Product[]
  const { id } = useParams<ProductCategoryParams>()
  const { productTypes } = useProducts()
  const [imagesUrls, setImagesUrls] = useState<Record<string, string>>({})


  const productType = productTypes.find(productType => productType._id == id)

  useEffect(() => {

    if (!products) return;

    products.forEach(product => {
      getImageService(product._id)
        .then(data => {
          const imageUrl = loadImageFromBuffer(data[data.length - 1].productImage.data)
          setImagesUrls(prev => {
            return {
              ...prev,
              [product._id]: imageUrl
            }
          })
        })
    })
  }, [])




  return (

    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">{productType && productType.nameTypeProduct}</h1>
      <ul className="flex flex-wrap justify-center gap-4">
        {
          products ?
            products.map(product => {
              return (
                <li key={product._id} className="basis-1/5">
                  <Link to={PRODUCT_PAGE_PATHNAME.replace(':id', product._id)}>
                    <ProductCard
                      name={product.nameProduct}
                      category={product.idTypeProduct.nameTypeProduct}
                      price={product.priceProduct}
                      imageUrl={imagesUrls[product._id]}
                    />
                  </Link>
                </li>
              )
            })
            :
            <li>
              No hay productos
            </li>
        }
      </ul>
    </main>

  )
}
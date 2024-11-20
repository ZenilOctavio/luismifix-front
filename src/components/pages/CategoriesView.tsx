import { Link } from "react-router-dom";
import { CategoryCard } from "../Ecommerce/Categories/CategoryCard";
import useProducts from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { getProductsByType } from "@/services/products/getProductsByType";
import { getImageService } from "@/services/images/getImageService";
import { loadImageFromBuffer } from "@/lib/loadImageFromBuffer";
import { PRODUCTS_OF_CATEGORY_PAGE_PATHNAME } from "@/config/constants";

export function CategoriesView() {

  const [images, setImages] = useState<Record<string, string>>({})
  const { productTypes } = useProducts()


  useEffect(() => {
    if (!productTypes) return;

    productTypes.forEach(productType => {
      getProductsByType(productType._id)
        .then(products => {
          return products
        })
        .then(products => products.length ? products[0] : undefined)
        .then(product => {

          if (!product) return;

          getImageService(product._id)
            .then(data => {
              const imageUrl = loadImageFromBuffer(data[data.length - 1].productImage.data)
              setImages(prev => {
                return {
                  ...prev,
                  [productType._id]: imageUrl
                }
              })
            })

        })
    })


  }, [productTypes])

  return (
    <div className="flex">
      <ul className="flex gap-4 flex-wrap justify-center">
        {
          productTypes &&
          productTypes.map(productType => {
            return (
              <li key={productType._id} className="basis-60 hover:cursor-pointer hover:scale-105 transition-transform">
                <Link to={PRODUCTS_OF_CATEGORY_PAGE_PATHNAME.replace(':id', productType._id)}>
                  <CategoryCard imageSrc={images[productType._id]} categoryName={productType.nameTypeProduct} />
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
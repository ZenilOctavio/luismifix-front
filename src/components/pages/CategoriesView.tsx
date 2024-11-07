import { CategoryCard } from "../Ecommerce/Categories/CategoryCard";

export function CategoriesView() {
  return (
    <div className="flex">
      <ul className="flex gap-4 flex-wrap justify-center">
        <li className="basis-60 hover:cursor-pointer hover:scale-105 transition-transform">
          <CategoryCard />
        </li>
        <li className="basis-60 hover:cursor-pointer hover:scale-105 transition-transform">
          <CategoryCard />
        </li>
        <li className="basis-60 hover:cursor-pointer hover:scale-105 transition-transform">
          <CategoryCard />
        </li>
        <li className="basis-60 hover:cursor-pointer hover:scale-105 transition-transform">
          <CategoryCard />
        </li>
        <li className="basis-60 hover:cursor-pointer hover:scale-105 transition-transform">
          <CategoryCard />
        </li>
        <li className="basis-60 hover:cursor-pointer hover:scale-105 transition-transform">
          <CategoryCard />
        </li>
        <li className="basis-60 hover:cursor-pointer hover:scale-105 transition-transform">
          <CategoryCard />
        </li>
        <li className="basis-60 hover:cursor-pointer hover:scale-105 transition-transform">
          <CategoryCard />
        </li>
      </ul>
    </div>
  )
}
import { Link } from "react-router-dom";
import { CategoryCard } from "../Ecommerce/Home/CategoryCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ProductCard } from "../Ecommerce/ProductCard";
import { Separator } from "../ui/separator";

export function EcommerceHome() {


  return (
    <div className="flex flex-col gap-10 p-4">
      <section className="md:h-[50vh] mb-[5vh] sm:h-[100vh]">
        <h1 className="text-transparent mb-5 text-4xl font-bold bg-gradient-to-r bg-clip-text from-blue-600 via-blue-400 to-foreground">Bienvenido a la tienda Luismifix</h1>
        <ul className="lg:grid grid-cols-4 gap-4 h-full grid-flow-col flex flex-col">
          <li className="row-start-1 row-end-3 col-start-1 col-end-3 grow">
            <Link to="/">
              <CategoryCard
                categoryName="Celulares"
                pitch="Encuentra tu celular perfecto"
                image="../../../public/home/categories/grab-phone.jpg"
              />
            </Link>
          </li>
          <li className="row-start-1 row-end-3 grow">
            <Link to="/">
              <CategoryCard
                categoryName="Consolas"
                pitch="Descubre soluciones ideales para tu próxima consola"
                image="../../../public/home/categories/controllers.jpg"
              />
            </Link>
          </li>
          <li className="grow">
            <Link to="/">
              <CategoryCard
                categoryName="Auriculares"
                pitch="Escucha la diferencia"
                image="../../../public/home/categories/headphones.jpg"
              />
            </Link>
          </li>
          <li className=" grow">
            <Link to="/">
              <CategoryCard
                categoryName="Relojes inteligentes"
                pitch="Experimenta la tecnología"
                image="../../../public/home/categories/smartwatch.jpg"
              />
            </Link>
          </li>
        </ul>
      </section>
      <Separator />
      <section >
        <ul className=" gap-4 items-stretch grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          <li className="basis-72">
            <Card className="h-full w-full flex flex-col gap-5">
              <CardHeader>
                <CardTitle className="text-3xl">Top 10 productos más vendidos</CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <main className="flex flex-col gap-2 justify-between h-full grow">
                  <p className="text-xl">¿Buscas algún dispositivo digital en específico? ¡Aquí están nuestros dispositivos más vendidos!</p>
                  <Button variant="link">Buscar más</Button>
                </main>
              </CardContent>
            </Card>
          </li>
          <li className="basis-80 h-full hover:scale-[1.01] transition-transform">
            <ProductCard imageUrl="../../../public/home/top-10/ps4-controller.webp" name="Playstation Controller DualSense" category="Consolas" price={223} />
          </li>
          <li className="basis-80 h-full hover:scale-[1.01] transition-transform">
            <ProductCard imageUrl="../../../public/home/top-10/audifonos.webp" name="Anker Life 2 Neo" category="Auriculares" price={123} />
          </li>
          <li className="basis-80 h-full hover:scale-[1.01] transition-transform">
            <ProductCard imageUrl="../../../public/home/top-10/macbook.webp" name="Macbook Air 13inch M1 Chip 256GB" category="Laptops" price={335} />
          </li>
          <li className="basis-80 h-full hover:scale-[1.01] transition-transform">
            <ProductCard imageUrl="../../../public/home/top-10/jbl-bocina.webp" name="JBL GO 3" category="Bocinas" price={334} />
          </li>
          <li className="basis-80 h-full hover:scale-[1.01] transition-transform">
            <ProductCard imageUrl="../../../public/home/top-10/mouse.webp" name="Logitec M190 Wireless Mouse" category="Mouse" price={229} />
          </li>
          <li className="basis-80 h-full hover:scale-[1.01] transition-transform">
            <ProductCard imageUrl="../../../public/home/top-10/pixel.webp" name="Google Pixel 8 Pro 128GB" category="Celulares" price={338} />
          </li>
          <li className="basis-80 h-full hover:scale-[1.01] transition-transform">
            <ProductCard imageUrl="../../../public/home/top-10/bocina-kardon.webp" name="Kardon Luna" category="Bocina" price={338} />
          </li>

        </ul>

      </section>

    </div>
  )
}
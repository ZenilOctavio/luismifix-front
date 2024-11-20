import './css/globals.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'
import ProvidersPage from './components/pages/ProvidersPage'
import { ThemeProvider } from './providers/ThemeProvider'
import { CATEGORIES_PAGE_PATHNAME, ECOMMERCE_PAGE_PATHNAME, HOME_PAGE_PATHNAME, INVENTORY_PAGE_PATHNAME, PRODUCT_PAGE_PATHNAME, PRODUCTS_HISTORICAL_PAGE_PATHNAME, PRODUCTS_OF_CATEGORY_PAGE_PATHNAME, PROVIDERS_PAGE_PATHNAME, REGISTER_PAGE_PATHNAME } from './config/constants'
import { AuthProvider } from './providers/AuthProvider'
import { InventoryProviders } from './components/inventory/InventoryProviders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductsHistorical } from './components/pages/ProductsHistorical'
import { EcommerceHome } from './components/pages/EcommerceHome'
import { EcommerceLayout } from './components/layouts/EcommerceLayout'
import { RegisterPage } from './components/pages/Register'
import { CategoriesView } from './components/pages/CategoriesView'
import { ProductView } from './components/pages/ProductView'
import { ProductsOfCategoryView } from './components/pages/ProductsOfCategoryView'
import { getProductsByType } from './services/products/getProductsByType'

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<LoginPage />}></Route>
      <Route path={REGISTER_PAGE_PATHNAME} element={<RegisterPage />}></Route>
      <Route path={HOME_PAGE_PATHNAME} element={<HomePage />}></Route>
      <Route path={INVENTORY_PAGE_PATHNAME} element={<InventoryProviders />}></Route>
      <Route path={PROVIDERS_PAGE_PATHNAME} element={<ProvidersPage />}></Route>
      <Route path={PRODUCTS_HISTORICAL_PAGE_PATHNAME} element={<ProductsHistorical />}></Route>
      <Route path={ECOMMERCE_PAGE_PATHNAME} element={<EcommerceLayout />}>
        <Route index element={<EcommerceHome />}></Route>
        <Route path={CATEGORIES_PAGE_PATHNAME} element={<CategoriesView />}></Route>
        <Route loader={async ({ params }) => {
          const { id } = params

          console.log(id)

          if (!id) return null

          try {
            const products = await getProductsByType(id)
            return products
          } catch (error) {

            return null
          }

        }}
          path={PRODUCTS_OF_CATEGORY_PAGE_PATHNAME}
          element={<ProductsOfCategoryView />}
        ></Route>
        <Route path={PRODUCT_PAGE_PATHNAME} element={<ProductView />}></Route>
      </Route>
    </>
  )
)

function App() {

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme='dark'>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>

  )
}

export default App

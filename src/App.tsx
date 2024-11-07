import './css/globals.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'
import ProvidersPage from './components/pages/ProvidersPage'
import { ThemeProvider } from './providers/ThemeProvider'
import { ECOMMERCE_PAGE_PATHNAME, HOME_PAGE_PATHNAME, INVENTORY_PAGE_PATHNAME, PRODUCTS_HISTORICAL_PAGE_PATHNAME, PROVIDERS_PAGE_PATHNAME, REGISTER_PAGE_PATHNAME } from './config/constants'
import { AuthProvider } from './providers/AuthProvider'
import { InventoryProviders } from './components/inventory/InventoryProviders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductsHistorical } from './components/pages/ProductsHistorical'
import { EcommerceHome } from './components/pages/EcommerceHome'
import { EcommerceLayout } from './components/layouts/EcommerceLayout'
import { RegisterPage } from './components/pages/Register'

const queryClient = new QueryClient()

function App() {

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme='dark'>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route index element={<LoginPage />}></Route>
              <Route path={REGISTER_PAGE_PATHNAME} element={<RegisterPage />}></Route>
              <Route path={HOME_PAGE_PATHNAME} element={<HomePage />}></Route>
              <Route path={INVENTORY_PAGE_PATHNAME} element={<InventoryProviders />}></Route>
              <Route path={PROVIDERS_PAGE_PATHNAME} element={<ProvidersPage />}></Route>
              <Route path={PRODUCTS_HISTORICAL_PAGE_PATHNAME} element={<ProductsHistorical />}></Route>
              <Route path={ECOMMERCE_PAGE_PATHNAME} element={<EcommerceLayout />}>
                <Route index element={<EcommerceHome />}></Route>
              </Route>
            </Routes>
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>

  )
}

export default App

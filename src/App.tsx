import './css/globals.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'
import ProvidersPage from './components/pages/ProvidersPage'
import { ThemeProvider } from './providers/ThemeProvider'
import { HOME_PAGE_PATHNAME, INVENTORY_PAGE_PATHNAME, PRODUCTS_HISTORICAL_PAGE_PATHNAME, PROVIDERS_PAGE_PATHNAME } from './config/constants'
import { AuthProvider } from './providers/AuthProvider'
import { InventoryProviders } from './components/inventory/InventoryProviders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductsHistorical } from './components/pages/ProductsHistorical'

const queryClient = new QueryClient()

function App() {
  
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme= 'dark'>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route index element = {<LoginPage/>}></Route>
              <Route path={ HOME_PAGE_PATHNAME } element = {<HomePage/>}></Route>
              <Route path={ INVENTORY_PAGE_PATHNAME } element = {<InventoryProviders/>}></Route>
              <Route path={ PROVIDERS_PAGE_PATHNAME } element = {<ProvidersPage/>}></Route>
              <Route path={ PRODUCTS_HISTORICAL_PAGE_PATHNAME } element = {<ProductsHistorical/>}></Route>
            </Routes>
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>

  )
}

export default App

import './css/globals.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'
import { ThemeProvider } from './providers/ThemeProvider'
import { HOME_PAGE_PATHNAME, INVENTORY_PAGE_PATHNAME } from './config/constants'
import { AuthProvider } from './providers/AuthProvider'
import InventoryPage from './components/pages/InventoryPage'

function App() {

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme= 'dark'>
        <Router>
          <Routes>
            <Route index element = {<LoginPage/>}></Route>
            <Route path={ HOME_PAGE_PATHNAME } element = {<HomePage/>}></Route>
            <Route path={ INVENTORY_PAGE_PATHNAME } element = {<InventoryPage/>}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>

  )
}

export default App

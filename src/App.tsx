import './css/globals.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'
import ProvidersPage from './components/pages/ProvidersPage'
import { ThemeProvider } from './providers/ThemeProvider'
import { HOME_PAGE_PATHNAME, PROVIDERS_PAGE_PATHNAME } from './config/constants'
import { AuthProvider } from './providers/AuthProvider'

function App() {

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme= 'dark'>
        <Router>
          <Routes>
            <Route index element = {<LoginPage/>}></Route>
            <Route path={ HOME_PAGE_PATHNAME } element = {<HomePage/>}></Route>
            <Route path={ PROVIDERS_PAGE_PATHNAME } element = {<ProvidersPage/>}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>

  )
}

export default App

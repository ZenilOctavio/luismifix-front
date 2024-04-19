import './css/globals.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'
import { ThemeProvider } from './providers/ThemeProvider'
import { HOME_PAGE_PATHNAME } from './config/constants'

function App() {

  return (
    <ThemeProvider defaultTheme= 'dark'>
      <Router>
      <Routes>
        <Route index element = {<LoginPage/>}></Route>
        <Route path={ HOME_PAGE_PATHNAME } element = {<HomePage/>}></Route>
      </Routes>
    </Router>
    </ThemeProvider>

  )
}

export default App

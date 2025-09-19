// HOOKS
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
// STYLES
import './index.css'
// LAYOUTS
import PublicLayout from './pages/layouts/PublicLayout'
import SimpleLayout from './pages/layouts/SimpleLayout'
// PAGES
import Landing from './pages/general/LandingPage'
import Services from './pages/general/Services'
import Houses from './pages/general/Houses'
import Register from './pages/general/Register'
import Login from './pages/general/Login'
import Value from './pages/general/Value'
import Disclaimer from "./pages/general/Disclaimer"
import Results from './pages/general/Results';
// CONTEXT
import { UserProvider } from './contexts/ProveedorUsuario'

// Arreglo que contiene las rutas de la aplicación
const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout/>,
    children: [
      { index: true, element: <Landing /> },
      { path: "services", element: <Services /> },
      { path: "houses", element: <Houses /> },
      { path: "disclaimer", element: <Disclaimer /> },
      { path: "value/quick", element: <Value mode="quick" /> },
      { path: "value/full", element: <Value mode="full" /> },
      { path: "value", element: <Value/>},
      { path: "results", element: <Results/>}
  
    ]
  },
  {
    path: '/simple/',
    element: <SimpleLayout/>,
    children: [
      {path: "register", element: <Register/>},
      {path: "login", element: <Login/>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)

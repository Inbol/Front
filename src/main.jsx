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
import Houses from './pages/general/Houses'
import Register from './pages/general/Register'
import Login from './pages/general/Login'
import Value from './pages/general/Value'
import HeatMap from './pages/general/HeatMap'
import Informes from  './pages/general/Informes'


// Arreglo que contiene las rutas de la aplicación
const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout/>,
    children: [
      { index: true, element: <Landing /> },
      { path: "houses", element: <Houses /> },
      { path: "value", element: <Value/>},
      { path:  "heatmap", element: <HeatMap/> },
      { path:  "informes", element: <Informes/> }
      
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
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

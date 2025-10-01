import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import App from './App.tsx'

import Home from './pages/home.page.tsx'
import PurchasePage from './pages/purchase.page.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'home',
        Component: Home,
      },
      {
        path: 'purchase',
        Component: PurchasePage,
      },
      {
        path: 'settings',
        Component: () => <div>Settings Page</div>,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <RouterProvider router={router} />

  </StrictMode>,
)

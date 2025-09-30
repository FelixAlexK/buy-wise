import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Home from './pages/home.page.tsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import PurchasePage from './pages/purchase.page.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "home", 
        Component: Home,
      },
      {
        path: "purchase",
        Component: PurchasePage,
      },
      {
        path: "settings",
        Component: () => <div>Settings Page</div>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
      <RouterProvider  router={router} />
    
  </StrictMode>,
)

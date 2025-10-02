import { createBrowserRouter } from 'react-router'
import App from './App'
import Home from './pages/home.page'
import PurchasePage from './pages/purchase.page'
import Settings from './pages/settings.page'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'home',
        Component: Home,
      },
      {
        index: true,
        Component: PurchasePage,
      },
      {
        path: 'settings',
        Component: Settings,
      },
    ],
  },
])

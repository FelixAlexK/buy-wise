import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import App from './App'

const Home = lazy(() => import('./pages/home.page'))
const Login = lazy(() => import('./pages/login.page'))
const PurchasePage = lazy(() => import('./pages/purchase.page'))
const Settings = lazy(() => import('./pages/settings.page'))

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
      {
        path: 'login',
        Component: Login,
      },
    ],
  },
])

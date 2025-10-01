import { createBrowserRouter } from "react-router";
import Home from "./pages/home.page";
import PurchasePage from "./pages/purchase.page";
import App from "./App";
import Settings from "./pages/settings.page";

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
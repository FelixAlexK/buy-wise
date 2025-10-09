import { Outlet } from 'react-router'
import { DesktopNavbar } from './components/desktop-nav.component'
import MobileNavbar from './components/mobile-nav.component'

function App() {
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="lg:hidden">
        <h1 className="text-3xl font-bold text-center p-4 border-b">BuyWise</h1>
      </header>
      <main className="">

        <DesktopNavbar content={<Outlet />}></DesktopNavbar>
      </main>

      <footer className="mt-auto lg:hidden"><MobileNavbar /></footer>
    </div>
  )
}

export default App

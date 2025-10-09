import { Outlet } from 'react-router'
import { DesktopNavbar } from './components/nav.component'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <div className="flex flex-col min-h-screen ">

      <DesktopNavbar content={<Outlet />}></DesktopNavbar>
      <Toaster position="top-right" />
    </div>
  )
}

export default App

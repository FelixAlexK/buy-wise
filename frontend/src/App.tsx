import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { DesktopNavbar } from './components/nav.component'
import { Toaster } from './components/ui/sonner'
import { Spinner } from './components/ui/spinner'

function App() {
  return (
    <div className="flex flex-col min-h-screen ">

      <DesktopNavbar>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </DesktopNavbar>
      <Toaster position="top-right" />
    </div>
  )
}

export default App

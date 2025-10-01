import { Outlet } from 'react-router'
import Nav from './components/mobile-nav.component'

function App() {
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="   p-8">
        <Outlet />
      </main>

      <footer className="mt-auto"><Nav /></footer>
    </div>
  )
}

export default App

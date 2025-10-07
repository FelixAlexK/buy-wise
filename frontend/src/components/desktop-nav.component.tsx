import { Banknote, Home, Settings } from 'lucide-react'
import { NavLink } from 'react-router'
import { authClient } from '../lib/auth-client'

export function DesktopNavbar({ content }: { content: React.ReactNode }) {
  const { data } = authClient.useSession()

  return (
    <>
      <nav className="hidden lg:block fixed h-full w-64 z-10 top-0 left-0 overflow-x-hidden pr-4 py-4 border-r">
        <h1 className="text-3xl font-bold text-center">BuyWise</h1>
        <div className="flex flex-col gap-4 mt-8">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              [
                'p-4 w-full flex items-center justify-center rounded-r-md transition-colors duration-200',
                isActive ? 'bg-black text-white font-semibold' : 'hover:bg-gray-200',
              ].join(' ')}
          >
            <span className="mr-2 text-lg ">Home</span>
            <Home />
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              [
                'p-4 w-full flex items-center justify-center rounded-r-md transition-colors duration-200',
                isActive ? 'bg-black text-white font-semibold' : 'hover:bg-gray-200',
              ].join(' ')}
          >
            <span className="mr-2 text-lg ">Purchase</span>
            <Banknote />
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              [
                'p-4 w-full flex items-center justify-center rounded-r-md transition-colors duration-200',
                isActive ? 'bg-black text-white font-semibold' : 'hover:bg-gray-200',
              ].join(' ')}
          >
            <span className="mr-2 text-lg ">Settings</span>
            <Settings />
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              [
                'p-4 w-full flex items-center justify-center rounded-r-md transition-colors duration-200',
                isActive ? 'bg-black text-white font-semibold' : 'hover:bg-gray-200',
              ].join(' ')}
          >
            <span className="mr-2 text-lg ">Login</span>
            <Settings />
          </NavLink>
        </div>
        <div className=" ">
          {data
            ? (
                <div className="mt-4 text-center">
                  <span className="text-sm">Signed in as</span>
                  <p className="font-medium">{data.user?.email}</p>
                </div>
              )
            : (
                <div className="mt-4 text-center">
                  <span className="text-sm">Not signed in</span>
                </div>
              )}
        </div>

      </nav>
      <div className="lg:ml-64">
        {content}
      </div>

    </>
  )
}

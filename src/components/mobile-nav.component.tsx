import { Banknote, Home, Settings } from 'lucide-react'
import { NavLink } from 'react-router'

export default function Nav() {
  return (
    <nav className="flex flex-row justify-between text-black items-center border-t  text-center">

      <NavLink
        to="/home"
        className={({ isActive }) =>
          [
            'p-4 w-full flex items-center justify-center border-r',
            isActive ? 'bg-black text-white' : '',
          ].join(' ')}
      >
        <Home />
      </NavLink>
      <NavLink
        to="/purchase"
        className={({ isActive }) =>
          [
            'p-4 w-full flex items-center justify-center',
            isActive ? 'bg-black text-white' : '',
          ].join(' ')}
      >
        <Banknote />
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          [
            'p-4 w-full flex items-center justify-center border-l',
            isActive ? 'bg-black text-white' : '',
          ].join(' ')}
      >
        <Settings />
      </NavLink>
    </nav>
  )
}

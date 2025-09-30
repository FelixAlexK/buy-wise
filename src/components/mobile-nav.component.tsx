import {Banknote, Home, Settings} from 'lucide-react'
import { NavLink, Route, Routes } from 'react-router'

export default function Nav() {
    return (
        <nav className="flex flex-row justify-between text-black items-center border-t  text-center">
            
            <NavLink to="/home" className="p-4 w-full flex items-center justify-center border-r " ><Home /></NavLink>
            <NavLink to="/purchase" className="p-4 w-full flex items-center justify-center" ><Banknote /></NavLink>
            <NavLink to="/settings" className="p-4 w-full flex items-center justify-center border-l " ><Settings /></NavLink>
        </nav>
    )
}
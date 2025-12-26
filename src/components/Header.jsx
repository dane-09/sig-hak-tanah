import { NavLink } from "react-router-dom";
import { Map, Home, User, Layers } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center px-8 md:px-12 sticky top-0 z-[1001]">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
          <Layers className="text-white w-5 h-5" />
        </div>
        <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">
          SIG <span className="text-blue-600">Hak Tanah</span>
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 flex justify-center items-center gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-slate-500 hover:text-blue-600 hover:bg-slate-50"
            }`
          }
        >
          <Home size={18} />
          Home
        </NavLink>

        <NavLink
          to="/map"
          className={({ isActive }) =>
            `flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-slate-500 hover:text-blue-600 hover:bg-slate-50"
            }`
          }
        >
          <Map size={18} />
          Interactive Map
        </NavLink>
      </nav>

      {/* User Profile Section */}
      <div className="flex items-center gap-4 bg-slate-50 pl-4 pr-1.5 py-1.5 rounded-full border border-slate-100">
        <div className="flex flex-col items-end leading-tight">
          <span className="text-xs font-bold text-slate-900">Kelompok 1</span>
        </div>
        <div className="relative">
        
          </div>
        </div>

    </header>
  );
}
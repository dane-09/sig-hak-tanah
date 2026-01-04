import { NavLink, useNavigate } from "react-router-dom";
import { Map, Home, Layers, LogIn } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center px-8 md:px-12 sticky top-0 z-[1001]">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
          <Layers className="text-white w-5 h-5" />
        </div>
        <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">
          Geo<span className="text-indigo-600">Tanah.</span>
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 flex justify-center items-center gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
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
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
            }`
          }
        >
          <Map size={18} />
          Interactive Map
        </NavLink>
      </nav>

      {/* Login Button Section */}
      <div className="flex items-center">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <LogIn size={18} />
         Login
        </button>
      </div>

    </header>
  );
}
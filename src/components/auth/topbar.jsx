import { FiSearch, FiUser, FiPieChart, FiList, FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function TopBar({
  title = "SIG",
  subtitle = "",
  onSearch,
}) {
  const location = useLocation();

  // Helper untuk mengecek menu aktif agar ada indikator visual
  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white shadow-sm border-b sticky top-0 z-[1000]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-3">
        
        {/* LEFT: Branding & Title */}
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* NAVIGATION LINKS - Desktop */}
          <nav className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl">
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                isActive("/admin")
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <FiPieChart size={16} />
              Dashboard
            </Link>
            <Link
              to="/admin/list"
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                isActive("/admin/list")
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <FiList size={16} />
              List Data
            </Link>
          </nav>
        </div>

        {/* RIGHT: Search & Profile */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          
          {/* Search Bar */}
          {onSearch && (
            <div className="relative group flex-1 md:flex-none">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Cari ID atau Jenis Hak..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          )}

          <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

          {/* User Profile Dropdown Placeholder */}
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-800 leading-none">Administrator</p>
              <p className="text-[10px] font-medium text-slate-400">Pekanbaru, ID</p>
            </div>
            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-100 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition-colors">
              <FiUser size={20} />
            </div>
            <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* MOBILE NAVIGATION - Muncul hanya di layar kecil */}
      <nav className="flex md:hidden border-t items-center justify-around py-2 bg-white">
          <Link to="/admin" className={`text-xs font-bold ${isActive("/admin") ? "text-indigo-600" : "text-slate-400"}`}>Dashboard</Link>
          <Link to="/admin/list" className={`text-xs font-bold ${isActive("/admin/list") ? "text-indigo-600" : "text-slate-400"}`}>List Data</Link>
      </nav>
    </header>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiAlertCircle, FiArrowRight } from "react-icons/fi";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulasi delay sedikit agar terasa seperti proses autentikasi asli
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        // Jika benar, arahkan ke route /admin
        navigate("/admin");
      } else {
        setError("Username atau password salah!");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleLogin} className="space-y-6">
        {/* INPUT USERNAME */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
            Username
          </label>
          <div className="relative group">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-700 placeholder:font-medium placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* INPUT PASSWORD */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
            Password
          </label>
          <div className="relative group">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-700 placeholder:font-medium placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="flex items-center gap-2 bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 animate-shake">
            <FiAlertCircle className="flex-shrink-0" />
            <p className="text-xs font-bold uppercase tracking-wider">{error}</p>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              Masuk 
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* HINT UNTUK DEVELOPMENT */}
        <div className="mt-8 pt-6 border-t border-dashed border-slate-100">
            <p className="text-[9px] text-center font-bold text-slate-400 uppercase tracking-[0.1em]">
                Gunakan akun <span className="text-indigo-400">admin</span> 
            </p>
        </div>
      </form>
    </div>
  );
}
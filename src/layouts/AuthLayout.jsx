import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#091242]">
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-xl overflow-hidden">

        {/* TOP ACCENT */}
        <div className="h-2 bg-[#f59e0b]" />

        <div className="p-8">
          {/* TITLE */}
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-black text-[#273270] tracking-tight">
              SIG Hak Tanah
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Sistem Informasi Geografis
            </p>
          </div>

          {/* FORM CONTENT */}
          <Outlet />

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-400 mt-8">
            © 2025 Sistem Informasi Geografis Hak Tanah
          </p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  UserCircle, 
  FileWarning, 
  ChevronLeft 
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Informasi yang Kami Kumpulkan",
      content: "Sistem Informasi Geografis (SIG) Kantah Pekanbaru mengumpulkan data geospasial yang mencakup ID bidang tanah (FID), koordinat lokasi, dan jenis hak atas tanah. Kami tidak mengumpulkan informasi data pribadi pemilik secara mendalam dalam akses publik kecuali untuk kepentingan validasi internal.",
      icon: <UserCircle className="text-blue-600" size={24} />
    },
    {
      title: "Penggunaan Informasi",
      content: "Data yang ditampilkan digunakan semata-mata untuk tujuan transparansi tata ruang, monitoring distribusi hak tanah, dan membantu pengambilan kebijakan di wilayah hukum Kantor Pertanahan Kota Pekanbaru.",
      icon: <Lock className="text-emerald-600" size={24} />
    },
    {
      title: "Keamanan Data",
      content: "Kami menerapkan standar keamanan enkripsi data untuk melindungi dataset GeoJSON kami dari akses tidak sah. Akses ke database utama dibatasi hanya untuk personil Seksi Survei dan Pemetaan yang memiliki kewenangan.",
      icon: <ShieldCheck className="text-amber-600" size={24} />
    },
    {
      title: "Pembatasan Akses (Data Publik)",
      content: "Publik hanya dapat melihat data yang bersifat informasi umum. Nama pemilik, NIK, dan nomor sertifikat lengkap tetap dirahasiakan sesuai dengan UU Keterbukaan Informasi Publik dan regulasi internal kementerian.",
      icon: <EyeOff className="text-red-600" size={24} />
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans pb-20">
      {/* ================= HEADER ================= */}
      <div className="bg-white border-b border-slate-200 pt-10 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-8 hover:gap-3 transition-all">
            <ChevronLeft size={18} /> Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-blue-600" size={32} />
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Legal & Privacy</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Kebijakan <span className="text-blue-700">Privasi</span>
          </h1>
          <p className="text-slate-500 mt-4 text-lg">
            Komitmen Kantor Pertanahan Kota Pekanbaru dalam melindungi data geospasial dan privasi pengguna sistem.
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <main className="max-w-4xl mx-auto px-8 -mt-8">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex-shrink-0 flex items-center justify-center">
                {section.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-tight italic">
                  {section.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Warning */}
        <div className="mt-12 p-8 bg-amber-50 rounded-[2rem] border border-amber-100 flex gap-6 items-start">
            <div className="bg-amber-500 p-2 rounded-xl text-white mt-1">
                <FileWarning size={20} />
            </div>
            <div>
                <h4 className="font-black text-amber-900 text-sm mb-2 uppercase">Perhatian Khusus</h4>
                <p className="text-amber-800/70 text-xs font-bold leading-relaxed">
                    Setiap penyalahgunaan data spasial yang diunduh atau diekstrak dari portal ini untuk tujuan yang melanggar hukum akan diproses sesuai dengan peraturan perundang-undangan yang berlaku di Republik Indonesia. Data ini bukan merupakan bukti kepemilikan hak yang sah di mata hukum, melainkan hanya alat bantu informasi geospasial.
                </p>
            </div>
        </div>

        {/* Footer Kontak */}
        <div className="mt-20 text-center border-t border-slate-200 pt-10">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Terakhir diperbarui</p>
          <p className="text-slate-900 font-bold text-sm mb-6">25 Desember 2025</p>
          <p className="text-slate-400 text-[10px] font-bold uppercase leading-relaxed max-w-md mx-auto">
            Kantor Pertanahan Kota Pekanbaru<br/>
            Jl. Teratai No.123, Sukajadi, Kota Pekanbaru, Riau
          </p>
        </div>
      </main>
    </div>
  );
}
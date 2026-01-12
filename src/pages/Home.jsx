import React, { useMemo } from "react";
import StatCard from "../components/StatCard";
import { Link } from "react-router-dom";    
import InfoCard from "../components/InfoCard";
import { 
  Building2, 
  Briefcase, 
  UserCheck, 
  Heart,    
  Layers,
  Map as MapIcon,
  ChevronRight,
  Database,
  ShieldCheck,
  FileText,
  GanttChartSquare // Ikon untuk Hak Pengelolaan
} from "lucide-react";

// Data Source
import geoData from "../data/hak_tanah_fix.json"; 

export default function Home() {
  const stats = useMemo(() => {
    // Menambahkan hpl ke dalam summary
    const summary = { hgb: 0, hgu: 0, hp: 0, hpl: 0, hw: 0, total: geoData.features.length };
    
    geoData.features.forEach((feature) => {
      const tipe = feature.properties.TIPEHAK;
      if (tipe === "Hak Guna Bangunan") summary.hgb++;
      else if (tipe === "Hak Guna Usaha") summary.hgu++;
      else if (tipe === "Hak Pakai") summary.hp++;
      else if (tipe === "Hak Pengelolaan") summary.hpl++; // Logika baru
      else if (tipe === "Hak Wakaf") summary.hw++;
    });
    return summary;
  }, []);

  return (
    <div className="bg-[#f4f7fe] min-h-screen font-sans text-slate-900">
      
      {/* ================= HERO SECTION ================= */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-600 w-2 h-6 rounded-full"></span>
                <p className="text-blue-600 font-extrabold text-sm uppercase tracking-widest">Pusat Data Pertanahan</p>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Dashboard <span className="text-blue-700 font-outline-2">Geospasial</span>
              </h1>
              <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
                Sistem pemantauan distribusi hak atas tanah nasional secara transparan dan akuntabel berbasis data spasial di wilayah Kota Pekanbaru.
              </p>
            </div>
            <div className="hidden lg:block">
               <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center gap-5">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-600">
                    <Database size={32} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">Terakhir Sinkronisasi</p>
                    <p className="text-slate-900 font-black">{new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 -mt-10 pb-20">
        
        {/* ================= STATISTIK UTAMA (Grid diubah ke 6 kolom agar muat semua) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard title="HGB" value={stats.hgb} color="bg-blue-600" icon={<Building2 size={22} />} />
          <StatCard title="HGU" value={stats.hgu} color="bg-emerald-600" icon={<Briefcase size={22} />} />
          <StatCard title="Hak Pakai" value={stats.hp} color="bg-amber-500" icon={<UserCheck size={22} />} />
          
          {/* KARTU BARU: Hak Pengelolaan */}
          <StatCard title="HPL" value={stats.hpl} color="bg-red-600" icon={<GanttChartSquare size={22} />} />
          
          <StatCard title="Hak Wakaf" value={stats.hw} color="bg-indigo-600" icon={<Heart size={22} />} />
          
          {/* TOTAL CARD */}
          <div className="bg-slate-900 rounded-[2rem] p-6 shadow-2xl text-white relative overflow-hidden flex flex-col justify-between group cursor-default">
            <div className="relative z-10">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Bidang</p>
              <h3 className="text-3xl font-black mt-1 leading-none">{stats.total}</h3>
            </div>
            <div className="relative z-10 mt-4 flex items-center text-[9px] font-bold text-blue-400 gap-1 uppercase tracking-tighter">
              Lihat Detail <ChevronRight size={12} />
            </div>
            <Layers className="absolute -bottom-4 -right-4 text-white/5 group-hover:text-white/10 transition-all duration-500" size={100} />
          </div>
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Layanan Informasi</h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MapIcon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Analisis Spasial</h3>
                <p className="text-slate-500 leading-relaxed text-sm">Visualisasi poligon otomatis berdasarkan dataset GeoJSON untuk akurasi data lokasi persil tanah secara real-time.</p>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Keamanan Data</h3>
                <p className="text-slate-500 leading-relaxed text-sm">Integrasi data terenkripsi untuk mendukung transparansi tata ruang nasional tanpa mengabaikan privasi pemilik hak.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <FileText className="text-blue-600" size={20} /> Tautan Cepat
            </h3>
            
            <div className="space-y-4">
              {[
                { name: 'Panduan Pengguna', path: '/panduan-Pengguna' },
                { name: 'Kebijakan Privasi', path: '/Kebijakan-Privasi' },
                  { name: 'Informasi Hak Tanah', path: '/infomarsi-hak-tanah' },
              ].map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-blue-600 hover:text-white transition-all font-bold text-sm text-slate-600 group"
                >
                  {item.name}
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
               <Layers size={20} />
             </div>
             <span className="font-black text-xl tracking-tighter uppercase italic">
               SIG <span className="text-blue-600">PEKANBARU</span>
             </span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] text-center leading-relaxed">
            © 2025 KANTOR PERTANAHAN KOTA PEKANBARU <br/>
            DIREKTORAT JENDERAL PENETAPAN HAK DAN PENDAFTARAN TANAH <br/>
            KEMENTERIAN AGRARIA DAN TATA RUANG / BADAN PERTANAHAN NASIONAL
          </p>
        </div>
      </footer>
    </div>
  );
}
import React from "react";
import { 
  MousePointer2, 
  Map as MapIcon, 
  Layers, 
  Info, 
  Search,
  CheckCircle2
} from "lucide-react";

export default function UserGuide() {
  const steps = [
    {
      title: "Navigasi Peta",
      description: "Gunakan mouse atau gesture cubit untuk melakukan zoom in/out dan geser peta untuk melihat wilayah Pekanbaru lainnya.",
      icon: <MousePointer2 className="text-blue-600" size={24} />,
      color: "bg-blue-50"
    },
    {
      title: "Filter Lapisan Hak",
      description: "Klik ikon layer di pojok kanan atas peta untuk menyaring tampilan berdasarkan jenis hak (HGB, HGU, Hak Pakai, dll).",
      icon: <Layers className="text-emerald-600" size={24} />,
      color: "bg-emerald-50"
    },
    {
      title: "Informasi Detail",
      description: "Klik pada poligon atau bidang tanah tertentu untuk memunculkan jendela pop-up yang berisi nomor FID dan tipe hak.",
      icon: <Info className="text-amber-600" size={24} />,
      color: "bg-amber-50"
    }
  ];

  return (
    <section className="py-16 bg-white rounded-[3rem] shadow-sm border border-slate-100 my-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        
        {/* Header Panduan */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="text-blue-600" size={20} />
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em]">Bantuan Penggunaan</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 uppercase">Panduan <span className="text-blue-700">Aplikasi</span></h2>
          </div>
          <p className="text-slate-500 text-sm max-w-xs font-medium italic">
            Ikuti langkah-langkah di bawah ini untuk mengoptimalkan penggunaan fitur geospasial kami.
          </p>
        </div>

        {/* Grid Langkah-langkah */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group p-6 rounded-[2rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-500">
              {/* Badge Angka */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black shadow-lg group-hover:bg-blue-600 transition-colors">
                {index + 1}
              </div>
              
              <div className={`${step.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
                {step.icon}
              </div>
              
              <h3 className="text-lg font-black text-slate-800 mb-3 tracking-tight leading-tight">
                {step.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Info Tambahan */}
        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
            <div className="bg-blue-600 p-2 rounded-lg text-white mt-1">
                <MapIcon size={16} />
            </div>
            <div>
                <h4 className="font-black text-blue-900 text-sm mb-1 uppercase tracking-tight">Catatan Teknis</h4>
                <p className="text-blue-800/70 text-xs font-medium leading-relaxed">
                    Data yang ditampilkan adalah data spasial terkini yang telah divalidasi oleh Seksi Survei dan Pemetaan Kantah Pekanbaru. Jika terjadi perbedaan data, harap merujuk pada Buku Tanah fisik.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
}
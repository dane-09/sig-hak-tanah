import React from "react";
import { 
  FiInfo, 
  FiHome, 
  FiBriefcase, 
  FiMap, 
  FiHeart, 
  FiShield 
} from "react-icons/fi";

const landInfo = [
  {
    title: "Hak Guna Bangunan (HGB)",
    icon: <FiHome className="text-blue-600" />,
    color: "bg-blue-50",
    border: "border-blue-200",
    desc: "Hak untuk mendirikan dan mempunyai bangunan atas tanah yang bukan miliknya sendiri, dengan jangka waktu paling lama 30 tahun dan dapat diperpanjang paling lama 20 tahun.",
    suitable: "Perumahan, Ruko, Gedung Perkantoran.",
  },
  {
    title: "Hak Guna Usaha (HGU)",
    icon: <FiBriefcase className="text-emerald-600" />,
    color: "bg-emerald-50",
    border: "border-emerald-200",
    desc: "Hak mengusahakan tanah yang dikuasai langsung oleh Negara, dalam jangka waktu tertentu, untuk usaha pertanian, perikanan atau peternakan.",
    suitable: "Perkebunan Sawit, Tambak Ikan, Peternakan Sapi.",
  },
  {
    title: "Hak Pakai (HP)",
    icon: <FiMap className="text-amber-600" />,
    color: "bg-amber-50",
    border: "border-amber-200",
    desc: "Hak menggunakan dan/atau memungut hasil dari tanah yang dikuasai langsung oleh Negara atau tanah hak milik orang lain.",
    suitable: "Kedutaan Asing, Instansi Pemerintah, Fasilitas Umum.",
  },
  {
    title: "Hak Pengelolaan (HPL)",
    icon: <FiShield className="text-red-600" />,
    color: "bg-red-50",
    border: "border-red-200",
    desc: "Hak menguasai dari Negara yang kewenangan pelaksanaannya sebagian dilimpahkan kepada pemegang haknya untuk mengelola tata guna tanah.",
    suitable: "Kawasan Industri, Otorita Pelabuhan, Badan Bank Tanah.",
  },
  {
    title: "Hak Wakaf",
    icon: <FiHeart className="text-purple-600" />,
    color: "bg-purple-50",
    border: "border-purple-200",
    desc: "Hak atas tanah milik yang sudah diwakafkan untuk keperluan ibadah atau keperluan umum sesuai dengan syariat.",
    suitable: "Masjid, Pesantren, Pemakaman Umum.",
  },
];

export default function InfoHakTanah() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      {/* Header Bagian Atas */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200">
            <FiInfo size={24} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Informasi Jenis Hak Tanah
          </h1>
        </div>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Pahami perbedaan instrumen hukum pertanahan di Indonesia berdasarkan 
          Undang-Undang Pokok Agraria (UUPA) untuk pengelolaan aset yang tepat.
        </p>
      </div>

      {/* Grid Kartu Informasi */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landInfo.map((item, index) => (
          <div 
            key={index}
            className={`group bg-white p-8 rounded-[2.5rem] border ${item.border} shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
          >
            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            
            <h3 className="text-xl font-black text-slate-800 mb-4">
              {item.title}
            </h3>
            
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {item.desc}
            </p>

            <div className="pt-6 border-t border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                Peruntukan Umum:
              </span>
              <p className="text-xs font-bold text-slate-700">
                {item.suitable}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="max-w-6xl mx-auto mt-16 p-8 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold mb-1">Butuh bantuan lebih lanjut?</h4>
          <p className="text-slate-400 text-sm font-medium">Konsultasikan status hak tanah Anda pada kantor pertanahan setempat.</p>
        </div>
        <button className="px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-2xl transition-all active:scale-95">
          Hubungi ATR/BPN
        </button>
      </div>
    </div>
  );
}
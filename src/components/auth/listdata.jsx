import React, { useEffect, useState, useMemo } from "react";
import {
  FiTrash2,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiX,
  FiDatabase,
  FiMap,
} from "react-icons/fi";

import {
  getAllHakTanah,
  createHakTanah,
  deleteHakTanah,
} from "../../services/hakTanahApi";

export default function ListData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal + Form
  const [showModal, setShowModal] = useState(false);
  const [tipeHak, setTipeHak] = useState("");
  const [coordinates, setCoordinates] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllHakTanah();
      setData(res.features || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    setCurrentPage(1);
    return data.filter((item) =>
      item.properties?.TIPEHAK?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(start, start + itemsPerPage);

  const handleAdd = async () => {
    if (!tipeHak || !coordinates) {
      alert("Semua field wajib diisi!");
      return;
    }

    let parsedCoordinates;
    try {
      parsedCoordinates = JSON.parse(coordinates);
    } catch {
      alert("Format koordinat harus JSON valid!");
      return;
    }

    await createHakTanah({
      type: "Feature",
      properties: {
        TIPEHAK: tipeHak,
        // FID biasanya digenerate otomatis oleh backend
      },
      geometry: {
        type: "Polygon",
        coordinates: parsedCoordinates,
      },
    });

    setShowModal(false);
    setTipeHak("");
    setCoordinates("");
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus data ini?")) return;
    await deleteHakTanah(id);
    fetchData();
  };

  return (
    <div className="p-6 md:p-10 bg-[#F8FAFC] min-h-screen font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <FiDatabase className="text-indigo-600" /> Manajemen Lahan
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Daftar inventaris spasial hak tanah Kota Pekanbaru
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              placeholder="Cari jenis hak..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-72 pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            <FiPlus size={20} /> Tambah Data
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">FID</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Jenis Hak Tanah</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Menyinkronkan Data...</p>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length ? (
                currentItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="px-8 py-5">
                      <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-sm">
                        #{item.properties.FID || 'NEW'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${item.properties.TIPEHAK === 'Hak Guna Bangunan' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                         <span className="font-bold text-slate-700">{item.properties.TIPEHAK}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-10 h-10 inline-flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                        title="Hapus Data"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <FiSearch size={48} className="mb-4" />
                      <p className="text-xl font-black uppercase tracking-widest">Data Kosong</p>
                      <p className="text-sm font-medium">Tidak ada hasil yang sesuai dengan kriteria Anda</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-8 py-6 bg-slate-50/50 border-t border-slate-100 gap-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            Halaman <span className="text-slate-800">{currentPage}</span> dari <span className="text-slate-800">{totalPages || 1}</span>
          </p>
          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-current transition-all shadow-sm"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-current transition-all shadow-sm"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL TAMBAH (GLASSMORPHISM) */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[2000] p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Input Data Spasial</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Sistem Informasi Geografis</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                <FiX size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Kategori Hak</label>
                <select
                  value={tipeHak}
                  onChange={(e) => setTipeHak(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700"
                >
                  <option value="">Pilih Jenis Hak</option>
                  <option>Hak Guna Bangunan</option>
                  <option>Hak Guna Usaha</option>
                  <option>Hak Pakai</option>
                  <option>Hak Pengelolaan</option>
                  <option>Hak Wakaf</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end ml-1">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Koordinat Polygon</label>
                  <span className="text-[10px] font-bold text-indigo-500">FORMAT: [[[lng, lat], ...]]</span>
                </div>
                <textarea
                  rows={6}
                  placeholder="Contoh: [[[101.44, 0.53], [101.45, 0.53], ...]]"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono text-sm leading-relaxed"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleAdd}
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 transition-all active:scale-95"
                >
                  Simpan Lahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
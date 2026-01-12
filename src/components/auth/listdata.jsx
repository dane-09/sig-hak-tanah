import React, { useEffect, useState, useMemo } from "react";
import * as turf from "@turf/turf";
import { FiTrash2, FiPlus, FiChevronLeft, FiChevronRight, FiSearch, FiX, FiDatabase, FiMapPin } from "react-icons/fi";
import { getAllHakTanah, createHakTanah, deleteHakTanah } from "../../services/hakTanahApi";

const LIST_KECAMATAN = ["Tampan", "Payung Sekaki", "Bukit Raya", "Marpoyan Damai", "Tenayan Raya", "Limapuluh", "Sail", "Senapelan", "Sukajadi", "Rumbai", "Rumbai Pesisir", "Pekanbaru Kota"];

export default function ListData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form State
  const [showModal, setShowModal] = useState(false);
  const [tipeHak, setTipeHak] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [coordinates, setCoordinates] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllHakTanah();
      setData(res.features || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const calculateArea = (f) => {
    try { return turf.area(f); } catch { return 0; }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.properties?.TIPEHAK?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.properties?.Kecamatan?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleAdd = async () => {
    if (!tipeHak || !kecamatan || !coordinates) return alert("Lengkapi data!");
    try {
      await createHakTanah({
        type: "Feature",
        properties: { TIPEHAK: tipeHak, Kecamatan: kecamatan },
        geometry: { type: "Polygon", coordinates: JSON.parse(coordinates) },
      });
      setShowModal(false); resetForm(); fetchData();
    } catch { alert("Format Koordinat Salah!"); }
  };

  const resetForm = () => { setTipeHak(""); setKecamatan(""); setCoordinates(""); };

  return (
    <div className="p-6 md:p-10 bg-[#F8FAFC] min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <FiDatabase className="text-indigo-600" /> Inventaris Lahan
          </h2>
          <p className="text-slate-500 font-medium">Pengelolaan data spasial Kecamatan di Pekanbaru</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              placeholder="Cari Hak / Kecamatan..." 
              className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl w-full sm:w-72 outline-none focus:border-indigo-500 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100">
            <FiPlus /> Tambah
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <th className="px-8 py-5">FID</th>
              <th className="px-8 py-5">Jenis Hak</th>
              <th className="px-8 py-5">Kecamatan</th>
              <th className="px-8 py-5 text-right">Luas (m²)</th>
              <th className="px-8 py-5 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors font-bold text-slate-700">
                <td className="px-8 py-5 text-indigo-600 font-mono">#{item.properties.FID}</td>
                <td className="px-8 py-5">{item.properties.TIPEHAK}</td>
                <td className="px-8 py-5 flex items-center gap-2">
                  <FiMapPin className="text-slate-300" /> {item.properties.Kecamatan}
                </td>
                <td className="px-8 py-5 text-right font-mono text-slate-500">
                  {calculateArea(item).toLocaleString("id-ID")}
                </td>
                <td className="px-8 py-5 text-center">
                  <button onClick={() => deleteHakTanah(item.id).then(fetchData)} className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[2000] p-4 font-sans">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black">Tambah Data Spasial</h3>
              <button onClick={() => setShowModal(false)}><FiX size={24} className="text-slate-400" /></button>
            </div>
            <div className="space-y-4">
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold" value={tipeHak} onChange={e => setTipeHak(e.target.value)}>
                <option value="">Pilih Jenis Hak</option>
                <option>Hak Guna Bangunan</option><option>Hak Guna Usaha</option><option>Hak Pakai</option>
              </select>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold" value={kecamatan} onChange={e => setKecamatan(e.target.value)}>
                <option value="">Pilih Kecamatan</option>
                {LIST_KECAMATAN.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
              <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-mono text-xs" rows={4} placeholder="Koordinat [[[lng, lat], ...]]" value={coordinates} onChange={e => setCoordinates(e.target.value)} />
              <button onClick={handleAdd} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">Simpan Lahan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
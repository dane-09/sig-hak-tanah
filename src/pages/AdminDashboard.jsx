import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getAllHakTanah } from "../services/hakTanahApi";

// 1. Konsistensi Warna & Style
const landStyles = {
  "Hak Guna Bangunan": { color: "#1e40af", fill: "#3b82f6", key: "HGB" },
  "Hak Guna Usaha": { color: "#064e3b", fill: "#10b981", key: "HGU" },
  "Hak Pakai": { color: "#92400e", fill: "#f59e0b", key: "HP" },
  "Hak Pengelolaan": { color: "#dc2626", fill: "#ef4444", key: "HPL" },
  "Hak Wakaf": { color: "#5b21b6", fill: "#8b5cf6", key: "Wakaf" },
  default: { color: "#64748b", fill: "#94a3b8", key: "Lainnya" },
};

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [geoJSON, setGeoJSON] = useState(null);
  const [loading, setLoading] = useState(true);

  // State Filter Aktif
  const [activeFilters, setActiveFilters] = useState(["HGB", "HGU", "HP", "HPL", "Wakaf"]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getAllHakTanah();
      setData(res.features || []);
      setGeoJSON(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. Filter Data untuk Peta & Statistik
  const filteredFeatures = useMemo(() => {
    if (!data) return [];
    return data.filter((f) => {
      const tipe = f.properties?.TIPEHAK;
      const key = landStyles[tipe]?.key || "Lainnya";
      return activeFilters.includes(key);
    });
  }, [data, activeFilters]);

  const stats = useMemo(() => {
    const r = { total: data.length, HGB: 0, HGU: 0, HP: 0, HPL: 0, Wakaf: 0 };
    data.forEach((d) => {
      const key = landStyles[d.properties?.TIPEHAK]?.key;
      if (key && r.hasOwnProperty(key)) r[key]++;
    });
    return r;
  }, [data]);

  // 3. Toggle Filter Function
  const toggleFilter = (key) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">GeoAdmin <span className="text-indigo-600 underline decoration-indigo-200">Dashboard</span></h1>
          <p className="text-sm font-medium text-slate-500">Monitoring Real-time Hak Atas Tanah</p>
        </div>
        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "⌛ Memproses..." : "🔄 Refresh Data"}
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Bidang" value={stats.total} color="bg-slate-900" icon="📊" />
        <StatCard title="HGB" value={stats.HGB} color="bg-blue-600" icon="🏠" />
        <StatCard title="HGU" value={stats.HGU} color="bg-emerald-600" icon="🌱" />
        <StatCard title="Hak Pakai" value={stats.HP} color="bg-amber-600" icon="🛡️" />
        <StatCard title="HPL" value={stats.HPL} color="bg-rose-600" icon="🏢" />
        <StatCard title="Wakaf" value={stats.Wakaf} color="bg-violet-600" icon="🌙" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* SIDEBAR FILTER */}
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-800 mb-4 text-xs uppercase tracking-widest">Filter Layer Peta</h3>
            <div className="space-y-2">
              {Object.entries(landStyles).map(([tipe, style]) => {
                if (tipe === "default") return null;
                const isActive = activeFilters.includes(style.key);
                return (
                  <button
                    key={tipe}
                    onClick={() => toggleFilter(style.key)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                      isActive 
                        ? "border-indigo-600 bg-indigo-50/50" 
                        : "border-transparent bg-slate-50 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: style.fill }}></div>
                      <span className={`text-xs font-bold ${isActive ? "text-indigo-900" : "text-slate-500"}`}>
                        {style.key}
                      </span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isActive ? "bg-indigo-600 border-indigo-600" : "border-slate-300"}`}>
                        {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-dashed">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Ringkasan Filter</p>
                <p className="text-lg font-black text-slate-700">{filteredFeatures.length} <span className="text-xs font-medium text-slate-400 uppercase">Terpilih</span></p>
            </div>
          </div>
        </div>

        {/* MAP CONTAINER */}
        <div className="xl:col-span-3 bg-white rounded-[2.5rem] p-2 border border-slate-200 shadow-sm overflow-hidden h-[500px] relative">
          <MapContainer
            center={[0.4464, 101.3694]}
            zoom={14}
            zoomControl={false}
            className="w-full h-full rounded-[2rem] z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />
            
            {/* 4. KEY FIX: Kita tambahkan 'key' yang berubah berdasarkan activeFilters agar komponen GeoJSON me-render ulang sepenuhnya */}
            <GeoJSON 
              key={activeFilters.join(",")} 
              data={{ type: "FeatureCollection", features: filteredFeatures }} 
              style={(feature) => {
                const s = landStyles[feature.properties?.TIPEHAK] || landStyles.default;
                return {
                    color: s.color,
                    fillColor: s.fill,
                    weight: 1.5,
                    fillOpacity: 0.6,
                };
              }}
              onEachFeature={(feature, layer) => {
                layer.bindPopup(`
                  <div class="font-sans">
                    <p class="text-[10px] font-bold text-slate-400 uppercase m-0">Tipe Hak</p>
                    <p class="font-black text-indigo-600 m-0 mb-2">${feature.properties.TIPEHAK}</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase m-0">FID</p>
                    <p class="font-mono font-bold text-slate-700 m-0">#${feature.properties.FID}</p>
                  </div>
                `);
              }}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color, icon }) {
  return (
    <div className="bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
      <div className={`absolute -right-4 -top-4 w-16 h-16 ${color} opacity-5 rounded-full group-hover:scale-150 transition-transform`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
          <p className="text-3xl font-black text-slate-800 tracking-tighter">{value.toLocaleString()}</p>
        </div>
        <div className={`p-2 rounded-xl bg-slate-50 text-xl`}>{icon}</div>
      </div>
    </div>
  );
}
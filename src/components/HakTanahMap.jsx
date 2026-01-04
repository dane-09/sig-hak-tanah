import React, { useEffect, useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";

const landStyles = {
  "Hak Guna Bangunan": { color: "#1e40af", fill: "#3b82f6", label: "HGB" },
  "Hak Guna Usaha": { color: "#064e3b", fill: "#10b981", label: "HGU" },
  "Hak Pakai": { color: "#92400e", fill: "#f59e0b", label: "HP" },
  "Hak Pengelolaan": { color: "#dc2626", fill: "#ef4444", label: "HPL" },
  "Hak Wakaf": { color: "#5b21b6", fill: "#8b5cf6", label: "Wakaf" },
};

export default function MapHakTanah() {
  const [geoData, setGeoData] = useState(null);
  const [activeFilters, setActiveFilters] = useState(Object.keys(landStyles));

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetch("http://localhost:3001/hak-tanah/all")
      .then((res) => res.json())
      .then(setGeoData)
      .catch(console.error);
  }, []);

  /* ================= FILTER DATA (LOGIC FIX) ================= */
  const filteredFeatures = useMemo(() => {
    if (!geoData?.features) return [];
    return geoData.features.filter((f) =>
      activeFilters.includes(f.properties.TIPEHAK)
    );
  }, [geoData, activeFilters]);

  /* ================= STYLE & POPUP ================= */
  const styleFeature = (feature) => {
    const tipe = feature.properties.TIPEHAK;
    const s = landStyles[tipe] || { color: "#333", fill: "#999" };
    return {
      color: s.color,
      fillColor: s.fill,
      weight: 2,
      fillOpacity: 0.6,
    };
  };

  const onEachFeature = (feature, layer) => {
    const { FID, TIPEHAK } = feature.properties;
    const area = Math.round(turf.area(feature));

    layer.bindPopup(`
      <div style="font-family: sans-serif;">
        <h4 style="margin: 0 0 5px 0; color: #1e293b;">${TIPEHAK}</h4>
        <p style="margin: 0; font-size: 12px;"><b>ID:</b> ${FID}</p>
        <p style="margin: 0; font-size: 12px;"><b>Luas:</b> ${area.toLocaleString("id-ID")} m²</p>
      </div>
    `);
  };

  const toggleFilter = (tipe) => {
    setActiveFilters((prev) =>
      prev.includes(tipe)
        ? prev.filter((t) => t !== tipe)
        : [...prev, tipe]
    );
  };

  return (
    <div className="flex w-full h-screen bg-slate-50 p-4 gap-4 font-sans text-slate-900">
      {/* SIDEBAR */}
      <div className="w-80 flex flex-col gap-4 flex-shrink-0">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold mb-1">SIG Hak Tanah</h2>
          <p className="text-xs text-slate-500 mb-6 font-medium tracking-wide uppercase">
            Legenda & Filter Layer
          </p>

          <div className="space-y-2">
            {Object.entries(landStyles).map(([key, val]) => {
              const isActive = activeFilters.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleFilter(key)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                    isActive
                      ? "bg-white border-slate-200 shadow-sm opacity-100"
                      : "bg-slate-50 border-transparent opacity-40 hover:opacity-60"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: val.fill,
                      border: `2px solid ${val.color}`,
                    }}
                  />
                  <div className="text-left">
                    <p className="text-xs font-bold leading-none">{val.label}</p>
                    <p className="text-[10px] text-slate-500 mt-1 truncate w-40">{key}</p>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* STATS CARD */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
            Total Bidang Terpilih
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{filteredFeatures.length}</span>
            <span className="text-sm text-slate-400 font-medium">Unit</span>
          </div>
        </div>
      </div>

      {/* MAP AREA */}
      <div className="flex-1 rounded-[2rem] overflow-hidden bg-white shadow-inner border border-slate-200 relative">
        <MapContainer
          center={[0.4464, 101.3694]}
          zoom={16}
          zoomControl={false}
          className="w-full h-full z-0"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />

          {/* FIX UTAMA: Penggunaan Key agar GeoJSON me-render ulang saat filter berubah */}
          {geoData && (
            <GeoJSON
              key={activeFilters.join("-")}
              data={{ type: "FeatureCollection", features: filteredFeatures }}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
        
        {/* Indikator Loading di Peta */}
        {!geoData && (
          <div className="absolute inset-0 bg-slate-100/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-slate-600">Memuat Data Spasial...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
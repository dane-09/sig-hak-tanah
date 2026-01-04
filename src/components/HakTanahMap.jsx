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
  const [activeFilters, setActiveFilters] = useState(
    Object.keys(landStyles) // ⬅️ TANPA default
  );

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetch("http://localhost:3001/hak-tanah/all")
      .then((res) => res.json())
      .then(setGeoData)
      .catch(console.error);
  }, []);

  /* ================= FILTER DATA (FIX UTAMA) ================= */
  const filteredGeoJSON = useMemo(() => {
    if (!geoData?.features) return null;

    return {
      ...geoData,
      features: geoData.features.filter((f) =>
        activeFilters.includes(f.properties.TIPEHAK)
      ),
    };
  }, [geoData, activeFilters]);

  /* ================= STATISTIK ================= */
  const areaSummary = useMemo(() => {
    if (!geoData?.features) return [];

    const map = {};
    geoData.features.forEach((f) => {
      const tipe = f.properties.TIPEHAK;
      if (!activeFilters.includes(tipe)) return;

      map[tipe] = (map[tipe] || 0) + turf.area(f);
    });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
      ...(landStyles[name]),
    }));
  }, [geoData, activeFilters]);

  /* ================= STYLE ================= */
  const styleFeature = (feature) => {
    const tipe = feature.properties.TIPEHAK;
    const s = landStyles[tipe];
    return {
      color: s.color,
      fillColor: s.fill,
      weight: 1.5,
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    const { FID, TIPEHAK } = feature.properties;
    const area = Math.round(turf.area(feature));

    layer.bindPopup(`
      <strong>${TIPEHAK}</strong><br/>
      ID: ${FID}<br/>
      Luas: ${area.toLocaleString("id-ID")} m²
    `);
  };

  const toggleFilter = (tipe) => {
    setActiveFilters((prev) =>
      prev.includes(tipe)
        ? prev.filter((t) => t !== tipe)
        : [...prev, tipe]
    );
  };

  /* ================= COUNT ================= */
  const filteredCount = filteredGeoJSON?.features.length || 0;

  return (
    <div className="flex w-full h-screen bg-slate-100 p-3 gap-3">
      {/* SIDEBAR */}
      <div className="w-96 space-y-4 overflow-y-auto">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-xs font-bold uppercase mb-4">
            Legenda & Filter
          </p>

          {Object.entries(landStyles).map(([key, val]) => (
            <button
              key={key}
              onClick={() => toggleFilter(key)}
              className={`w-full flex items-center justify-between p-2 rounded mb-2 border
                ${
                  activeFilters.includes(key)
                    ? "bg-white shadow"
                    : "bg-slate-50 opacity-40"
                }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4"
                  style={{
                    backgroundColor: val.fill,
                    border: `1px solid ${val.color}`,
                  }}
                />
                <span className="text-xs font-bold">{val.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-xl">
          <p className="text-xs uppercase">Bidang Terpilih</p>
          <p className="text-3xl font-black">{filteredCount}</p>
        </div>
      </div>

      {/* MAP */}
      <div className="flex-1 rounded-xl overflow-hidden bg-white">
        <MapContainer
          center={[0.4464, 101.3694]}
          zoom={16}
          zoomControl={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />

          {filteredGeoJSON && (
            <GeoJSON
              data={filteredGeoJSON}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

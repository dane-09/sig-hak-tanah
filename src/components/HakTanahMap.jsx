import React, { useEffect, useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ZoomControl,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import { FiFilter, FiLayers, FiCheckCircle } from "react-icons/fi";

const landStyles = {
  "Hak Guna Bangunan": { color: "#1e40af", fill: "#3b82f6", label: "HGB" },
  "Hak Guna Usaha": { color: "#064e3b", fill: "#10b981", label: "HGU" },
  "Hak Pakai": { color: "#92400e", fill: "#f59e0b", label: "HP" },
  "Hak Pengelolaan": { color: "#dc2626", fill: "#ef4444", label: "HPL" },
  "Hak Wakaf": { color: "#5b21b6", fill: "#8b5cf6", label: "Wakaf" },
};

/* ===== AUTO FIT BOUNDS ===== */
function FitBounds({ data }) {
  const map = useMap();

  useEffect(() => {
    if (data && data.features.length > 0) {
      const bounds = L.geoJSON(data).getBounds();
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [data, map]);

  return null;
}

export default function MapHakTanah() {
  const [geoData, setGeoData] = useState(null);
  const [activeFilters, setActiveFilters] = useState(Object.keys(landStyles));
  const [selectedKecamatan, setSelectedKecamatan] = useState([]);

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    fetch("http://localhost:3001/hak-tanah/all")
      .then((res) => res.json())
      .then(setGeoData)
      .catch(console.error);
  }, []);

  /* ===== LIST KECAMATAN ===== */
  const listKecamatan = useMemo(() => {
    if (!geoData?.features) return [];
    return [...new Set(geoData.features.map(f => f.properties.Kecamatan))]
      .filter(Boolean)
      .sort();
  }, [geoData]);

  /* ===== FILTER DATA ===== */
  const filteredFeatures = useMemo(() => {
    if (!geoData?.features) return [];
    return geoData.features.filter((f) => {
      const matchHak = activeFilters.includes(f.properties.TIPEHAK);
      const matchKec =
        selectedKecamatan.length === 0 ||
        selectedKecamatan.includes(f.properties.Kecamatan);
      return matchHak && matchKec;
    });
  }, [geoData, activeFilters, selectedKecamatan]);

  /* ===== STYLE FEATURE ===== */
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

  /* ===== POPUP ===== */
  const onEachFeature = (feature, layer) => {
    const { TIPEHAK, Kecamatan } = feature.properties;
    const area = Math.round(turf.area(feature));

    layer.bindPopup(`
      <div style="font-family:sans-serif; min-width:160px">
        <b style="color:#1e293b">${TIPEHAK}</b>
        <hr style="margin:6px 0"/>
        <small>Kecamatan: ${Kecamatan}</small><br/>
        <small>Luas: ${area.toLocaleString("id-ID")} m²</small>
      </div>
    `);
  };

  const toggleKecamatan = (kec) => {
    setSelectedKecamatan(prev =>
      prev.includes(kec)
        ? prev.filter(k => k !== kec)
        : [...prev, kec]
    );
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-slate-50 p-4 gap-4 overflow-hidden font-sans">

      {/* ===== SIDEBAR ===== */}
      <div className="w-full md:w-80 flex flex-col gap-4 overflow-y-auto pr-1">

        {/* Filter Jenis Hak */}
        <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-200">
          <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
            <FiLayers className="text-indigo-600" /> Jenis Hak
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(landStyles).map(([key, val]) => (
              <button
                key={key}
                onClick={() =>
                  setActiveFilters(prev =>
                    prev.includes(key)
                      ? prev.filter(t => t !== key)
                      : [...prev, key]
                  )
                }
                className={`text-[10px] px-3 py-2 rounded-full font-bold border transition-all ${
                  activeFilters.includes(key)
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-white text-slate-400 border-slate-200"
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Kecamatan */}
        <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
          <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
            <FiFilter className="text-indigo-600" /> Filter Kecamatan
          </h3>
          <div className="space-y-1 overflow-y-auto">
            {listKecamatan.map(kec => (
              <button
                key={kec}
                onClick={() => toggleKecamatan(kec)}
                className={`w-full text-left p-3 rounded-xl text-xs font-bold flex justify-between items-center ${
                  selectedKecamatan.includes(kec)
                    ? "bg-indigo-50 text-indigo-700"
                    : "hover:bg-slate-50 text-slate-500"
                }`}
              >
                {kec}
                {selectedKecamatan.includes(kec) && <FiCheckCircle />}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-slate-900 text-white p-6 rounded-[2rem]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Total Terpilih
          </p>
          <p className="text-4xl font-black mt-1 text-indigo-400">
            {filteredFeatures.length}
          </p>
        </div>
      </div>

      {/* ===== MAP AREA ===== */}
      <div className="flex-1 rounded-[2.5rem] overflow-hidden bg-slate-200 shadow-xl border border-slate-200 relative">

        <MapContainer
          center={[0.4464, 101.3694]}
          zoom={15}
          zoomControl={false}
          className="w-full h-full z-0 saturate-110"
        >
          <LayersControl position="topright">

            <LayersControl.BaseLayer checked name="Street View">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap"
              />
            </LayersControl.BaseLayer>

          </LayersControl>

          <ZoomControl position="bottomright" />

          {geoData && (
            <>
              <FitBounds data={{ type: "FeatureCollection", features: filteredFeatures }} />
              <GeoJSON
                key={`${activeFilters.join()}-${selectedKecamatan.join()}`}
                data={{ type: "FeatureCollection", features: filteredFeatures }}
                style={styleFeature}
                onEachFeature={onEachFeature}
              />
            </>
          )}
        </MapContainer>

        {/* 🌿 GREEN ZONE SHADING (ALA GOOGLE MAPS) */}
        <div className="pointer-events-none absolute inset-0 z-[4]">
          <div
            className="
              absolute -top-1/3 -left-1/3 w-[160%] h-[160%]
              bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.35),_transparent_65%)]
              animate-pulse
            "
          />
          <div
            className="
              absolute top-1/3 left-1/4 w-[140%] h-[140%]
              bg-[radial-gradient(ellipse_at_center,_rgba(22,163,74,0.25),_transparent_70%)]
              animate-pulse
            "
          />
        </div>

        {/* Floating Title */}
        <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
          <p className="text-[10px] font-black text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
            SISTEM INFORMASI GEOGRAFIS PEKANBARU
          </p>
        </div>

      </div>
    </div>
  );
}

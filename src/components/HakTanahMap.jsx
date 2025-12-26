import React from "react";
import { 
  MapContainer, 
  TileLayer, 
  GeoJSON, 
  LayersControl, 
  ZoomControl 
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Import data GeoJSON Anda
import geoData from "../data/hak_tanah_fix.json";

const { Overlay } = LayersControl;

/* ==========================================
   KONFIGURASI WARNA MODERN (TAILWIND COLORS)
   ========================================== */
const landStyles = {
  "Hak Guna Bangunan": { color: "#2563eb", fill: "#3b82f6", label: "HGB" },     // Blue
  "Hak Guna Usaha":     { color: "#059669", fill: "#10b981", label: "HGU" },     // Emerald
  "Hak Pakai":          { color: "#d97706", fill: "#f59e0b", label: "HP" },      // Amber
  "Hak Pengelolaan":    { color: "#dc2626", fill: "#ef4444", label: "HPL" },     // Red
  "Hak Wakaf":          { color: "#7c3aed", fill: "#8b5cf6", label: "HW" },      // Violet
  "default":            { color: "#4b5563", fill: "#9ca3af", label: "Lainnya" }
};

export default function MapHakTanah() {
  
  // Fungsi styling untuk poligon GeoJSON
  const styleFeature = (feature) => {
    const tipe = feature.properties.TIPEHAK;
    const s = landStyles[tipe] || landStyles.default;
    return {
      color: s.color,
      fillColor: s.fill,
      weight: 1.5,
      fillOpacity: 0.5,
    };
  };

  // Interaksi saat fitur diklik atau di-hover
  const onEachFeature = (feature, layer) => {
    const { FID, TIPEHAK } = feature.properties;
    
    // Popup Bergaya Modern (Menggunakan string HTML karena Leaflet native)
    layer.bindPopup(`
      <div style="font-family: 'Inter', sans-serif; min-width: 150px;">
        <div style="border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">
          <span style="font-size: 10px; font-weight: 800; color: #64748b; uppercase; tracking-wider;">Informasi Persil</span>
        </div>
        <div style="margin-bottom: 4px;">
          <span style="font-size: 11px; color: #94a3b8;">ID Bidang:</span>
          <span style="font-size: 12px; font-weight: 700; color: #1e293b; margin-left: 4px;">#${FID}</span>
        </div>
        <div>
          <span style="font-size: 11px; color: #94a3b8;">Jenis Hak:</span>
          <span style="font-size: 12px; font-weight: 700; color: #2563eb; margin-left: 4px;">${TIPEHAK}</span>
        </div>
      </div>
    `);

    // Efek visual saat kursor masuk/keluar
    layer.on({
      mouseover: (e) => {
        const l = e.target;
        l.setStyle({ fillOpacity: 0.8, weight: 3 });
        l.bringToFront();
      },
      mouseout: (e) => {
        const l = e.target;
        l.setStyle({ fillOpacity: 0.5, weight: 1.5 });
      }
    });
  };

  return (
    <div className="w-full h-[600px] relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
      
      <MapContainer 
        center={[0.4464, 101.3694]} 
        zoom={17} 
        zoomControl={false} 
        className="w-full h-full z-0"
      >
        {/* Menggunakan TileLayer Positron agar peta dasar tidak terlalu ramai */}
        <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
        <ZoomControl position="bottomright" />

        <LayersControl position="topright">
          {Object.keys(landStyles).map((tipe) => (
            tipe !== "default" && (
              <Overlay key={tipe} checked name={tipe}>
                <GeoJSON
                  data={geoData}
                  filter={(f) => f.properties.TIPEHAK === tipe}
                  style={styleFeature}
                  onEachFeature={onEachFeature}
                />
              </Overlay>
            )
          ))}
        </LayersControl>
      </MapContainer>

      {/* ==========================================
          FLOATING LEGEND (GLASSMORPHISM)
          ========================================== */}
      <div className="absolute top-6 left-6 z-[1000] pointer-events-none">
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[1.5rem] shadow-2xl border border-white pointer-events-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-800">
              Legenda Hak Tanah
            </h3>
          </div>
          
          <div className="grid gap-3">
            {Object.entries(landStyles).map(([name, config]) => (
              name !== "default" && (
                <div key={name} className="flex items-center gap-3 group">
                  <div 
                    className="w-4 h-4 rounded-full shadow-inner transition-transform group-hover:scale-125" 
                    style={{ backgroundColor: config.fill, border: `1.5px solid ${config.color}` }}
                  ></div>
                  <span className="text-[11px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
                    {name}
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
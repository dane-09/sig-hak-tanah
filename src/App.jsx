import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

import MainLayout from "./layouts/MainLayout";
import GuestLayout from "./layouts/GuestLayout";
import Loading from "./components/Loading";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import MapView from "./components/HakTanahMap";
import UserGuide from "./components/UserGuide";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ListData from "./components/auth/listdata";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/auth/login";
import InfoHakTanah from "./components/InfoHakTanah";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* MAIN LAYOUT */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/panduan-pengguna" element={<UserGuide />} />
          <Route path="/kebijakan-privasi" element={<PrivacyPolicy />} />
          <Route path="/infomarsi-hak-tanah" element={<InfoHakTanah />} /> 
        </Route>

        {/* GUEST LAYOUT (contoh: login nanti) */}
        <Route element={<GuestLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/list" element={<ListData />} />
        </Route>

 <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;

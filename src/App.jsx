import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Loading from "./components/Loading.jsx";
import React, { Suspense } from "react";
import MapView from "./components/HakTanahMap.jsx";
import UserGuide from "./components/UserGuide.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";

const Dashboard = React.lazy(() => import("./pages/Home.jsx"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Map" element={<MapView />} />
           <Route path="/Panduan-Pengguna" element={<UserGuide />} />
            <Route path="/kebijakan-Privasi" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

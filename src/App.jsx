import React from "react";
import "./App.css";
import Building from "./components/Building";
import SingleApartmentPage from "./page/SingleApartmentPage";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SvgExtractor from "./page/svg/SvgExtractor";
import { AuthProvider } from "./components/auth/AuthProvider";

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HashRouter>
        <MainLayout />
      </HashRouter>
    </React.Suspense>
  );
}

function MainLayout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/single" && <Navbar />}
      <Routes>
        <Route path=":id" element={<Building />} />
        <Route path="/apartment/:id" element={<SingleApartmentPage />} />
        {/* <Route path="/svg-extrator" element={<SvgExtractor />} /> */}
        <Route
            path="/admin/*"
            element={
              <AuthProvider>
                {/* <AdminPage /> */}
              </AuthProvider>
            }
          />
      </Routes>
    </>
  );
}

export default App;

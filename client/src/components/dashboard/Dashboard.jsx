import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "./Dashboard.module.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "./sideBar/SideBar";
import Gallery from "./gallery/Gallery";
import Configuration from "./configuration/Configuration";
import ProductManagement from "./productManagement/ProductManagement";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("Usuario no está autenticado, redirigiendo a /");
      navigate("/login-admin");
    }
  }, [user, navigate]); // Agrega user y navigate como dependencias del efecto

  return (
    <div className={s.dashboard}>
      <div className={s.sideBar}>
        <SideBar />
      </div>
      <div className={s.content}>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/productos" element={<ProductManagement />} />
          {/* <Route path="/users" element={<Gallery />} /> */}
          {/* <Route path="/categories" element={<Gallery />} /> */}
          <Route path="/configuracion" element={<Configuration />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/otros" element={<Gallery />} />
        </Routes>
      </div>
    </div>
  );
}


export default Dashboard;
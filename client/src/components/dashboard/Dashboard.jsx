import React from "react";
import s from "./Dashboard.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./sideBar/SideBar";
import Gallery from "./gallery/Gallery";

function Dashboard() {
  return (
    <div className={s.dashboard}>
      <div className={s.sideBar}>
        <SideBar />
      </div>
      <div className={s.content}>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/products" element={<Gallery />} />
          <Route path="/users" element={<Gallery />} />
          <Route path="/categories" element={<Gallery />} />
          <Route path="/variations" element={<Gallery />} />
          <Route path="/promociones" element={<Gallery />} />
          <Route path="/otros" element={<Gallery />} />
        </Routes>
      </div>
    </div>
  );
}


export default Dashboard;
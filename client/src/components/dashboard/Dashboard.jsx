import React from "react";
import s from "./Dashboard.module.css";
import SideBar from "./sideBar/SideBar";
import Gallery from "./gallery/Gallery";

function Dashboard() {
  return (
    <div className={s.dashboard}>
      <div className={s.sideBar}>
        <SideBar />
      </div>
      <div className={s.content}>
        <Gallery />
      </div>
    </div>
  );
}


export default Dashboard;
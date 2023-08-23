import React from "react";
import s from "./Configuration.module.css";
import Categories from "./categories/Categories";

function Configuration() {
  return (
    <div className={s.configuration}>
      <h2>Configuración</h2>
      <div className={s.content}>
          <Categories />
      </div>
    </div>
  );
}


export default Configuration;
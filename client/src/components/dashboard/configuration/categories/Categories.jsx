import React from "react";
import s from "./Categories.module.css";

function Categories() {
  return (
    <div className={s.categories}>
      <h2>Categorías</h2>
      <div>
        <div>
          <h3>Categorías</h3>
          <p>Crear, editar y eliminar categorías</p>
        </div>
      </div>
    </div>
  );
}


export default Categories;
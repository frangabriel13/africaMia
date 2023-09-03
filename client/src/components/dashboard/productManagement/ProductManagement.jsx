import React from "react";
import s from "./ProductManagement.module.css";

function ProductManagement() {
  return (
    <div className={s.productManagement}>
      <h2>Administración de productos</h2>
      <div className={s.content}>
          <h3>Productos</h3>
          <h3>Categorías</h3>
          <h3>Variaciones</h3>
      </div>
    </div>
  );
}


export default ProductManagement;
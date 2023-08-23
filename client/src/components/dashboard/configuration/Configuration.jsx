import React from "react";
import s from "./Configuration.module.css";
import Categories from "./categories/Categories";

function Configuration() {
  return (
    <div className={s.configuration}>
      <h2>Configuración</h2>
      <div className={s.divContainer}>
        <div className={s.content}>
          <Categories />
        </div>
        <div className={s.divForm}>
          <h3>Formulario</h3>
          <form>
            <label>
              Nombre:
              <input type="text" name="name" />
            </label>
            <label>
              Contraseña:
              <input type="password" name="password" />
            </label>
            <label>
              Foto de perfil:
              <input type="file" name="profilePicture" />
            </label>
            <input type="submit" value="Enviar" />
          </form>
        </div>
      </div>
    </div>
  );
}


export default Configuration;
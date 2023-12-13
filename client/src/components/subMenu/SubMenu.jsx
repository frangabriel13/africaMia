// SubMenuCategorias.js
import React from 'react';
import { Link } from 'react-router-dom';
import s from './SubMenu.module.css'; // Ajusta la ruta correcta para tus estilos

const SubMenu = () => {
  // Define tus categorías aquí o recupéralas desde el estado/props
  const categorias = ['Mujeres', 'Hombres', 'Niños', 'Niñas', 'Bebés'];

  console.log('Categorías:', categorias); // Agrega este console.log para verificar que las categorías se muestren correctamente

  return (
    <ul className={s.subMenu}>
      {categorias.map((categoria, index) => (
        <li key={index}>
          <Link to={`/categoria/${categoria}`} className={s.subMenuLink}>
            bueno{categoria}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;


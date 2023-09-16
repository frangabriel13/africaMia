import React from 'react';
import s from './SideBar.module.css';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <div className={s.sideBar}>
      <Link to="/dashboard" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-bar-chart-line"></i>
          <span>General</span>
        </div>
      </Link>
      <Link to="/dashboard/productos" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-box"></i>
          <span>Productos</span>
        </div>
      </Link>
      {/* <Link to="/dashboard/users" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-people"></i>
          <span>Usuarios</span>
        </div>
      </Link> */}
      <Link to="/dashboard/configuracion" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-gear"></i>
          <span>Configuración</span>
        </div>
      </Link>
      {/* <Link to="/dashboard/promociones" className={s.link}>
        <div className={s.item}>
        <i className="bi bi-cash-coin"></i>
        <span>Promociones</span>
        </div>
      </Link> */}
      <Link to="/dashboard/galeria" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-camera"></i>
          <span>Galería</span>
        </div>
      </Link>
      <Link to="/dashboard/otros" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-pencil"></i>
          <span>Personalizar</span>
        </div>
      </Link>
    </div>
  )
}


export default SideBar;
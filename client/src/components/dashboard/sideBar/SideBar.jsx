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
      <Link to="/dashboard/products" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-box"></i>
          <span>Productos</span>
        </div>
      </Link>
      <Link to="/dashboard/users" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-people"></i>
          <span>Usuarios</span>
        </div>
      </Link>
      <Link to="/dashboard/categories" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-diagram-3"></i>
          <span>Categorias</span>
        </div>
      </Link>
      <Link to="/dashboard/variations" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-palette"></i>
          <span>Variaciones</span>
        </div>
      </Link>
      <Link to="/dashboard/promociones" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-cash-coin"></i>
          <span>Promociones</span>
        </div>
      </Link>
      <Link to="/dashboard/otros" className={s.link}>
        <div className={s.item}>
          <i className="bi bi-gear"></i>
          <span>Otros</span>
        </div>
      </Link>
    </div>
  )
}


export default SideBar;
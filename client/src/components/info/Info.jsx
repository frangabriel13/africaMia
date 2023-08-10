import React from 'react';
import s from './Info.module.css';

const Info = () => {
  return (
    <div>
    <div className={s.container}>
      <div className={s.iconContainer}>
        <i className={`bi bi-truck ${s.icon}`}></i>
        <span className={s.text}>Envíos a todo el país</span>
      </div>
      <div className={s.separator}></div>
      <div className={s.iconContainer}>
        <i className={`bi bi-credit-card ${s.icon}`}></i>
        <span className={s.text}>Varios métodos de pago</span>
      </div>
      <div className={s.separator}></div>
      <div className={s.iconContainer}>
        <i className={`bi bi-geo-alt ${s.icon}`}></i>
        <span className={s.text}>Bogotá 3500, CABA, Zona Flores</span>
      </div>
    </div>
    <div className={s.instagramer} >
    <i className={`bi bi-instagram ${s.icon}`}> Seguinos en Redes Sociales</i>
        <h1 className={s.tittle}>@africamia_jeansoficial</h1>
      
    </div>
    </div>
  );
};

export default Info;
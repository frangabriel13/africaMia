// MaintenanceNotice.js
import React from 'react';
import s from './HomeService.module.css'; // Importar el archivo CSS module
import logo from '../../assets/logoAlargadoAfricaMia.png';  

function MaintenanceNotice() {
  return (
    <div className={s.noticeContainer}>
      <img className={s.logo} src={logo} alt="Logo Africa Mia" />
      <h2 className={s.noticeTitle}>¡Atención!</h2>
      <p className={s.noticeMessage}>La página se encuentra fuera de servicio debido a reformas. Estaremos de vuelta pronto.</p>
    </div>
  );
}

export default MaintenanceNotice;
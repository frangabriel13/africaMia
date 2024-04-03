// MaintenanceNotice.js
import React from 'react';
import s from './HomeService.module.css'; // Importar el archivo CSS module

function MaintenanceNotice() {
  return (
    <div className={s.noticeContainer}>
      <h2 className={s.noticeTitle}>¡Atención!</h2>
      <p className={s.noticeMessage}>La página se encuentra fuera de servicio debido a reformas. Estaremos de vuelta pronto.</p>
    </div>
  );
}

export default MaintenanceNotice;
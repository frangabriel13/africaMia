import React from 'react';
import s from './Contact.module.css'; // Importa tu archivo CSS

function Contacto() {
  return (
    <div className={s.contactoContainer}> {/* Agrega una clase para el contenedor principal */}
      <div className={s.contactoInfo}>
        <h2 className={s.contactoTitle}>SUCURSAL</h2>
        <p className={s.contactoText}>Bogotá 3412, Flores, CABA</p>
        <p className={s.contactoText}>Cel: 11 4042 8668</p>
        <p className={s.contactoText}>Cel: 11 2831 1122</p>
        <p className={s.contactoText}>Cel: 11 4947 2679</p>
        <a className={s.contactoLink} href="mailto:tienda@africamia-jeans.online">tienda@africamia-jeans.online</a>
      </div>

      <div className={s.contactoHorarios}>
        <h2 className={s.contactoTitle}>HORARIOS</h2>
        <ul className={s.contactoList}>
          <li>Lunes: 07:00-17:00</li>
          <li>Martes: 07:00-17:00</li>
          <li>Miércoles: 07:00-17:00</li>
          <li>Jueves: 07:00-17:00</li>
          <li>Viernes: 07:00-17:00</li>
          <li>Sábado: 07:00-15:00</li>
        </ul>
      </div>

      <div className={s.contactoMapa}>
        {/* Aquí puedes insertar tu mapa de Google */}
        {/* Por ejemplo: */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d976.0451250120228!2d-58.47776773033501!3d-34.62915253149497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc993ccc24f5f%3A0x36d8ea258a5631d4!2sBogot%C3%A1%203412%2C%20C1407ESD%20CABA!5e0!3m2!1ses-419!2sar!4v1695495155689!5m2!1ses-419!2sar"
          title="Mapa"
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: 'none' }} // Utiliza un objeto para definir el estilo
          allowFullScreen={true} // Ajusta allowFullScreen a allowFullScreen
          referrerPolicy="no-referrer-when-downgrade" // Ajusta referrerpolicy a referrerPolicy
        ></iframe>
      </div>

      <div className={s.contactoNavegacion}>
        <h2 className={s.contactoTitle}>NAVEGACIÓN</h2>
        <ul className={s.contactoList}>
          <li>INICIO</li>
          <li>TIENDA</li>
          <li>CATEGORÍAS</li>
          <li>CARRITO</li>
          <li>CONTACTO</li>
        </ul>
      </div>

      <div className={s.socialMedia}>
        <a href="https://www.facebook.com/profile.php?id=100069903794697&locale=es_LA" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-facebook ${s.icon}`}></i>
        </a>
        <a href="https://www.instagram.com/africamia_jeansoficial/" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-instagram ${s.icon}`}></i>
        </a>
        <a href="https://www.tiktok.com/@africa_miajeans?lang=es" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-tiktok ${s.icon}`}></i>
        </a>
      </div>
    </div>
    
  );
}

export default Contacto;

import React from "react";
import s from "./Footer.module.css"; // Importamos el archivo de estilos personalizado

function Footer() {
  return (
    <footer className={s.footerContainer}>
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
      <div className={s.links}>
        <a href="#">Términos y condiciones</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Acerca de nosotros</a>
        <a href="#">FAQ</a>
      </div>
      <div className={s.copyRight}>
        &copy; {new Date().getFullYear()} Africa Mia Jeans. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;

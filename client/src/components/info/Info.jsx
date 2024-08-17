import React from 'react';
import s from './Info.module.css';
import imagen from "../../assets/temporaInvienoAfricaMia.png";
import { BsTruck } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

const Info = () => {
  return (
    <div>
    <div className={s.container}>
      <div className={s.iconContainer}>
        <BsTruck className={s.icon} />
        <span className={s.text}>Envíos a todo el país</span>
      </div>
      <div className={s.separator}></div>
      <div className={s.iconContainer}>
        <BsCreditCard className={s.icon} />
        <span className={s.text}>Varios métodos de pago</span>
      </div>
      <div className={s.separator}></div>
      <div className={s.iconContainer}>
        <BsGeoAlt className={s.icon} />
        <span className={s.text}>Bogotá 3412, CABA, Zona Flores</span>
      </div>
    </div>
    <div>
      <img className={s.imgBan} src={imagen} alt="Descripción de la imagen" style={{ width: '100%', height: 'auto' }} />
    </div>
    <div className={s.instagramer} >
      <div className={s.divIg}>
        <BsInstagram className={s.iconIg} />
        <span className={s.text}>Seguinos en Instagram y TikTok</span>
      </div>
    <h1 className={s.tittle}>
          <a
              className={`${s.buttonIg} ${s.tittle}`}
              href="https://www.instagram.com/africamia_jeansoficial/"
              target="_blank"
              rel="noopener noreferrer"
              >
                IG @africamia_jeansoficial
          </a>
          <a
              className={`${s.buttonIg} ${s.tittle}`}
              href="https://www.tiktok.com/@africa_miajeans?lang=es"
              
              >
                TikTok @africa_miajeans
          </a>

     </h1>  
    
      
    </div>
    </div>
  );
};

export default Info;
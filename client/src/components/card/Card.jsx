import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css";

const Card = ({ name, price, id, images, imgMain, productId }) => {
  const [currentImage, setCurrentImage] = useState(imgMain);

  const handleCardClick = () => {
    const product = { name, price, id, images };
    handleScrollToTop();
  };

  const handleScrollToTop = () => {
    console.log('Productito seleccionado');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleMouseEnter = () => {
    if(images && images.length > 0) {
      const newImage = images.find(images => images.url !== imgMain);
      if(newImage) {
        setCurrentImage(newImage.url);
      }
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(imgMain);
  };

  return (
    <Link to={`/products/${productId}`}>
      <div onClick={handleCardClick} className={s.container}>
        <div className={s.divImage} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
          <img className={`${s.image}`} src={currentImage} alt={name} />
        </div>
        <div className={s.divContent}>
          <h3>{name}</h3>
          <p>${price}</p>
        </div>
      </div>
    </Link>
  );
};


export default Card;
import React from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css";

const Card = ({ name, price, id, images, onSelectProduct, productId }) => {
  const handleCardClick = () => {
    const product = { name, price, id, images };
    onSelectProduct(product);
  };

  return (
    <div onClick={handleCardClick} className={s.container}>
      <div className={s.divImage}>
        <img src={images} alt={name} />
      </div>
      <div className={s.divContent}>
        <h3>{name}</h3>
        <p>${price}</p>
      </div>
    </div>
  );
};


export default Card;

// import React from 'react';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// import s from './Card.module.css'; // Asegúrate de tener el archivo CSS correspondiente

// const Card = ({ name, price, id, images, onSelectProduct, productId }) => {
//   const handleCardClick = () => {
//     const product = { name, price, id, images }; // Crear un objeto que representa el producto seleccionado
//     onSelectProduct(product); // Llamar a la función onSelectProduct y pasar el producto seleccionado
//   };

//   const handleScrollToTop = () => {
//     console.log('Productito seleccionado');
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth', // Desplazamiento suave
//     });
//   };

//   return (
//     <div className={s.card}>
//      <div className={s.img}>
//       <img src={images} alt={name}  />
//          <div className={s.overlay}>
//          <Link to={`/products/${productId}`}>Ver detalles</Link>

//          </div>
//       <div onClick={handleCardClick} className={s.content}>
//         <h3 className={s.name}>{name}</h3>
//         <p className={s.price}>$ {price}</p>
//       </div>
//     </div>
//          <Link to={`/products/${id}`} className= {s.detail }>
//             <span onClick={handleScrollToTop}>Ver más</span>
//          </Link>
     
//     </div>
//   );
// };

// export default Card;
import Card from '../card/Card'
import style from './Cards.module.css';
import React, { useState } from 'react';
import img1 from "../../assets/imgPrueba.png";
// import img2 from "../../assets/DSC_0077.JPG";
// import img3 from "../../assets/DSC_0078.JPG";
// import img4 from "../../assets/DSC_0079.JPG";

export default function Cards() {
 const products = [
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },
    {
      name: 'Producto 1',
      price: 100,
      id: 1,
      image: `${img1}`,
    },


  ];
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className={style.container}>
      {products &&
        products.map((c) => (
          <Card
            name={c.name}
            price={c.price}
            id={c.id}
            images={c.image}
            key={c.id}
            productId={c.id}
            onSelectProduct={handleProductSelect} // Pasar la función handleProductSelect como prop
          />
        ))} 
        
    </div>
  );
}
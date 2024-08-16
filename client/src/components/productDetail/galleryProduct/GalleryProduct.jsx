import React, { useState } from "react";
import s from "./GalleryProduct.module.css";

const GalleryProduct = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0].url);

  const handleClick = (url) => {
    setSelectedImage(url);
  };
  
  return (
    <div className={s.container}>
      <div className={s.imageList}>
        {
          images.map((image, index) => (
            <img
              key={image.id}
              src={image.url}
              alt={`Thumbnail ${index}`}
              onClick={() => handleClick(image.url)}
            />
          ))
        }
      </div>
      <div className={s.images}>
        {
          images.map((image, index) => (
            <img
              key={image.id}
              src={image.url}
              alt={`Image ${index}`}
              className={s.image}
            />
          ))
        }
      </div>
    </div>
  )
};


export default GalleryProduct;
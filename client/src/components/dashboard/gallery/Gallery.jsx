import React, { useEffect, useState } from 'react';
import s from './Gallery.module.css';
import { getImages } from '../../../redux/actions/imageActions';
import { useDispatch, useSelector } from 'react-redux';

function Gallery() {
  const dispatch = useDispatch(); 
  const images = useSelector(state => state.gallery.images);
  const allImages = useSelector(state => state.gallery.allImages);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  return (
    <div className={s.gallery}>
      <h2>Galería de imágenes</h2>
      <button>Agregar</button>
      <div className={s.images}>
        {
          images && images.map((image, i) => (
            <div key={i} className={s.image}>
              <img src={image.url} alt={image.name} />
            </div>
          ))
        }
      </div>
    </div>
  );
}


export default Gallery;
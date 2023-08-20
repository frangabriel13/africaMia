import React, { useEffect, useState } from 'react';
import s from './Gallery.module.css';
import { getImages, deleteImage } from '../../../redux/actions/imageActions';
import { useDispatch, useSelector } from 'react-redux';
import ImageForm from './imageForm/ImageForm';

function Gallery() {
  const dispatch = useDispatch(); 
  const images = useSelector(state => state.gallery.images);
  const allImages = useSelector(state => state.gallery.allImages);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteImage(id));
  };

  return (
    <div className={s.gallery}>
      <h2 className={s.title}>Galería de imágenes</h2>
      <button className={s.btn} onClick={() => setShowForm(true)} >Agregar</button>
      {
        showForm && <ImageForm setShowForm={setShowForm} />
      }
      <div className={s.images}>
        {
          images && images.map((image, i) => (
            <div key={i} className={s.image}>
              <img src={image.url} alt={image.name} />
              <i className="bi bi-three-dots-vertical" 
                onClick={() => handleDelete(image.id)}
              ></i>
              <i className="bi bi-check-lg"></i>
            </div>
          ))
        }
      </div>
    </div>
  );
}


export default Gallery;
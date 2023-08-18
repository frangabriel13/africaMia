import React, { useState } from 'react';
import s from './ImageForm.module.css';
import { createImage } from '../../../../redux/actions/imageActions';

function ImageForm({ setShowForm }) {
  const [selectedImages, setSelectedImages] = useState([]);
  
  const handleImages = (e) => {
    const files = e.target.files;
    let images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(files[i]);
    }
    setSelectedImages(images);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append('images', selectedImages[i]);
    }
    createImage(formData);
    setShowForm(false);
  };

  return (
    <div className={s.container}>
      <h3 className={s.title}>Agregar imagen</h3>
      <form className={s.form} onSubmit={handleSubmit} >
        <input 
          className={s.input} 
          type="file" 
          multiple 
          accept='image/*'
          onChange={handleImages}
        />
        <button type='button' className={s.btn} onClick={() => setShowForm(false)} >Cancelar</button>
        <button type='submit' className={s.btn}>Subir</button>
      </form>
    </div>
  );
}


export default ImageForm;
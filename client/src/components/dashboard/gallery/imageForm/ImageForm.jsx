// import React, { useState } from 'react';
// import s from './ImageForm.module.css';
// import { useDispatch } from 'react-redux';
// import { createImage, getImages } from '../../../../redux/actions/imageActions';

// function ImageForm({ setShowForm }) {
//   const [selectedImages, setSelectedImages] = useState([]);

//   const dispatch = useDispatch(); 
  
//   const handleImages = (e) => {
//     const files = e.target.files;
//     let images = [];
//     for (let i = 0; i < files.length; i++) {
//       images.push(files[i]);
//     }
//     setSelectedImages(images);
//   };

//   const handleSubmitImg = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     for (let i = 0; i < selectedImages.length; i++) {
//       formData.append('images', selectedImages[i]);
//     }

//     dispatch(createImage(formData))
//       .then(() => {
//         dispatch(getImages()); // Obtiene las imágenes actualizadas
//         setShowForm(false);
//       });
//   };

//   return (
//     <div className={s.container}>
//       <h3 className={s.title}>Agregar imagen</h3>
//       <form className={s.form} onSubmit={(e) => { e.preventDefault(); handleSubmitImg(e); }} >
//         <input 
//           className={s.input} 
//           type="file" 
//           multiple 
//           accept='image/*'
//           onChange={handleImages}
//         />
//         <button type='button' className={s.btn} onClick={() => setShowForm(false)} >Cancelar</button>
//         <button type='button' className={s.btn} onClick={handleSubmitImg}>Subir</button>
//       </form>
//     </div>
//   );
// }


// export default ImageForm;

import React, { useState } from 'react';
import s from './ImageForm.module.css';
import { useDispatch } from 'react-redux';
import { createImage, getImages } from '../../../../redux/actions/imageActions';
import { resizeImage } from '../../../../utils/helpers'; // Importa la función resizeImage

function ImageForm({ setShowForm }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const dispatch = useDispatch(); 
  
  const handleImages = async (e) => { // Cambia a async para poder usar await
    const files = e.target.files;
    let images = [];
    for (let i = 0; i < files.length; i++) {
      // Llama a la función resizeImage para cada imagen seleccionada
      const resizedImage = await resizeImage(files[i]);
      images.push(resizedImage);
    }
    setSelectedImages(images);
  };

  const handleSubmitImg = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append('images', selectedImages[i]);
    }

    dispatch(createImage(formData))
      .then(() => {
        dispatch(getImages()); // Obtiene las imágenes actualizadas
        setShowForm(false);
      });
  };

  return (
    <div className={s.container}>
      <h3 className={s.title}>Agregar imagen</h3>
      <form className={s.form} onSubmit={(e) => { e.preventDefault(); handleSubmitImg(e); }} >
        <input 
          className={s.input} 
          type="file" 
          multiple 
          accept='image/*'
          onChange={handleImages}
        />
        <button type='button' className={s.btn} onClick={() => setShowForm(false)} >Cancelar</button>
        <button type='button' className={s.btn} onClick={handleSubmitImg}>Subir</button>
      </form>
    </div>
  );
}

export default ImageForm;

import React, { useEffect, useState } from "react";
import s from "./Images.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createImage } from "../../../redux/actions/imageActions";
import ImageForm from "../gallery/imageForm/ImageForm";
import { getImages } from "../../../redux/actions/imageActions";

function Images({ images, setOpenGallery, setImagesData, setFormData, formData }) {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleSelect = (id) => {
    const image = images.find((el) => el.id === id);
    const isSelected = selectedImages.some((el) => el.id === id);
  
    if (isSelected) {
      const updatedImages = selectedImages.filter((el) => el.id !== id);
      setSelectedImages(updatedImages);
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleSetImages = () => {
    setImagesData(selectedImages);
    setOpenGallery(false);
    setFormData((prev) => ({ ...prev, images: selectedImages }));
  };

  // const handleImagesAdded = (selectedImages) => {
  //   setSelectedImages(selectedImages); // Actualiza el estado de las imágenes en Images.js
  // };

  return(
    <div>
      <h2>Galería</h2>
      <div className={s.divImages}>
        {
          images.map((el) => (
            <div className={s.images} key={el.id}>
              <img src={el.url} alt={el.name} />
              <button type="button" onClick={() => handleSelect(el.id)}>Seleccionar</button>
            </div>
          ))
        }
      </div>
      <div>
        <button className={s.btn} onClick={() => setShowForm(true)} >Agregar</button>
        {
          showForm && (
            <ImageForm setShowForm={setShowForm} />
          )
        }
      </div>
      <div>
        <button onClick={() => handleSetImages()}>Agregar</button>
        <button onClick={() => setOpenGallery(false)}>Cancelar</button>
      </div>
    </div>
  )
}


export default Images;
import React from 'react';
import s from './ImageForm.module.css';
import { createImage } from '../../../../redux/actions/imageActions';

function ImageForm() {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Agregar imagen</h3>
      <form className={s.form}>
        <input className={s.input} type="file" multiple accept='image/*' />
        <button className={s.btn}>Cancelar</button>
        <button className={s.btn}>Subir</button>
      </form>
    </div>
  );
}


export default ImageForm;
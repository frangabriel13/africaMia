import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/actions/productActions';
import s from './ProductDetail.module.css';

const ProductDetail = ({ productId }) => {
  const [loading, setLoading] = useState(true);
  const product = useSelector((state) => state.product.productById);
  console.log(product);
  // const product = useSelector((state) => state.products.productById);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const imagesRef = useRef(null);

  useEffect(() => {
    dispatch(getProductById(productId))
      .then(() => setLoading(false));
  }, [dispatch, productId]);

  if (loading) return <p>Cargando...</p>
  
  return (
    <div className={s.divUni}>
    <div className={s.divGlobal}>

      <div className={s.divLocal}>
      <h2 className={s.productoDetailName}>{product && product.name}</h2>
      </div>
      <div className={s.divPhotos}>
       <div className={s.gallery}>
          {product.images &&
            product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Image ${index + 1}`}
                className={`${s.galleryImage} ${
                  selectedImage === image.url ? s.selected : ''
                }`}
                onClick={() => setSelectedImage(image.url)}
              />
            ))}
        </div>
        <div className={s.divImage} ref={imagesRef}>
          {selectedImage ? (
            <div className={s.productoDetailImages}>
              <img
                src={selectedImage}
                alt="Selected Image"
                className={s.productoDetailImage}
              />
            </div>
          ) : (
            <div
              className={s.productoDetailImages}
              style={{ scrollSnapType: 'y mandatory', scrollPadding: '200px 0' }}
            >
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className={s.productoDetailImage}
                  onClick={() => setSelectedImage(image.url)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={s.productoDetail}>
      
        <h2 className={s.productoDetailName}>{product && product.name}</h2>
        
        <p className={s.productoDetailPrice}>${product.price}</p>
        {product.discount && (
          <p className={s.productoDetailDiscount}>
            Discount: {product.discount}%
          </p>
        )}
        {/* <p className={s.productoDetailCategory}>
          Category: {product.category}
        </p> */}
        <p className={s.productoDetailStock}>Stock: {product.stock}</p>
        {product.isVariable && (
          <p className={s.productoDetailVariations}>
            This product has variations
          </p>
        )} 
        <button className={s.buttonCart}>Agregar al Carrito</button>
        <br/>
        <button className={s.buttonWP}>Comprar por Whatsapp</button>
      </div>
      
    </div>
    <div className={s.divDescription}>
        <p className={s.productoDetailDescription}>
          Description: {product.description && product.description.text}
        </p>
    </div>
       <h2 className={s.relacionados}>
          Productos relacionados
        </h2>
  </div>
  ) 
}

export default ProductDetail;
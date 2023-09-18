import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, addToCart } from '../../redux/actions/productActions';
import s from './ProductDetail.module.css';
import { getSizeById } from '../../redux/actions/sizeActions';

const ProductDetail = ({ productId }) => {
  const [loading, setLoading] = useState(true);
  const product = useSelector((state) => state.product.productById);
  const sizes = useSelector((state) => state.size.sizeById); // Cambiado a "sizes" para evitar confusión
  console.log(sizes[0].variations);
  
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const imagesRef = useRef(null);
  const [quantity, setQuantity] = useState(1); // Inicialmente, la cantidad es 1

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10); // Asegurarse de que sea un número entero
    setQuantity(newQuantity);
  };

  useEffect(() => {
    dispatch(getProductById(productId))
      .then(() => setLoading(false));
  }, [dispatch, productId]);

  
  useEffect(() => {
    if (product && product.variations && product.variations.length > 0) {
      // Supongamos que cada variación tiene una propiedad "sizeId"
      const sizeId = product.variations[0].sizeId; // Por ejemplo, obtén el sizeId de la primera variación
      if (sizeId) {
        dispatch(getSizeById(sizeId)); // Obtén el tamaño por su id si está disponible en la variación
      }
    }
  }, [dispatch, product]);

  if (loading) return <p>Cargando...</p>

  const handleAddToCart = () => {
    dispatch(addToCart(product, quantity));
  };
 
  // Función para obtener el nombre del tamaño (talle) según el sizeId
  const getSizeNameById = (sizeId) => {
    
    if (!Array.isArray(sizes)) {
      // Si sizes no es un arreglo, devolvemos un arreglo vacío
      return [];
    }
    
    const matchingSizes = sizes.filter((size) => size.id === sizeId);
    return matchingSizes.map((size) => size.name);
  };

  
  
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
        {product.sizeId && (
         <div className={s.productVariations}>
          <h3>Variaciones del Producto</h3>
          <p>Tamaño: {getSizeNameById(product.sizeId)}</p>
          {/* Puedes mostrar otras propiedades del tamaño aquí */}
        </div>
        )}

        {/* Agregar el select para la cantidad */}
      <label htmlFor="quantity">Cantidad:</label>
      
      <input
    type="number"
    id="quantity"
    name="quantity"
    value={quantity}
    onChange={(e) => {
      const newQuantity = parseInt(e.target.value, 10);
      setQuantity(newQuantity);
    }}
  />

       
      <button className={s.buttonCart} onClick={() => handleAddToCart(product, quantity)}>Agregar al carrito</button>

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
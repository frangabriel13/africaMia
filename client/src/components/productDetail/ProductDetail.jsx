import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, addToCart } from '../../redux/actions/productActions';
import s from './ProductDetail.module.css';
import { getProductVariations } from '../../redux/actions/variationActions';

const ProductDetail = ({ productId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const product = useSelector((state) => state.product.productById);
  const variations = useSelector((state) => state.variation.variations);
  const [selectedImage, setSelectedImage] = useState(null);
  const imagesRef = useRef(null); // !??

  const [variationQuantities, setVariationQuantities] = useState({});
  console.log(variationQuantities);

  useEffect(() => {
    dispatch(getProductById(productId))
      .then(() => setLoading(false)); // !??
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getProductVariations(productId))
  }, []);

  if (loading) return <p>Cargando...</p>

  const handleDecrement = (variation) => {
    const currentQuantity = variationQuantities[variation.id] || 0;
    if (currentQuantity > 0) {
      setVariationQuantities({
        ...variationQuantities,
        [variation.id]: currentQuantity - 1,
      });
    }
  };

  const handleIncrement = (variation) => {
    const currentQuantity = variationQuantities[variation.id] || 0;
    setVariationQuantities({
      ...variationQuantities,
      [variation.id]: currentQuantity + 1,
    });
  };

  const handleQuantityChange = (variationId, newQuantity) => {
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setVariationQuantities({
        ...variationQuantities,
        [variationId]: newQuantity,
      });
    }
  };
  
  return (
    <div className={s.divUni}>
      <div className={s.divGlobal}>
        <div className={s.divLocal}>
          <h2 className={s.productoDetailName}>{product && product.name}</h2>
        </div>
        <div className={s.divPhotos}>
          <div className={s.gallery}>
            {
              product.images && product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className={`${s.galleryImage} ${selectedImage === image.url ? s.selected : ''}`}
                  onClick={() => setSelectedImage(image.url)}
                />
              ))
            }
          </div>
          <div className={s.divImage} ref={imagesRef}>
            {
              selectedImage ? (
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
                  style={{ scrollSnapType: 'y mandatory', scrollPadding: '200px 0' }}>
                  {
                    product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`Image ${index + 1}`}
                        className={s.productoDetailImage}
                        onClick={() => setSelectedImage(image.url)}
                      />
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
        <div className={s.productoDetail}>
          <h2 className={s.productoDetailName}>{product && product.name}</h2>
          <p className={s.productoDetailPrice}>${product.price}</p>
          {
            product.discount && (
              <p className={s.productoDetailDiscount}>
                Discount: {product.discount}%
              </p>
            )
          }
          <p className={s.productoDetailStock}>Stock: {product.stock}</p>
          {
            product.sizeId && (
              <div className={s.productVariations}>
                <h3>Variaciones del Producto</h3>
                <p>Tamaño: {getSizeNameById(product.sizeId)}</p>
              </div>
            )
          }
          <div>
            <h3>Seleccione la cantidad por talle:</h3>
            {
              variations.map((variation) => (
                <div key={variation.id}>
                  <p>Talle: {variation.size.name}</p>
                  <div>
                    <button onClick={() => handleDecrement(variation)}>Decrementar</button>
                    <input type="number" 
                      value={variationQuantities[variation.id] || 0} 
                      onChange={(e) => handleQuantityChange(variation.id, parseInt(e.target.value, 10))} 
                    />
                    <button onClick={() => handleIncrement(variation)}>Incrementar</button>
                  </div>
                </div>
              ))
            }
          </div>
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
      <h2 className={s.relacionados}>Productos relacionados</h2>
    </div>
  ) 
}

export default ProductDetail;
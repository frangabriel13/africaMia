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

  const [quantity, setQuantity] = useState(1)
  const [variationQuantities, setVariationQuantities] = useState({});

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

  // const handleAddToCart = () => {
  //   if (Object.keys(variationQuantities).length > 0) {
  //     // Es un producto con variantes
  //     for (const variationId in variationQuantities) {
  //       const quantity = variationQuantities[variationId];
  //       const selectedVariation = variations.find((variation) => variation.id === variationId);
  //       if (selectedVariation && quantity > 0) {
  //         dispatch(addToCart(product, selectedVariation, quantity));
  //       }
  //     }
  //   } else {
  //     dispatch(addToCart(product, quantity));
  //   }
  // };
  const handleAddToCart = () => {
    // Agregamos el producto simple al carrito con la cantidad seleccionada
    dispatch(addToCart(product, null, quantity));
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
            product.isVariable === false ? 
            <div>
              <h3>Seleccione la cantidad</h3>
              <div>
                <button onClick={() => setQuantity(quantity - 1)}>Decrementar</button>
                <input type="number" value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}/>
                <button onClick={() => setQuantity(quantity + 1)}>Incrementar</button>
              </div>
            </div> : 
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
          }
          <button className={s.buttonCart} onClick={handleAddToCart}>Agregar al carrito</button>
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
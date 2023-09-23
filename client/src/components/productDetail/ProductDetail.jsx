import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/actions/productActions';
import s from './ProductDetail.module.css';
import { getProductVariations } from '../../redux/actions/variationActions';
import { calculateTotal } from '../../utils/helpers';
import { addToCart } from '../../redux/actions/cartActions';

const ProductDetail = ({ productId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const product = useSelector((state) => state.product.productById);
  const variations = useSelector((state) => state.variation.variations);
  const [selectedImage, setSelectedImage] = useState(null);
  const imagesRef = useRef(null); // !??

  const [quantity, setQuantity] = useState(1);
  const [variationQuantities, setVariationQuantities] = useState({});

  useEffect(() => {
    setLoading(true); // Indica que se está cargando
    dispatch(getProductById(productId))
      .then(() => {
        setLoading(false); // Indica que la carga ha finalizado
        dispatch(getProductVariations(productId)); // Carga las variaciones
      });
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getProductVariations(productId))
  }, []);

  if (loading) return <p>Cargando...</p>

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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

  const handleAddToCart = () => {
    if (product.isVariable) {
      // Es un producto con variaciones, debes encontrar la variación seleccionada
      const selectedVariations = variations.filter((variation) => {
        const quantity = variationQuantities[variation.id] || 0;
        return quantity > 0;
      });
  
      if (selectedVariations.length === 0) {
        // No se ha seleccionado ninguna variación
        alert("Por favor, seleccione al menos una variación antes de agregar al carrito.");
      } else {
        // Agrega todas las variaciones seleccionadas al carrito
        selectedVariations.forEach((selectedVariation) => {
          const quantity = variationQuantities[selectedVariation.id];
          // console.log(selectedVariation)
          // console.log(quantity)
          dispatch(addToCart(product, selectedVariation, quantity));
        });
        setVariationQuantities({});
        // Redirige al usuario al carrito
        // history.push('/carrito');
      }
    } else {
      // console.log(quantity)
      // Es un producto simple, agrega la cantidad seleccionada al carrito
      dispatch(addToCart(product, null, quantity));
      setQuantity(1);
      // Redirige al usuario al carrito
      // history.push('/carrito');
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
            product.isVariable === false ? 
            <div className={s.divVariant}>
              <h3>Seleccione la cantidad:</h3>
              <div className={s.btnQuantity}>
                <button className={s.decrement} onClick={decrementQuantity}>-</button>
                <input type="number" value={quantity}
                  className={s.quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  readOnly
                />
                <button className={s.increment} onClick={incrementQuantity}>+</button>
              </div>
            </div> : 
            <div className={s.divVariant}>
              <h3>Seleccione la cantidad por talle:</h3>
              {
                variations.map((variation) => (
                  <div className={s.divQuantity} key={variation.id}>
                    <p>{variation.size.name}</p>
                    <div className={s.btnQuantity}>
                      <button className={s.decrement} onClick={() => handleDecrement(variation)}>-</button>
                      <input type="number"
                        className={s.quantity}
                        value={variationQuantities[variation.id] || 0} 
                        onChange={(e) => handleQuantityChange(variation.id, parseInt(e.target.value, 10))}
                        readOnly
                      />
                      <button className={s.increment} onClick={() => handleIncrement(variation)}>+</button>
                    </div>
                  </div>
                ))
              }
            </div>
          }
          <p className={s.cantTotal}>Total: ${calculateTotal(product, quantity, variations, variationQuantities)}</p>
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
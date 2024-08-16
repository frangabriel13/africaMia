import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/actions/productActions";
import s from "./ProductDetail.module.css";
import GalleryProduct from "./galleryProduct/GalleryProduct";
import { calculateTotal, randomPhoneNumber } from '../../utils/helpers';
import { addToCart } from '../../redux/actions/cartActions';

const ProductDetail = ({ productId }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productById);
  const [quantity, setQuantity] = useState(1);
  const [variationQuantities, setVariationQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   dispatch(getProductById(productId));
  // }, [productId, dispatch]);
  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(getProductById(productId));
      setLoading(false);
    };
    fetchProduct();
  }, [productId, dispatch]);

  if (loading) {
    return <div className={s.loading}>Cargando...</div>;
  }

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
      const selectedVariations = product.variations.filter((variation) => {
        const quantity = variationQuantities[variation.id] || 0;
        return quantity > 0;
      });

      if (selectedVariations.length === 0) {
        alert("Por favor, seleccione al menos una variación antes de agregar al carrito.");
      } else {
        selectedVariations.forEach((selectedVariation) => {
          const quantity = variationQuantities[selectedVariation.id];
          dispatch(addToCart(product, selectedVariation, quantity));
        });
        setVariationQuantities({});
      }
    } else {
      dispatch(addToCart(product, null, quantity));
      setQuantity(1);
    }
  };

  return (
    <div className={s.container}>
      <h2>Es necesario alcanzar un mínimo de $50,000 en tu carrito, Podes elegir diferentes modelos y talles</h2>
      <div className={s.divProduct}>
        <div className={s.divImages}>
          <GalleryProduct images={product.images} />
        </div>
        <div className={s.divData}>
          <div className={s.divName}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
          <div className={s.divVariations}>
            {
              product.isVariable === false ?
              <div className={s.variation}>
                <h4>Seleccione la cantidad:</h4>
                {
                  product.availability === true ?
                  <div className={s.divQuantity}>
                    <button className={s.btnDecrement} onClick={decrementQuantity}>-</button>
                    <input type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                      readOnly
                      className={s.inputQuantity}
                    />
                    <button className={s.btnIncrement} onClick={incrementQuantity}>+</button>
                  </div> :
                  <p className={s.stock}>Sin Stock</p>
                }
              </div> :
              <div className={s.variation}>
                <h4>Seleccione la cantidad por talle:</h4>
                {
                  product.variations.map((variation) => (
                    <div className={s.divVar} key={variation.id}>
                      <p>{variation.size.name}</p>
                      {
                        variation.availability === true ?
                        <div className={s.divQuantity}>
                          <button className={s.btnDecrement} onClick={() => handleDecrement(variation)}>-</button>
                          <input type="number" 
                            value={variationQuantities[variation.id] || 0}
                            onChange={(e) => handleQuantityChange(variation.id, parseInt(e.target.value, 10))}
                            readOnly
                            className={s.inputQuantity}
                          />
                          <button className={s.btnIncrement} onClick={() => handleIncrement(variation)}>+</button>
                        </div> :
                        <p className={s.stock}>Sin Stock</p>
                      }
                    </div>
                  ))
                }
              </div>
            }
            <p className={s.cantTotal}>Total: ${calculateTotal(product, quantity, product.variations, variationQuantities)}</p>
          </div>
          <div className={s.divBtns}>
            <button className={s.btnAddToCart} onClick={handleAddToCart}>Agregar al carrito</button>
            <button className={s.btnConsult} onClick={() => alert('Consultanos al Whatsapp')}>Consultanos al Whatsapp</button>
          </div>
        </div>
      </div>
      <h3 className={s.relacionados}>PRODUCTOS RELACIONADOS</h3>
    </div>
  )
};


export default ProductDetail;
// import React, { useRef, useEffect, useState, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProductById } from '../../redux/actions/productActions';
// import s from './ProductDetail.module.css';
// import { getProductVariations } from '../../redux/actions/variationActions';
// import { calculateTotal, randomPhoneNumber } from '../../utils/helpers';
// import { addToCart } from '../../redux/actions/cartActions';

// const ProductDetail = ({ productId }) => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const product = useSelector((state) => state.product.productById);
//   const variations = useSelector((state) => state.variation.variations);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const imagesRef = useRef(null);

//   const [quantity, setQuantity] = useState(1);
//   const [variationQuantities, setVariationQuantities] = useState({});
  
//   useEffect(() => {
//     setLoading(true);
//     dispatch(getProductById(productId))
//       .then(() => {
//         setLoading(false);
//         dispatch(getProductVariations(productId));
//       });
//   }, [dispatch, productId]);

//   useEffect(() => {
//     dispatch(getProductVariations(productId))
//   }, []);

//   if (loading) return <p>Cargando...</p>

//   const incrementQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleDecrement = (variation) => {
//     const currentQuantity = variationQuantities[variation.id] || 0;
//     if (currentQuantity > 0) {
//       setVariationQuantities({
//         ...variationQuantities,
//         [variation.id]: currentQuantity - 1,
//       });
//     }
//   };

//   const handleIncrement = (variation) => {
//     const currentQuantity = variationQuantities[variation.id] || 0;
//     setVariationQuantities({
//       ...variationQuantities,
//       [variation.id]: currentQuantity + 1,
//     });
//   };

//   const handleQuantityChange = (variationId, newQuantity) => {
//     if (!isNaN(newQuantity) && newQuantity >= 0) {
//       setVariationQuantities({
//         ...variationQuantities,
//         [variationId]: newQuantity,
//       });
//     }
//   };

//   const handleAddToCart = () => {
//     if (product.isVariable) {
//       const selectedVariations = variations.filter((variation) => {
//         const quantity = variationQuantities[variation.id] || 0;
//         return quantity > 0;
//       });
  
//       if (selectedVariations.length === 0) {
//         alert("Por favor, seleccione al menos una variación antes de agregar al carrito.");
//       } else {
//         selectedVariations.forEach((selectedVariation) => {
//           const quantity = variationQuantities[selectedVariation.id];
//           dispatch(addToCart(product, selectedVariation, quantity));
//         });
//         setVariationQuantities({});
//       }
//     } else {
//       dispatch(addToCart(product, null, quantity));
//       setQuantity(1);
//     }
  
    
//   };
 
//   const handleImageClick = (image) => {
//     setSelectedImage(image.url);
//     imagesRef.current.scrollTop = image.index * (image.height + 20); // Ajusta el desplazamiento vertical según la imagen seleccionada
//   };
  
//   const handleConsultWhatsapp = () => {
//     const phoneNumber = randomPhoneNumber();
//     const message = encodeURIComponent('Hola, les quería hacer una consulta');
//     const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}&text=${message}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const sortVariations = (variations) => {
//     return variations.sort((a, b) => {
//       const sizeA = a.size ? a.size.name.toLowerCase() : '';
//       const sizeB = b.size ? b.size.name.toLowerCase() : '';
//       if (sizeA < sizeB) return -1;
//       if (sizeA > sizeB) return 1;
//       return 0;
//     });
//   };
  
//   return (
//     <div className={s.divUni}>
//       <h1 className={s.minimo}>Es necesario alcanzar un mínimo de $50,000 en tu carrito, Podes elegir diferentes modelos y talles</h1>
//       <div className={s.divGlobal}>
        
//         <div className={s.divPhotos}>
//           <div className={s.gallery}>
//             {product.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image.url}
//                 alt={`Image ${index + 1}`}
//                 className={`${s.galleryImage} ${selectedImage === image.url ? s.selected : ''}`}
//                 onClick={() => handleImageClick(image)}
//               />
//             ))}
//           </div>

//           <div className={s.divImage} ref={imagesRef}>
//             {
//               selectedImage ? (
//                 <div className={s.productoDetailImages}>
//                   <img
//                     src={selectedImage}
//                     alt="Selected Image"
//                     className={s.productoDetailImage}
//                   />
//                 </div>
//               ) : (
//                 <div
//                   className={s.productoDetailImages}
//                   style={{ scrollSnapType: 'y mandatory', scrollPadding: '200px 0' }}>
//                   {
//                     product.images.map((image, index) => (
//                       <img
//                         key={index}
//                         src={image.url}
//                         alt={`Image ${index + 1}`}
//                         className={s.productoDetailImage}
//                         onClick={() => setSelectedImage(image.url)}
//                       />
//                     ))
//                   }
//                 </div>
//               )
//             }
//           </div>
//         </div>
//         <div className={s.productoDetail}>
//           <div className={s.continent}>
//             <h2 className={s.productoDetailName}>{product && product.name}</h2>
//             <p className={s.productoDetailPrice}>${product.price}</p>
//             {
//               product.isVariable === false ? 
//               <div className={s.divVariant}>
//                 <h3>Seleccione la cantidad:</h3>
//                 <div className={s.btnQuantity}>
//                   <button className={s.decrement} onClick={decrementQuantity}>-</button>
//                   <input type="number" value={quantity}
//                     className={s.quantity}
//                     onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
//                     readOnly
//                   />
//                   <button className={s.increment} onClick={incrementQuantity}>+</button>
//                 </div>
//               </div> : 
//               <div className={s.divVariant}>
//                 <h3>Seleccione la cantidad por talle:</h3>
//                 {
//                   sortVariations(variations).map((variation) => (
//                     <div className={s.divQuantity} key={variation.id}>
//                       <p>{variation && variation.size.name}</p>
//                       {
//                         variation.availability === true ?
//                           <div className={s.btnQuantity}>
//                             <button className={s.decrement} onClick={() => handleDecrement(variation)}>-</button>
//                             <input type="number"
//                               className={s.quantity}
//                               value={variationQuantities[variation.id] || 0} 
//                               onChange={(e) => handleQuantityChange(variation.id, parseInt(e.target.value, 10))}
//                               readOnly
//                             />
//                             <button className={s.increment} onClick={() => handleIncrement(variation)}>+</button>
//                           </div> :
//                           <p className={s.cant}>Sin Stock</p>
//                       }
//                     </div>
//                   ))
//                 }
//               </div>
//             }
//             <p className={s.cantTotal}>Total:   ${calculateTotal(product, quantity, variations, variationQuantities)}</p>
//             <button className={s.buttonCart} onClick={handleAddToCart}>Agregar al carrito</button>
//             <br/>
//             <button
//               className={s.buttonWP}
//               onClick={handleConsultWhatsapp}
//             >
//               Consultanos al Whatsapp
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className={s.divDescription}>
//         <p className={s.productoDetailDescription}>
//           Description: {product.description && product.description.text}
//         </p>
//       </div>
//       <h2 className={s.relacionados}>Productos relacionados</h2>
//     </div>
//   ) 
// }

// export default ProductDetail;
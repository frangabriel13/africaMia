// import React, { useState, useEffect } from 'react';
// import s from './Cart.module.css';

// const Cart = () => {
//   const [cartItem, setCartItem] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const storedCartItems = localStorage.getItem('cartItems');
//     if (storedCartItems) {
//       const parsedCartItems = JSON.parse(storedCartItems);
//       setCartItem(parsedCartItems);
  
//       // Calcular el total basado en los elementos del carrito recuperados del Local Storage
//       const calculatedTotal = parsedCartItems.reduce(
//         (accumulator, item) => accumulator + item.price * item.quantity,
//         0
//       );
  
//       setTotal(calculatedTotal.toFixed(2)); // Establecer el total
//     }
//   }, []);// El array vacío [] asegura que este efecto solo se ejecute una vez al montar el componente
 
//   const handleWhatsAppClick = () => {
//     const message = `¡Hola! Estoy interesado en comprar los siguientes artículos: \n`;

//     // Generar el mensaje de WhatsApp con los elementos del carrito
//     const cartMessage = cartItem
//     .map((item, index) => `${index + 1}. ${item.name} (Cantidad: ${item.quantity}) - $${item.price}`)
//     .join('\n');
//   const phoneNumber = '+541158742482';

//   // Crear el enlace para enviar el mensaje a través de WhatsApp
//   const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
//     `${message}${cartMessage}\nTotal: $${total}`
//   )}`;

//   // Abrir WhatsApp con el mensaje
//   window.location.href = whatsappLink;
// };
//   return (
//     <div className={s.cart}>
//       <h2>Carrito de Compras</h2>
//       {cartItem.length === 0 ? (
//         <p>El carrito está vacío.</p>
//       ) : (
//         <div>
//           <ul>
//             {cartItem.map((item, index) => (
//               <li key={item.id}>
//                {item.name} (Cantidad: {item.quantity}) - ${item.price}
//               </li>
//             ))}
//           </ul>
//           <p>Total: ${total}</p>
//         </div>
//       )}
//       <button className={s.buttonWP} onClick={handleWhatsAppClick}>
//         Comprar por Whatsapp
//       </button>
//     </div>
//   );
// };


// export default Cart;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../redux/actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.total);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {
        cartItems.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <div>
            <ul>
              {
                cartItems.map((item) => (
                  <li key={item.selectedVariation ? item.selectedVariation.id : item.product.id}>
                    <p>Nombre: {item.product.name}</p>
                    <p>Precio: ${item.selectedVariation ? item.selectedVariation.price : item.product.price}</p>
                    <p>Cantidad:
                      <div>
                        <button onClick={() => handleDecrement(item.selectedVariation ? item.selectedVariation.id : item.product.id)}>-</button>
                        <input
                          type="number"
                          value={item.quantity}
                        />
                        <button onClick={() => handleIncrement(item.selectedVariation ? item.selectedVariation.id : item.product.id)}>+</button>
                      </div>
                    </p>
                    <button onClick={() => handleRemoveFromCart(item.selectedVariation ? item.selectedVariation.id : item.product.id)}>Eliminar</button>
                  </li>
                ))
              }
            </ul>
            <p>Total de la compra: ${total}</p>
          </div>
        )
      }
    </div>
  );
};

export default Cart;


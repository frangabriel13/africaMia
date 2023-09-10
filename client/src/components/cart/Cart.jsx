// Cart.js
import React from 'react';
import { useSelector } from 'react-redux';
import s from './Cart.module.css'; // Asegúrate de tener el archivo CSS correspondiente
import { useState, useEffect } from 'react';


const Cart = () => {
  const cartItems = useSelector((state) => state.product.cartItems);
  const total = useSelector((state) => state.product.total);
  const [cartItem, setCartItem] = useState([])
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItem(JSON.parse(storedCartItems));
    }
  }, []); // El array vacío [] asegura que este efecto solo se ejecute una vez al montar el componente

  return (
    <div className={s.cart}> 
        <h2>Carrito de Compras</h2>
            {cartItem.length === 0 ? (
              <p>El carrito está vacío.</p>
            ) : (
               <div>
                  <ul>
                    {cartItem.map((item, index) => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                      </li>
                    ))}
                 </ul>
               <p>Total: ${total.toFixed(2)}</p> {/* Mostrar el total */}
             </div>
    )}
    <button className={s.buttonWP}>Comprar por Whatsapp</button> {/* Agrega la clase "buttonWP" al botón */}
  </div>
  );
};

export default Cart;

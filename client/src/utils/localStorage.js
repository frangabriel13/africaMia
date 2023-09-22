// Función para cargar el carrito desde el localStorage
export const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return undefined; // Si no hay un carrito en el localStorage, devuelve undefined
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    return undefined;
  }
};

// Función para guardar el carrito en el localStorage
export const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (error) {
    // Manejar errores de localStorage si es necesario
  }
};
const initialState = {
  cartItems: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product, selectedVariation, quantity } = action.payload;
      
      // Verificar si el producto ya existe en el carrito
      const existingItemIndex = state.cartItems.findIndex((item) => {
        if(selectedVariation) {
          // Si es una variante, verificar por selectedVariation.id
          return (
            item.selectedVariation &&
            item.selectedVariation.id === selectedVariation.id
          );
        } else {
          // Si es un producto simple, verificar por product.id
          return item.product.id === product.id;
        }
      });

      if (existingItemIndex !== -1) {
        // El producto o variante ya existe en el carrito, actualiza la cantidad
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += quantity;

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // El producto o variante no existe en el carrito, agrégalo
        const item = {
          product,
          selectedVariation,
          quantity,
        };
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
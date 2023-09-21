export const addToCart = (product, selectedVariation, quantity) => {
  return {
    type: 'ADD_TO_CART',
    payload: {
      product,
      selectedVariation,
      quantity,
    },
  };
  // if (product.isVariable) {
  //   // Producto variable: Puedes mantener selectedVariation como está
  //   return {
  //     type: 'ADD_TO_CART',
  //     payload: {
  //       product,
  //       selectedVariation,
  //       quantity,
  //     },
  //   };
  // } else {
  //   // Producto simple: selectedVariation debe ser null, y la cantidad debe ser quantity
  //   return {
  //     type: 'ADD_TO_CART',
  //     payload: {
  //       product,
  //       selectedVariation: null,
  //       quantity,
  //     },
  //   };
  // }
};

export const removeFromCart = (productId) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: productId,
  };
}

export const updateQuantity = (productId, quantity) => {
  return {
    type: 'UPDATE_QUANTITY',
    payload: { productId, quantity },
  };
}
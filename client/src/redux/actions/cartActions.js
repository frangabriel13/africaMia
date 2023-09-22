export const addToCart = (product, selectedVariation, quantity) => {
  console.log('product: ', product);
  console.log('variation: ', selectedVariation)
  return {
    type: 'ADD_TO_CART',
    payload: {
      product,
      selectedVariation,
      quantity,
    },
  };
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
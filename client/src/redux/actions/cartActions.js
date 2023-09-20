export const addToCart = (product, variant = null, quantity = 1) => {
  return {
    type: 'ADD_TO_CART',
    payload: { product, variant, quantity },
  };
}

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
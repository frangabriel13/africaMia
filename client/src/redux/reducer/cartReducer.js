const initialState = {
  cartItems: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product, selectedVariation, quantity } = action.payload;
      // console.log(product)
      // console.log(selectedVariation)
      // console.log(quantity)
      const item = {
        product,
        selectedVariation,
        quantity,
        // selectedVariation: selectedVariation !== undefined ? selectedVariation : null,
        // quantity: quantity !== undefined ? quantity : 1,
      };
      return {
        ...state,
        cartItems: [...state.cartItems, item], // Agrega el nuevo elemento al carrito
      };
    default:
      return state;
  }
};

export default cartReducer;
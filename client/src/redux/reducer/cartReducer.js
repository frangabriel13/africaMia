const initialState = {
  items: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product, variant, quantity } = action.payload;
      return {
        ...state,
        items: [...state.items, { product, variant, quantity }],
        total: state.total + (variant ? variant.price * quantity : product.price * quantity),
      };
    default:
      return state;
  }
};

export default cartReducer;
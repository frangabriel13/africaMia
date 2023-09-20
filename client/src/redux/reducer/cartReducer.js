const initialState = {
  items: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product, variant } = action.payload;
      // Lógica para agregar el producto o variante al carrito
      // Puedes mantener un arreglo de items en el carrito y calcular el total aquí
      // Asegúrate de manejar adecuadamente productos y variantes
      return {
        ...state,
        items: [...state.items, { product, variant, quantity: 1 }],
        total: state.total + (variant ? variant.price : product.price),
      };
    default:
      return state;
  }
};

export default cartReducer;
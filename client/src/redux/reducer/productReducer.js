const initialState = {
  products: [],
  allProducts: [],
  product: {},
};

function productReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      }
    case 'GET_PRODUCT_BY_ID':
      return {
        ...state,
        product: action.payload,
      }
    case 'ADD_PRODUCT':
      return {
        ...state,
      }
    case 'DELETE_PRODUCT':
      return {
        ...state,
      }
    case 'UPDATE_PRODUCT':
      return {
        ...state,
      }
    case 'FILTER_PRODUCTS':
      const allProducts = state.allProducts;
      const productFiltered = allProducts.filter((el) => el.categoryId === parseInt(action.payload));
      return {
        ...state,
        products: productFiltered,
      }
    default:
      return state;
  }
}


export default productReducer;
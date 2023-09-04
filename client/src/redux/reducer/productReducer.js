const initialState = {
  products: [],
  allProducts: [],
};

function productReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
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
    default:
      return state;
  }
}


export default productReducer;
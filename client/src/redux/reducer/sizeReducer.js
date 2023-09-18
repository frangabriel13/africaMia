const initialState = {
  sizes: [],
  allSizes: [],
  sizeById: [],
};

function sizeReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_SIZES':
      return {
        ...state,
        sizes: action.payload,
        allSizes: action.payload,
      }
      case 'GET_PRODUCT_BY_ID':
     return {
          ...state,
            sizeById: [...state.sizeById, action.payload], // Agrega el nuevo tamaño al arreglo
      }

    case 'ADD_SIZE':
      return {
        ...state,
      }
    case 'DELETE_SIZE':
      return {
        ...state,
      }
    case 'UPDATE_SIZE':
      return {
        ...state,
      }
    default:
      return state;
  }
}


export default sizeReducer;
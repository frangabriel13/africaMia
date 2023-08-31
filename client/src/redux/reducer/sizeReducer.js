const initialState = {
  sizes: [],
  allSizes: [],
};

function sizeReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_SIZES':
      return {
        ...state,
        sizes: action.payload,
        allSizes: action.payload,
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
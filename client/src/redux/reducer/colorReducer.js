const initialState = {
  colors: [],
  allColors: [],
};

function colorReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_COLORS':
      return {
        ...state,
        colors: action.payload,
        allColors: action.payload,
      }
    case 'ADD_COLOR':
      return {
        ...state,
      }
    case 'DELETE_COLOR':
      return {
        ...state,
      }
    case 'UPDATE_COLOR':
      return {
        ...state,
      }
    default:
      return state;
  }
}
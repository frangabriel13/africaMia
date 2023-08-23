const initialState = {
  categories: [],
  allCategories: [],
};

function categoryReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        allCategories: action.payload,
      }
    default:
      return state;
  }
}


export default categoryReducer;
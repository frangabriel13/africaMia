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
    case 'ADD_CATEGORY':
      return {
        ...state,
        // categories: [...state.categories, action.payload],
        // allCategories: [...state.allCategories, action.payload],
      }
    default:
      return state;
  }
}


export default categoryReducer;
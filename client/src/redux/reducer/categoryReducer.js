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
      }
    case 'DELETE_CATEGORY':
      return {
        ...state,
      }
    case 'FILTER_CATEGORIES':
      const allCategories = state.allCategories;
      const categoryFiltered = allCategories.filter((el) => el.parentId === parseInt(action.payload));
      return {
        ...state,
        categories: categoryFiltered,
      }
    case 'UPDATE_CATEGORY':
      return {
        ...state,
      }
    default:
      return state;
  }
}


export default categoryReducer;
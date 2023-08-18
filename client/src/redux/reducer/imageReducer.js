const initialState = {
  images: [],
  allImages: [],
};

function imageReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_IMAGES':
      return {
        ...state,
        images: action.payload,
        allImages: action.payload,
      }
    case 'GET_IMAGE':
      return {
        ...state,
        images: action.payload,
      }
    case 'CREATE_IMAGE':
      return {
        ...state,
      };
    default:
      return state;
  }
}


export default imageReducer;
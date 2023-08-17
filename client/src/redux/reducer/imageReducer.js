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
    default:
      return state;
  }
}


export default imageReducer;
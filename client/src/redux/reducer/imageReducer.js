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
    case 'UPDATE_IMAGE':
      const updatedImage = action.payload;
      return {
        ...state,
        images: state.images.map((image) => {
          image.id === updatedImage.id ? updatedImage : image;
        }),
      };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((image) => image.id !== action.payload),
      };
    default:
      return state;
  }
}


export default imageReducer;
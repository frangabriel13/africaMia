import instance from '../../utils/axiosConfig';

export const getImages = () => async (dispatch) => {
  try {
    const response = await instance.get('/images');
    dispatch({
      type: 'GET_IMAGES',
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const getImage = (id) => async (dispatch) => {
  try {
    const response = await instance.get(`/images/${id}`);
    dispatch({
      type: 'GET_IMAGE',
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const createImage = (image) => async (dispatch) => {
  try {
    const response = await instance.post('/images', image);
    dispatch({
      type: 'CREATE_IMAGE',
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};
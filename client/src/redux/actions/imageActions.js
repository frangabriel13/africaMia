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
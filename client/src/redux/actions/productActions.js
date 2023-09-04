import instance from '../../utils/axiosConfig';

export const getProducts = () => async (dispatch) => {
  try {
    const response = await instance.get('/products');
    dispatch({
      type: 'GET_PRODUCTS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    const response = await instance.post('/products', product);
    dispatch({
      type: 'ADD_PRODUCT',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await instance.delete(`/products/${id}`);
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (payload) => async (dispatch) => {
  try {
    const response = await instance.put(`/products/${payload.id}`, payload);
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};
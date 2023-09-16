import { instance } from '../../utils/axiosConfig';

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

export const getProductById = (id) => async (dispatch) => {
  try {
    const response = await instance.get(`/products/${id}`);
    dispatch({
      type: 'GET_PRODUCT_BY_ID',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchProducts = (searchTerm) => ({
  type: 'SEARCH_PRODUCTS',
  payload: searchTerm,
});

// Acción para realizar la búsqueda en el navbar
export const searchProductsHeader = (searchTerm) => {
  return {
    type: 'SEARCH_PRODUCTS_NAVBAR',
    payload: searchTerm,
  };
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
    console.log(payload)
    const response = await instance.put(`/products/${payload.id}`, payload);
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const filterProducts = (categoryId) => {
  return {
    type: 'FILTER_PRODUCTS',
    payload: categoryId,
  };
};

// Acción para agregar un producto al carrito
export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

// Acción para eliminar un producto del carrito
export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
});
import instance from "../../utils/axiosConfig";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await instance.get("/categories");
    dispatch({
      type: "GET_CATEGORIES",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const addCategory = (category) => async (dispatch) => {
  try {
    const response = await instance.post("/categories", category);
    console.log(response.data);
    dispatch({
      type: "ADD_CATEGORY",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const filterCategories = (category) => {
  return {
    type: "FILTER_CATEGORIES",
    payload: category,
  };
}

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await instance.delete(`/categories/${id}`);
    dispatch({
      type: "DELETE_CATEGORY",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const updateCategory = (payload) => async (dispatch) => {
  try {
    const response = await instance.put(`/categories/${payload.id}`, payload);
    dispatch({
      type: "UPDATE_CATEGORY",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};
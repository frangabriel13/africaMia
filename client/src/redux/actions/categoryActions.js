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
    dispatch({
      type: "ADD_CATEGORY",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};
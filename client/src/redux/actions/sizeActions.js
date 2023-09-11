import instance from "../../utils/axiosConfig";

export const getSizes = () => async (dispatch) => {
  try {
    const response = await instance.get("/sizes");
    dispatch({
      type: "GET_SIZES",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const addSize = (size) => async (dispatch) => {
  try {
    const response = await instance.post("/sizes", size);
    dispatch({
      type: "ADD_SIZE",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const deleteSize = (id) => async (dispatch) => {
  try {
    const response = await instance.delete(`/sizes/${id}`);
    dispatch({
      type: "DELETE_SIZE",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const updateSize = (payload) => async (dispatch) => {
  try {
    console.log(payload)
    const response = await instance.put(`/sizes/${payload.id}`, payload);
    dispatch({
      type: "UPDATE_SIZE",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};
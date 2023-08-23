import productReducer from "./productReducer";
import imageReducer from "./imageReducer";
import categoryReducer from "./categoryReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  gallery: imageReducer,
  category: categoryReducer,
})


export default rootReducer;
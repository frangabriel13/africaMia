import productReducer from "./productReducer";
import imageReducer from "./imageReducer";
import categoryReducer from "./categoryReducer";
import sizeReducer from "./sizeReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  gallery: imageReducer,
  category: categoryReducer,
  size: sizeReducer,
})


export default rootReducer;
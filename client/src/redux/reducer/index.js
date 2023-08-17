import productReducer from "./productReducer";
import imageReducer from "./imageReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  gallery: imageReducer,
})


export default rootReducer;
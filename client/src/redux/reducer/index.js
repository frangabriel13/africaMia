import productReducer from "./productReducer";
import imageReducer from "./imageReducer";
import categoryReducer from "./categoryReducer";
import sizeReducer from "./sizeReducer";
import colorReducer from "./colorReducer";
import variationReducer from "./variationReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  gallery: imageReducer,
  category: categoryReducer,
  size: sizeReducer,
  color: colorReducer,
  product: productReducer,
  variation: variationReducer,
})


export default rootReducer;
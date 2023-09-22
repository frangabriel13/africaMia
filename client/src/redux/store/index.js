import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";
import { loadState, saveState } from "../../utils/localStorage";

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// Carga el estado del carrito desde el localStorage al iniciar la aplicación
const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

// Suscríbete al cambio de estado y guarda en el localStorage cuando cambie
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middleware = [thunk];
const enhancer = combineReducers({
  moviesInfo: rootReducer,
});

export const store = createStore(
  enhancer,
  composeWithDevTools(applyMiddleware(...middleware))
);

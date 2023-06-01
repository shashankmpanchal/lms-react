import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { ReducerStore } from "./reducer";

export default function configureStore(preloadedState) {
  const store = createStore(
    ReducerStore,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  return store;
}

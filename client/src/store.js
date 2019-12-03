import { createStore, applyMiddleware } from "redux";

// Logger with default options
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducer from "./reducers/reducers";
import { loadState, saveState } from './localStorage'

export default function configureStore() {
  const persistedState = loadState()
  const store = createStore(reducer, persistedState, applyMiddleware(logger, thunk));
  store.subscribe(() => {
    saveState({
      userData: store.getState().userData
    })
  })
  return store;
}
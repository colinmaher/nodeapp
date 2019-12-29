import { createStore, applyMiddleware } from "redux";

// Logger with default options
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas/sagas'

import reducer from "./reducers/reducers";
import { loadState, saveState } from './localStorage'

export default function configureStore() {
  const persistedState = loadState()
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, persistedState, applyMiddleware(logger, thunk, sagaMiddleware));
  // if persisted state is undefined uses default state
  sagaMiddleware.run(mySaga)
  store.subscribe(() => {
    saveState({
      userData: store.getState().userData,
      latestTweets: store.getState().latestTweets
    })
  })
  return store;
}
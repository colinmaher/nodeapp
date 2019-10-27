import { createStore, applyMiddleware } from "redux";

// Logger with default options
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducer from "./reducers/reducers";

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState, applyMiddleware(logger, thunk));
    return store;
}
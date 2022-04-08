import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";

import taskReducer from "../reducers/taskReducer";

const store = createStore(
    taskReducer, 
    applyMiddleware(thunk)
);

export default store;
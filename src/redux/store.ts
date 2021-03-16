//root reducer with combineReducer

import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import userEventsReducer from "./user-events";
import recorderReducer from "./recorder";

const rootReducer = combineReducers({
    userEvents: userEventsReducer,
    recorder: recorderReducer
});

//Return type demands a function to extract the return type!
export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
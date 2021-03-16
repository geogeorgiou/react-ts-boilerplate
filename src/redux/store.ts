//root reducer with combineReducer

import {combineReducers, createStore} from "redux";
import userEventsReducer from "./user-events";
import recorderReducer from "./recorder";

const rootReducer = combineReducers({
    userEvents: userEventsReducer,
    recorder: recorderReducer
});

//Return type demands a function to extract the return type!
export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store;